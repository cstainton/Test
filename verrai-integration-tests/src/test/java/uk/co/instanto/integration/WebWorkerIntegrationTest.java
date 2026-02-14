package uk.co.instanto.integration;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.co.instanto.client.service.AsyncResult;
import uk.co.instanto.client.service.RpcClient;
import uk.co.instanto.client.service.UnitRegistry;
import uk.co.instanto.client.service.WorkerBootstrap;
import uk.co.instanto.integration.transport.SimulatedWebWorkerTransport;
import dev.verrai.rpc.common.transport.stomp.StompClient;
import dev.verrai.rpc.common.transport.stomp.StompMessage;
import dev.verrai.rpc.common.transport.stomp.StompSubscriptionCallback;
import uk.co.instanto.client.service.transport.StompTransport;
import uk.co.instanto.integration.service.MyDataService;
import uk.co.instanto.integration.service.MyDataService_Stub;
import uk.co.instanto.integration.service.MyDataService_Dispatcher;
import uk.co.instanto.integration.service.dto.MyData;
import uk.co.instanto.integration.service.dto.Employee;
import uk.co.instanto.integration.service.dto.Organization;
import uk.co.instanto.integration.service.AuthenticationService;
import uk.co.instanto.integration.service.AuthenticationService_Stub;
import uk.co.instanto.integration.service.AuthenticationService_Dispatcher;
import uk.co.instanto.client.service.dto.LogonRequest;
import uk.co.instanto.client.service.dto.LogonResponse;

import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

/**
 * Integration test verifying the architecture of a Service running in a
 * WebWorker
 * communicating with a Service in the JVM (Server), mediated by the Main
 * Thread.
 */
public class WebWorkerIntegrationTest {
    private static final Logger logger = LoggerFactory.getLogger(WebWorkerIntegrationTest.class);

