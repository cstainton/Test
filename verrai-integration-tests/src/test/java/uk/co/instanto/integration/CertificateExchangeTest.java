package uk.co.instanto.integration;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.co.instanto.client.service.AsyncResult;
import uk.co.instanto.client.service.AsyncResultImpl;
import uk.co.instanto.client.service.UnitRegistry;
import uk.co.instanto.client.service.WorkerBootstrap;
import uk.co.instanto.client.service.transport.StompTransport;
import uk.co.instanto.integration.transport.SimulatedWebWorkerTransport;
import uk.co.instanto.integration.service.AuthenticationService;
import uk.co.instanto.integration.service.AuthenticationService_Dispatcher;
import uk.co.instanto.integration.service.AuthenticationService_Stub;
import uk.co.instanto.integration.service.MyDataService;
import uk.co.instanto.integration.service.MyDataService_Dispatcher;
import uk.co.instanto.integration.service.MyDataService_Stub;
import uk.co.instanto.client.service.dto.LogonRequest;
import uk.co.instanto.client.service.dto.LogonResponse;
import uk.co.instanto.integration.service.dto.MyData;
import uk.co.instanto.integration.service.dto.Employee;
import uk.co.instanto.integration.service.dto.Organization;
import dev.verrai.rpc.common.transport.stomp.StompClient;
import dev.verrai.rpc.common.transport.stomp.StompMessage;
import dev.verrai.rpc.common.transport.stomp.StompSubscriptionCallback;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

public class CertificateExchangeTest {
    private static final Logger logger = LoggerFactory.getLogger(CertificateExchangeTest.class);

    private static final String BOOTSTRAP_CERT = "CERT-BOOTSTRAP-XYZ";
    private static final String SESSION_CERT = "CERT-SESSION-ABC-123";

