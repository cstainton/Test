package uk.co.instanto.integration;

import okio.ByteString;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.co.instanto.client.service.proto.RpcPacket;
import uk.co.instanto.integration.service.dto.proto.MyData;

import java.io.IOException;
import java.util.UUID;

import static org.junit.Assert.assertEquals;

public class WireSerializationTest {
    private static final Logger logger = LoggerFactory.getLogger(WireSerializationTest.class);

    @Test
    public void testEndToEndSerialization() throws IOException {
        // 1. Create a Wire-generated object (simulating application data)
        MyData originalData = new MyData.Builder()
                .id("test-id")
                .content("test-content")
                .value(123)
                .build();

        // 2. Serialize data to ByteString (simulating generic argument serialization in
        // WebWorkerService)
        ByteString dataPayload = ByteString.of(MyData.ADAPTER.encode(originalData));

        // 3. Create RPC Packet (simulating WebWorkerService envelope)
        String requestId = UUID.randomUUID().toString();
        RpcPacket requestPacket = new RpcPacket.Builder()
                .serviceId("MyService")
                .methodName("doSomething")
                .requestId(requestId)
                .payload(dataPayload)
                .build();

        // 4. Serialize RPC Packet to bytes (simulating transport over postMessage)
        byte[] wireBytes = RpcPacket.ADAPTER.encode(requestPacket);

        // --- Network Boundary ---

        // 5. Deserialize RPC Packet (simulating WorkerBootstrap receive)
        RpcPacket receivedPacket = RpcPacket.ADAPTER.decode(wireBytes);

        // Verify envelope
        assertEquals("MyService", receivedPacket.serviceId);
        assertEquals("doSomething", receivedPacket.methodName);
        assertEquals(requestId, receivedPacket.requestId);

        // 6. Deserialize Payload (simulating Worker Dispatcher)
        // In a real generic dispatcher, we'd determine the type based on
        // serviceId/methodName
        MyData receivedData = MyData.ADAPTER.decode(receivedPacket.payload);

        // Verify payload data
        assertEquals("test-id", receivedData.id);
        assertEquals("test-content", receivedData.content);
        assertEquals(123, (int) receivedData.value);

        logger.info("Serialization test passed!");
    }
}
