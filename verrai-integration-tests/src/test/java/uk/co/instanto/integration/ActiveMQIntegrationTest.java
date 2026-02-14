package uk.co.instanto.integration;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.wait.strategy.Wait;
import uk.co.instanto.client.service.AsyncResult;
import uk.co.instanto.client.service.AsyncResultImpl;
import uk.co.instanto.client.service.RpcClient;
import uk.co.instanto.client.service.UnitRegistry;
import uk.co.instanto.client.service.WorkerBootstrap;
import uk.co.instanto.client.service.transport.StompTransport;
import uk.co.instanto.integration.service.AuthenticationService;
import uk.co.instanto.integration.service.AuthenticationService_Dispatcher;
import uk.co.instanto.integration.service.AuthenticationService_Stub;
import uk.co.instanto.integration.service.MyDataService;
import uk.co.instanto.integration.service.MyDataService_Dispatcher;
import uk.co.instanto.integration.service.MyDataService_Stub;
import uk.co.instanto.integration.service.dto.Employee;
import uk.co.instanto.client.service.dto.LogonRequest;
import uk.co.instanto.client.service.dto.LogonResponse;
import uk.co.instanto.integration.service.dto.MyData;
import uk.co.instanto.integration.service.dto.Organization;
import uk.co.instanto.integration.support.TestStompClient;

import java.time.Duration;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * Integration test using Testcontainers to verify RPC over a real STOMP broker (ActiveMQ Artemis).
 */
public class ActiveMQIntegrationTest {
    private static final Logger logger = LoggerFactory.getLogger(ActiveMQIntegrationTest.class);

    // Use ActiveMQ Artemis
    @Rule
    public GenericContainer<?> activeMq = new GenericContainer<>("apache/activemq-artemis:latest-alpine")
            .withExposedPorts(61613)
            .withEnv("ARTEMIS_USERNAME", "admin")
            .withEnv("ARTEMIS_PASSWORD", "admin")
            // Wait for STOMP port to be ready
             .waitingFor(Wait.forLogMessage(".*AMQ221007: Server is now live.*\\n", 1))
             .withStartupTimeout(Duration.ofMinutes(2));

    private TestStompClient providerClient;
    private TestStompClient consumerClient;

    @Before
    public void setUp() {
         // Setup handled by Rule
    }

    @After
    public void tearDown() {
        if (providerClient != null) providerClient.close();
        if (consumerClient != null) consumerClient.close();
    }

    @Test
    public void testDynamicEndpointDiscovery() throws InterruptedException {
        String host = activeMq.getHost();
        Integer port = activeMq.getMappedPort(61613);

        logger.info("ActiveMQ started at {}:{}", host, port);

        // Define queues
        String publicAuthQueue = "/queue/auth.public";
        String secureDataQueue = "/queue/data.secure";

        // --- 1. Setup Service Provider (Worker Side) ---
        providerClient = new TestStompClient(host, port, "admin", "admin");
        providerClient.connect();

        // Worker: Public Auth Service
        StompTransport authTransport = new StompTransport(providerClient, "/queue/rpc.response.auth", publicAuthQueue);
        WorkerBootstrap authWorker = new WorkerBootstrap(authTransport);
        authWorker.registerDispatcher(AuthenticationService.class.getName(), new AuthenticationService_Dispatcher());

        // Register Auth Implementation
        AuthenticationService authImpl = new AuthenticationService() {
            @Override
            public AsyncResult<LogonResponse> login(LogonRequest request) {
                logger.info("AuthWorker received login: user={}", request.getUsername());
                AsyncResultImpl<LogonResponse> res = new AsyncResultImpl<>();
                // Return the secure data queue address
                res.complete(new LogonResponse("token-" + request.getUsername(), secureDataQueue));
                return res;
            }
        };
        UnitRegistry.register(AuthenticationService.class.getName(), authImpl);


        // Worker: Secure Data Service (Simulated Secure Endpoint)
        // In reality, this might be on a different topic or require specific headers.
        StompTransport dataTransport = new StompTransport(providerClient, "/queue/rpc.response.data", secureDataQueue);
        WorkerBootstrap dataWorker = new WorkerBootstrap(dataTransport);
        dataWorker.registerDispatcher(MyDataService.class.getName(), new MyDataService_Dispatcher());

        // Register Data Implementation
        AtomicReference<MyData> receivedData = new AtomicReference<>();
        MyDataService dataImpl = new MyDataService() {
            @Override
            public AsyncResult<Void> processData(MyData data) {
                logger.info("DataWorker received call: processData({})", data != null ? data.getContent() : "null");
                receivedData.set(data);
                AsyncResultImpl<Void> res = new AsyncResultImpl<>();
                res.complete(null);
                return res;
            }

            @Override
            public AsyncResult<Employee> getBoss(Organization org) {
                return null;
            }
        };
        UnitRegistry.register(MyDataService.class.getName(), dataImpl);


        // --- 2. Setup Client (Caller Side) ---
        consumerClient = new TestStompClient(host, port, "admin", "admin");
        consumerClient.connect();

        // A. Initial "Public" Connection to Auth Service
        StompTransport publicClientTransport = new StompTransport(consumerClient, publicAuthQueue, "/queue/rpc.response.auth");
        // Register remote Auth Service
        UnitRegistry.getInstance().registerRemote(AuthenticationService.class.getName(), "auth-node", publicClientTransport);

        AuthenticationService authProxy = new AuthenticationService_Stub();

        // Call Login
        LogonRequest loginReq = new LogonRequest("testuser", "password");
        logger.info("Client calling login...");
        CountDownLatch latch = new CountDownLatch(1);
        AtomicReference<String> secureEndpoint = new AtomicReference<>();

        authProxy.login(loginReq).thenAccept(response -> {
            logger.info("Client received LogonResponse: endpoint={}", response.getStompAddress());
            secureEndpoint.set(response.getStompAddress());
            latch.countDown();
        });

        assertTrue("Login should complete", latch.await(10, TimeUnit.SECONDS));
        assertNotNull("Secure endpoint should be returned", secureEndpoint.get());
        assertEquals(secureDataQueue, secureEndpoint.get());


        // B. "Secure" Connection to Data Service using the discovered endpoint
        // Disconnect public transport if needed, or just create a new one.
        // In a real browser, we might reconnect or subscribe to new topic.
        // Here, we create a new Transport instance pointing to the new destination.

        StompTransport secureClientTransport = new StompTransport(consumerClient, secureEndpoint.get(), "/queue/rpc.response.data");
        // Register remote Data Service on this new transport
        UnitRegistry.getInstance().registerRemote(MyDataService.class.getName(), "data-node", secureClientTransport);

        MyDataService dataProxy = new MyDataService_Stub();

        // Call Data Service
        MyData input = new MyData();
        input.setId("secure-123");
        input.setContent("Secret Data");

        logger.info("Client calling processData on secure endpoint...");
        CountDownLatch dataLatch = new CountDownLatch(1);

        dataProxy.processData(input).thenAccept(v -> {
            logger.info("Client received Data response.");
            dataLatch.countDown();
        });

        assertTrue("Data call should complete", dataLatch.await(10, TimeUnit.SECONDS));
        assertNotNull("Worker should have received data", receivedData.get());
        assertEquals("Secret Data", receivedData.get().getContent());
    }
}