    @Test
    public void testCertificateExchangeFlow() throws InterruptedException {
        // --- Infrastructure ---
        MockStompClient broker = new MockStompClient();

        // Security Interceptor logic:
        // We will simulate the Broker rejecting or the Dispatcher rejecting based on Headers.
        // Since we can't easily hook into the generated Dispatcher, we'll wrap the Transport on the server side.

        // --- Server Setup ---

        // 1. Auth Service (Requires BOOTSTRAP_CERT)
        StompTransport authTransport = new SecureServerTransport(broker, "/topic/replies", "/queue/auth", BOOTSTRAP_CERT);
        WorkerBootstrap authWorker = new WorkerBootstrap(authTransport);
        authWorker.registerDispatcher(AuthenticationService.class.getName(), new AuthenticationService_Dispatcher());

        UnitRegistry.register(AuthenticationService.class.getName(), new AuthenticationService() {
            @Override
            public AsyncResult<LogonResponse> login(LogonRequest request) {
                logger.info("Server: Login request received.");
                AsyncResultImpl<LogonResponse> res = new AsyncResultImpl<>();
                // Issue Session Cert
                res.complete(new LogonResponse(SESSION_CERT, "/queue/data"));
                return res;
            }
        });

        // 2. Data Service (Requires SESSION_CERT)
        StompTransport dataTransport = new SecureServerTransport(broker, "/topic/replies", "/queue/data", SESSION_CERT);
        WorkerBootstrap dataWorker = new WorkerBootstrap(dataTransport);
        dataWorker.registerDispatcher(MyDataService.class.getName(), new MyDataService_Dispatcher());

        UnitRegistry.register(MyDataService.class.getName(), new MyDataService() {
            @Override
            public AsyncResult<Void> processData(MyData data) {
                logger.info("Server: Data processed.");
                AsyncResultImpl<Void> res = new AsyncResultImpl<>();
                res.complete(null);
                return res;
            }
            @Override public AsyncResult<Employee> getBoss(Organization org) { return null; }
        });


        // --- Client Simulation ---

        // Transport setup
        SimulatedWebWorkerTransport clientTransport = new SimulatedWebWorkerTransport();

        // Bridge Logic (Main Thread)
        // Subscribes to Broker replies and forwards to Client
        broker.subscribe("/topic/replies", msg -> {
            try {
                if (msg.getBody() != null) {
                    byte[] decoded = java.util.Base64.getDecoder().decode(msg.getBody());
                    clientTransport.injectIncoming(decoded);
                }
            } catch (Exception e) {}
        });

        // Outbound Bridge Logic
        // Reads from Client Transport and forwards to Broker
        // CRITICAL: Must attach the simulated certificate to the STOMP message!
        // We will control the certificate via a variable shared with the bridge loop.

        AtomicReference<String> currentClientCert = new AtomicReference<>(BOOTSTRAP_CERT);
        AtomicReference<String> currentDest = new AtomicReference<>("/queue/auth");

        CountDownLatch doneLatch = new CountDownLatch(1);
        AtomicReference<Throwable> error = new AtomicReference<>();

        Thread bridgeThread = new Thread(() -> {
            try {
                while (doneLatch.getCount() > 0) {
                    byte[] msg = clientTransport.pollOutgoing(100, TimeUnit.MILLISECONDS);
                    if (msg != null) {
                        String base64 = java.util.Base64.getEncoder().encodeToString(msg);
                        String cert = currentClientCert.get();
                        String dest = currentDest.get();

                        Map<String, String> headers = new HashMap<>();
                        if (cert != null) headers.put("X-Cert", cert);

                        logger.info("Bridge: Sending to {} with Cert={}", dest, cert);
                        broker.send(dest, base64, headers);
                    }
                }
            } catch (Exception e) { e.printStackTrace(); }
        });
        bridgeThread.start();


        // --- Client Scenario Execution ---
        new Thread(() -> {
            try {
                // 1. Initial Config: Auth Service at "auth-node"
                UnitRegistry.getInstance().registerRemote(AuthenticationService.class.getName(), "auth-node", clientTransport);
                AuthenticationService authStub = new AuthenticationService_Stub();

                // 2. Call Login (using BOOTSTRAP_CERT)
                logger.info("Client: Calling login...");
                LogonResponse response = getResult(authStub.login(new LogonRequest("user", "pass")));

                logger.info("Client: Login success. Token/Cert: " + response.getJwtToken());
                assertEquals(SESSION_CERT, response.getJwtToken());
                assertEquals("/queue/data", response.getStompAddress());

                // 3. Attempt Data Call with OLD Cert (BOOTSTRAP_CERT) - Should FAIL
                // We point to data node, but Bridge still has BOOTSTRAP_CERT
                currentDest.set("/queue/data");
                UnitRegistry.getInstance().registerRemote(MyDataService.class.getName(), "data-node", clientTransport);
                MyDataService dataStub = new MyDataService_Stub();

                logger.info("Client: Attempting Data Call with BOOTSTRAP cert (Expect Failure)...");
                try {
                    MyData data = new MyData();
                    data.setId("test-1");
                    data.setContent("test");
                    getResult(dataStub.processData(data));
                    fail("Should have failed due to invalid certificate");
                } catch (RuntimeException e) {
                    logger.info("Client: Caught expected error: " + e.getMessage());
                    assertTrue(e.getMessage().contains("Access Denied"));
                }

                // 4. Switch to NEW Cert (SESSION_CERT)
                logger.info("Client: Switching to SESSION cert...");
                currentClientCert.set(SESSION_CERT);

                // 5. Attempt Data Call - Should SUCCEED
                logger.info("Client: Attempting Data Call with SESSION cert...");
                MyData data = new MyData();
                data.setId("test-2");
                data.setContent("test");
                getResult(dataStub.processData(data));
                logger.info("Client: Data Call success!");

                doneLatch.countDown();

            } catch (Throwable e) {
                error.set(e);
                doneLatch.countDown();
            }
        }).start();

        boolean completed = doneLatch.await(10, TimeUnit.SECONDS);
        if (error.get() != null) throw new RuntimeException(error.get());
        assertTrue("Test timed out", completed);
    }

    private <T> T getResult(AsyncResult<T> async) throws Exception {
        CountDownLatch l = new CountDownLatch(1);
        AtomicReference<T> res = new AtomicReference<>();
        AtomicReference<Throwable> err = new AtomicReference<>();

        async.thenAccept(v -> {
            res.set(v);
            l.countDown();
        }).exceptionally(e -> {
            err.set(e);
            l.countDown();
            return null;
        });

        if (!l.await(5, TimeUnit.SECONDS)) throw new RuntimeException("Async timeout");
        if (err.get() != null) throw new RuntimeException(err.get());
        return res.get();
    }

    // --- Helpers ---

    /**
     * A Server-side transport wrapper that enforces Security Headers.
     */
    private static class SecureServerTransport extends StompTransport {
        private final String requiredCert;

        public SecureServerTransport(StompClient client, String sendDest, String subDest, String requiredCert) {
            super(client, sendDest, subDest); // Uses standard constructor
            this.requiredCert = requiredCert;
        }

        // We override the listener setup? No, StompTransport registers listener in constructor.
        // We need to Intercept the callback.
        // StompTransport.onStompMessage is private.
        // But StompClient is ours! MockStompClient.