    @Test
    public void testWorkerToJvmRpc() throws InterruptedException {
        // --- 1. Infrastructure Setup ---

        // Mock Broker (The Network)
        MockStompClient broker = new MockStompClient();

        // Server Side (JVM)

        // Public Auth Service
        // Listens on /queue/auth
        // Sends responses to /topic/replies
        StompTransport authTransport = new StompTransport(broker, "/topic/replies", "/queue/auth");
        WorkerBootstrap authBootstrap = new WorkerBootstrap(authTransport);
        authBootstrap.registerDispatcher("uk.co.instanto.integration.service.AuthenticationService",
                new AuthenticationService_Dispatcher());

        // Secure Data Service
        // Listens on /queue/data
        // Sends responses to /topic/replies (shared reply topic for simplicity)
        StompTransport dataTransport = new StompTransport(broker, "/topic/replies", "/queue/data");
        WorkerBootstrap dataBootstrap = new WorkerBootstrap(dataTransport);
        dataBootstrap.registerDispatcher("uk.co.instanto.integration.service.MyDataService",
                new MyDataService_Dispatcher());

        // Register Implementation
        UnitRegistry.register("uk.co.instanto.integration.service.MyDataService", new MyDataService() {
            @Override
            public AsyncResult<Void> processData(MyData data) {
                logger.info("JVM Server received: " + data.getContent());
                uk.co.instanto.client.service.AsyncResultImpl<Void> res = new uk.co.instanto.client.service.AsyncResultImpl<>();
                res.complete(null);
                return res;
            }

            @Override
            public AsyncResult<Employee> getBoss(Organization org) {
                return null;
            }
        });

        UnitRegistry.register("uk.co.instanto.integration.service.AuthenticationService", new AuthenticationService() {
            @Override
            public AsyncResult<LogonResponse> login(LogonRequest request) {
                logger.info("JVM Server received login for: " + request.getUsername());
                uk.co.instanto.client.service.AsyncResultImpl<LogonResponse> res = new uk.co.instanto.client.service.AsyncResultImpl<>();
                // Return the secure endpoint address
                res.complete(new LogonResponse("signed-jwt-token-" + request.getUsername(), "/queue/data"));
                return res;
            }
        });

        // --- 2. Client Setup (Simulated WebWorker) ---

        // The transport inside the Worker
        SimulatedWebWorkerTransport workerTransport = new SimulatedWebWorkerTransport();

        // Run Worker Logic in a separate thread
        AtomicReference<Throwable> workerError = new AtomicReference<>();
        CountDownLatch doneLatch = new CountDownLatch(1);

        new Thread(() -> {
            try {
                logger.info("[Worker] Starting...");

                // 1. Register Public Auth Service
                UnitRegistry.getInstance().registerRemote(AuthenticationService.class.getName(), "auth-node", workerTransport);
                AuthenticationService authStub = new AuthenticationService_Stub();

                LogonRequest loginReq = new LogonRequest("user123", "secret");
                logger.info("[Worker] Calling AuthenticationService.login...");

                AsyncResult<LogonResponse> loginResult = authStub.login(loginReq);

                final CountDownLatch loginLatch = new CountDownLatch(1);
                final AtomicReference<String> secureEndpoint = new AtomicReference<>();

                loginResult.thenAccept(response -> {
                    try {
                        logger.info("[Worker] Login Success! Endpoint: " + response.getStompAddress());
                        secureEndpoint.set(response.getStompAddress());
                        loginLatch.countDown();
                    } catch (Exception e) {
                        workerError.set(e);
                        loginLatch.countDown();
                    }
                });

                if (!loginLatch.await(5000, TimeUnit.MILLISECONDS)) {
                     throw new RuntimeException("Login timed out");
                }

                if (workerError.get() != null) throw workerError.get();

                // 2. Register Secure Data Service using the discovered endpoint
                // In this test, the Bridge handles routing, so we just use the same transport.
                // But logically, we have discovered the new address "/queue/data".

                UnitRegistry.getInstance().registerRemote(MyDataService.class.getName(), "data-node", workerTransport);
                MyDataService dataStub = new MyDataService_Stub();

                MyData req = new MyData();
                req.setId("worker-1");
                req.setContent("Hello from Worker");

                logger.info("[Worker] Calling MyDataService...");

                // We need to wait for this too
                final CountDownLatch dataLatch = new CountDownLatch(1);
                dataStub.processData(req).thenAccept(v -> {
                    logger.info("[Worker] MyDataService Call returned.");
                    dataLatch.countDown();
                });

                if (!dataLatch.await(5000, TimeUnit.MILLISECONDS)) {
                     throw new RuntimeException("Data call timed out");
                }

                doneLatch.countDown();

            } catch (Throwable e) {
                e.printStackTrace();
                workerError.set(e);
                doneLatch.countDown();
            }
        }, "Worker-Thread").start();

        // --- 3. Main Thread Bridge (The Browser Main Thread) ---

        // Subscribe Bridge to Server Responses (/topic/replies)
        broker.subscribe("/topic/replies", message -> {
             try {
                byte[] decoded = java.util.Base64.getDecoder().decode(message.getBody());
                workerTransport.injectIncoming(decoded);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        long start = System.currentTimeMillis();

        while (System.currentTimeMillis() - start < 10000) {
            byte[] msg = workerTransport.pollOutgoing(100, TimeUnit.MILLISECONDS);
            if (msg != null) {
                String base64 = java.util.Base64.getEncoder().encodeToString(msg);

                // Broadcast to potential service queues
                broker.send("/queue/auth", base64);
                broker.send("/queue/data", base64);
            }
            if (doneLatch.getCount() == 0)
                break;
        }

        if (workerError.get() != null) {
            throw new RuntimeException("Worker failed", workerError.get());
        }

        if (doneLatch.getCount() > 0) {
             throw new RuntimeException("Test Timed Out - Worker did not finish");
        }
    }

    // --- Helpers ---
    private static class MockStompClient implements StompClient {
        // Support multiple subscribers per destination for test robustness?
        // Or just use a List.
        private final Map<String, List<StompSubscriptionCallback>> subscriptions = new HashMap<>();

        @Override
        public boolean isConnected() { return true; }

        @Override
        public void send(String destination, String body) {
            logger.info("MockStompClient SEND dest={}", destination);
            List<StompSubscriptionCallback> callbacks = subscriptions.get(destination);
            if (callbacks != null) {
                for (StompSubscriptionCallback cb : callbacks) {
                    cb.onMessage(new StompMessage() {
                        @Override public String getBody() { return body; }
                        @Override public Map<String, String> getHeaders() {
                            Map<String, String> h = new HashMap<>();
                            h.put("destination", destination);
                            return h;
                        }
                    });
                }
            }
        }

        @Override
        public void subscribe(String destination, StompSubscriptionCallback callback) {
            logger.info("MockStompClient SUBSCRIBE dest={}", destination);
            subscriptions.computeIfAbsent(destination, k -> new ArrayList<>()).add(callback);
        }
    }

    private static class ForwardingStompClient implements StompClient {
        private final MockStompClient delegate;
        public ForwardingStompClient(MockStompClient delegate) { this.delegate = delegate; }
        public boolean isConnected() { return true; }
        public void send(String d, String b) { delegate.send(d, b); }
        public void subscribe(String d, StompSubscriptionCallback c) { delegate.subscribe(d, c); }
    }
}
