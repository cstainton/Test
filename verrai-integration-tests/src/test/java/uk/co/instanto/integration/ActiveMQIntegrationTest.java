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
import uk.co.instanto.integration.service.MyDataService;
import uk.co.instanto.integration.service.MyDataService_Dispatcher;
import uk.co.instanto.integration.service.MyDataService_Stub;
import uk.co.instanto.integration.service.dto.Employee;
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
    public void testEndToEndRpcOverStomp() throws InterruptedException {
        String host = activeMq.getHost();
        Integer port = activeMq.getMappedPort(61613);

        logger.info("ActiveMQ started at {}:{}", host, port);

        // Define queues
        String requestQueue = "/queue/rpc.request";
        String responseQueue = "/queue/rpc.response";

        // --- 1. Setup Service Provider (Worker Side) ---
        providerClient = new TestStompClient(host, port, "admin", "admin");
        providerClient.connect();

        // Worker listens on requestQueue, sends responses to responseQueue
        StompTransport workerTransport = new StompTransport(providerClient, responseQueue, requestQueue);
        WorkerBootstrap worker = new WorkerBootstrap(workerTransport);
        worker.registerDispatcher("uk.co.instanto.integration.service.MyDataService", new MyDataService_Dispatcher());

        // Register Implementation
        AtomicReference<MyData> receivedData = new AtomicReference<>();
        AtomicBoolean methodCalled = new AtomicBoolean(false);

        MyDataService impl = new MyDataService() {
            @Override
            public AsyncResult<Void> processData(MyData data) {
                logger.info("Worker received call: processData({})", data != null ? data.getContent() : "null");
                receivedData.set(data);
                methodCalled.set(true);
                AsyncResultImpl<Void> res = new AsyncResultImpl<>();
                res.complete(null);
                return res;
            }

            @Override
            public AsyncResult<Employee> getBoss(Organization org) {
                return null;
            }
        };
        UnitRegistry.register("uk.co.instanto.integration.service.MyDataService", impl);

        // --- 2. Setup Client (Caller Side) ---
        consumerClient = new TestStompClient(host, port, "admin", "admin");
        consumerClient.connect();

        // Client sends requests to requestQueue, listens on responseQueue
        StompTransport clientTransport = new StompTransport(consumerClient, requestQueue, responseQueue);
        // Register remote service location
        UnitRegistry.getInstance().registerRemote(MyDataService.class.getName(), "activemq-node", clientTransport);

        MyDataService serviceProxy = new MyDataService_Stub();

        // --- 3. Invoke ---
        MyData input = new MyData();
        input.setId("integration-test-id");
        input.setContent("Hello ActiveMQ!");

        logger.info("Client calling processData...");
        CountDownLatch latch = new CountDownLatch(1);

        // Call service
        serviceProxy.processData(input).thenAccept(v -> {
            logger.info("Client received RPC response (Void).");
            latch.countDown();
        });

        // --- 4. Verify ---
        boolean completed = latch.await(15, TimeUnit.SECONDS);

        if (!completed) {
            logger.error("RPC call timed out!");
        }
        assertTrue("RPC call should complete within timeout", completed);

        assertTrue("Service method should have been called", methodCalled.get());
        assertNotNull("Worker should have received data object", receivedData.get());
        assertEquals("Hello ActiveMQ!", receivedData.get().getContent());
        assertEquals("integration-test-id", receivedData.get().getId());
    }
}