        // Better: Configure MockStompClient to filter delivery?
        // No, Transport receives it.
        // Let's rely on MockStompClient logic to only deliver if allowed?
        // Or wrap the client passed to StompTransport.
    }

    // Revised Strategy: Wrap StompClient passed to Server Transport
    // The Server Transport subscribes to "/queue/auth".
    // When a message arrives on "/queue/auth", the WRAPPER checks the header.
    // If invalid, it drops the message (or sends error).

    // Actually, let's just make MockStompClient smart enough to act as the Broker Enforcer.

    private static class MockStompClient implements StompClient {
        private final Map<String, java.util.List<StompSubscriptionCallback>> subscriptions = new HashMap<>();

        @Override public boolean isConnected() { return true; }

        public void send(String destination, String body) {
            send(destination, body, Collections.emptyMap());
        }

        public void send(String destination, String body, Map<String, String> headers) {
            // BROKER SECURITY LOGIC SIMULATION
            if ("/queue/auth".equals(destination)) {
                String cert = headers.get("X-Cert");
                if (!BOOTSTRAP_CERT.equals(cert)) {
                    logger.warn("Broker: Denied access to {} with cert {}", destination, cert);
                    // Send Error Response back to reply topic?
                    // In real STOMP, broker sends ERROR frame.
                    // Here we can simulate an RPC ERROR packet response if we know the reply destination.
                    // But we don't know request ID easily to correlate.
                    // We'll just DROP it, causing timeout (Access Denied).
                    // OR better: throw exception so Sender knows? No, async.

                    // To simulate "Access Denied" error visible to client:
                    // We need to send an RPC ERROR packet to "/topic/replies".
                    // But we need the Request ID.
                    // Let's decode the packet to extract ID.
                    try {
                        byte[] bytes = java.util.Base64.getDecoder().decode(body);
                        uk.co.instanto.client.service.proto.RpcPacket req = uk.co.instanto.client.service.proto.RpcPacket.ADAPTER.decode(bytes);

                        uk.co.instanto.client.service.proto.RpcPacket err = new uk.co.instanto.client.service.proto.RpcPacket.Builder()
                            .type(uk.co.instanto.client.service.proto.RpcPacket.Type.ERROR)
                            .requestId(req.requestId)
                            .payload(okio.ByteString.encodeUtf8("Access Denied: Invalid Certificate"))
                            .build();

                        String errBase64 = java.util.Base64.getEncoder().encodeToString(uk.co.instanto.client.service.proto.RpcPacket.ADAPTER.encode(err));
                        deliverTo("/topic/replies", errBase64);
                    } catch(Exception e) { e.printStackTrace(); }
                    return;
                }
            } else if ("/queue/data".equals(destination)) {
                String cert = headers.get("X-Cert");
                if (!SESSION_CERT.equals(cert)) {
                    logger.warn("Broker: Denied access to {} with cert {}", destination, cert);
                    try {
                        byte[] bytes = java.util.Base64.getDecoder().decode(body);
                        uk.co.instanto.client.service.proto.RpcPacket req = uk.co.instanto.client.service.proto.RpcPacket.ADAPTER.decode(bytes);

                        uk.co.instanto.client.service.proto.RpcPacket err = new uk.co.instanto.client.service.proto.RpcPacket.Builder()
                            .type(uk.co.instanto.client.service.proto.RpcPacket.Type.ERROR)
                            .requestId(req.requestId)
                            .payload(okio.ByteString.encodeUtf8("Access Denied: Invalid Certificate"))
                            .build();

                        String errBase64 = java.util.Base64.getEncoder().encodeToString(uk.co.instanto.client.service.proto.RpcPacket.ADAPTER.encode(err));
                        deliverTo("/topic/replies", errBase64);
                    } catch(Exception e) { e.printStackTrace(); }
                    return;
                }
            }

            deliverTo(destination, body);
        }

        private void deliverTo(String destination, String body) {
            java.util.List<StompSubscriptionCallback> cbs = subscriptions.get(destination);
            if (cbs != null) {
                for(StompSubscriptionCallback cb : cbs) {
                    cb.onMessage(new StompMessage() {
                        @Override public String getBody() { return body; }
                        @Override public Map<String, String> getHeaders() { return new HashMap<>(); }
                    });
                }
            }
        }

        @Override
        public void subscribe(String destination, StompSubscriptionCallback callback) {
            subscriptions.computeIfAbsent(destination, k -> new java.util.ArrayList<>()).add(callback);
        }
    }
}
