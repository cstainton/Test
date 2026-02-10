package uk.co.instanto.integration;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.co.instanto.client.service.RpcClient;
import uk.co.instanto.client.service.WorkerBootstrap;
import uk.co.instanto.client.service.UnitRegistry;
import uk.co.instanto.client.service.transport.LocalTransport;
import uk.co.instanto.integration.service.*;
import uk.co.instanto.integration.service.dto.*;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class ComplexGraphTest {
    private static final Logger logger = LoggerFactory.getLogger(ComplexGraphTest.class);

    @Test
    public void testComplexObjectGraph() {
        // 1. Setup Local Transport
        LocalTransport clientSide = new LocalTransport();
        LocalTransport workerSide = new LocalTransport();
        clientSide.connect(workerSide);
        workerSide.connect(clientSide);

        // 2. Setup Client
        RpcClient client = new RpcClient(clientSide);
        MyDataService serviceProxy = new MyDataService_Stub(client);

        // 3. Setup Worker
        WorkerBootstrap worker = new WorkerBootstrap(workerSide);
        worker.registerDispatcher("uk.co.instanto.integration.service.MyDataService", new MyDataService_Dispatcher());

        MyDataService implementation = new MyDataService() {
            @Override
            public uk.co.instanto.client.service.AsyncResult<Void> processData(MyData data) {
                uk.co.instanto.client.service.AsyncResultImpl<Void> res = new uk.co.instanto.client.service.AsyncResultImpl<>();
                res.complete(null);
                return res;
            }

            @Override
            public uk.co.instanto.client.service.AsyncResult<Employee> getBoss(Organization org) {
                // Verify the list of employees was received
                if (org.getPrimaryDepartment().getEmployees().size() != 2) {
                    throw new RuntimeException(
                            "Expected 2 employees, but got: " + org.getPrimaryDepartment().getEmployees().size());
                }
                // Return the manager of the primary department
                uk.co.instanto.client.service.AsyncResultImpl<Employee> res = new uk.co.instanto.client.service.AsyncResultImpl<>();
                res.complete(org.getPrimaryDepartment().getManager());
                return res;
            }
        };
        UnitRegistry.register("uk.co.instanto.integration.service.MyDataService", implementation);

        // 4. Create Complex Graph
        Address bossAddress = new Address("10 Downing St", "London");
        Employee boss = new Employee("The Big Boss", bossAddress);
        boss.setTags(new String[] { "founder", "ceo" });

        Address devAddress = new Address("1 Infinite Loop", "Cupertino");
        Employee developer = new Employee("Senior Dev", devAddress);
        developer.setTags(new String[] { "coding", "java" });

        Department dept = new Department("Management", boss);
        dept.getEmployees().add(boss);
        dept.getEmployees().add(developer);

        Organization org = new Organization("Instanto Corp", dept);

        // 5. Invoke
        final java.util.concurrent.atomic.AtomicReference<Employee> resultRef = new java.util.concurrent.atomic.AtomicReference<>();
        final java.util.concurrent.CountDownLatch latch = new java.util.concurrent.CountDownLatch(1);
        final java.util.concurrent.atomic.AtomicReference<Throwable> errorRef = new java.util.concurrent.atomic.AtomicReference<>();

        serviceProxy.getBoss(org).thenAccept(res -> {
            resultRef.set(res);
            latch.countDown();
        }).exceptionally(ex -> {
            errorRef.set(ex);
            latch.countDown();
            return null;
        });

        try {
            if (!latch.await(5, java.util.concurrent.TimeUnit.SECONDS)) {
                throw new RuntimeException("Timed out waiting for result");
            }
        } catch (InterruptedException e) {
            throw new RuntimeException("Interrupted waiting for result", e);
        }

        if (errorRef.get() != null) {
            throw new RuntimeException("Async call failed", errorRef.get());
        }

        Employee result = resultRef.get();

        // 6. Verify
        assertNotNull("Result should not be null", result);
        assertEquals("The Big Boss", result.getName());
        assertNotNull("Address should not be null", result.getAddress());
        assertEquals("10 Downing St", result.getAddress().getStreet());
        assertEquals("London", result.getAddress().getCity());
        assertNotNull("Tags should not be null", result.getTags());
        assertEquals(2, result.getTags().length);
        assertEquals("founder", result.getTags()[0]);
        assertEquals("ceo", result.getTags()[1]);

        // Verify original org on worker side (via reflection or by checking if dept had
        // employees)
        // Since we are in LocalTransport, the object is shared? No, it's serialized.
        // Let's modify the service implementation to verify the list size.

        logger.info("Complex Object Graph test passed!");
    }
}
