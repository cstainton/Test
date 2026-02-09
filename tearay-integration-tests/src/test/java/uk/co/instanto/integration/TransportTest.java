package uk.co.instanto.integration;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.co.instanto.client.service.RpcClient;
import uk.co.instanto.client.service.UnitRegistry;
import uk.co.instanto.client.service.WorkerBootstrap;
import uk.co.instanto.client.service.transport.LocalTransport;
import uk.co.instanto.integration.service.dto.MyData;
import uk.co.instanto.integration.service.dto.Employee;
import uk.co.instanto.integration.service.dto.Organization;
import uk.co.instanto.integration.service.MyDataService;
import uk.co.instanto.integration.service.MyDataService_Stub;

import java.util.concurrent.atomic.AtomicReference;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class TransportTest {
    private static final Logger logger = LoggerFactory.getLogger(TransportTest.class);

    @Test
    public void testLocalTransport() {
        // 1. Setup two LocalTransports connected to each other
        LocalTransport clientSide = new LocalTransport();
        LocalTransport workerSide = new LocalTransport();

        clientSide.connect(workerSide);
        workerSide.connect(clientSide);

        // 2. Setup Client
        RpcClient client = new RpcClient(clientSide);
        MyDataService serviceProxy = new MyDataService_Stub(client);

        // 3. Setup Worker (on the same thread for this test)
        WorkerBootstrap worker = new WorkerBootstrap(workerSide);
        worker.registerDispatcher("uk.co.instanto.integration.service.MyDataService",
                new uk.co.instanto.integration.service.MyDataService_Dispatcher());

        // Setup a mock service implementation
        AtomicReference<MyData> receivedData = new AtomicReference<>();
        MyDataService implementation = new MyDataService() {
            @Override
            public uk.co.instanto.client.service.AsyncResult<Void> processData(MyData data) {
                logger.info("Service implementation received: {}", data.getContent());
                receivedData.set(data);
                uk.co.instanto.client.service.AsyncResultImpl<Void> res = new uk.co.instanto.client.service.AsyncResultImpl<>();
                res.complete(null);
                return res;
            }

            @Override
            public uk.co.instanto.client.service.AsyncResult<Employee> getBoss(Organization org) {
                uk.co.instanto.client.service.AsyncResultImpl<Employee> res = new uk.co.instanto.client.service.AsyncResultImpl<>();
                res.complete(org.getPrimaryDepartment().getManager());
                return res;
            }
        };

        UnitRegistry.register("uk.co.instanto.integration.service.MyDataService", implementation);

        // 4. Invoke
        MyData input = new MyData();
        input.setId("rpc-1");
        input.setContent("Hello Pluggable Transports!");
        input.setValue(42);

        serviceProxy.processData(input);

        // 5. Verify
        assertNotNull("Worker should have received the data", receivedData.get());
        assertEquals("rpc-1", receivedData.get().getId());
        assertEquals("Hello Pluggable Transports!", receivedData.get().getContent());
        assertEquals(42, receivedData.get().getValue());

        logger.info("LocalTransport RPC test passed!");
    }
}
