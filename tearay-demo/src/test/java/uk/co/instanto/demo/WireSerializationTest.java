package uk.co.instanto.demo;

import okio.ByteString;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.co.instanto.client.service.proto.RpcPacket;
import uk.co.instanto.demo.service.dto.proto.Greeting;

import java.io.IOException;
import java.util.UUID;

import static org.junit.Assert.assertEquals;

public class WireSerializationTest {
    private static final Logger logger = LoggerFactory.getLogger(WireSerializationTest.class);

    @Test
    public void testEndToEndSerialization() throws IOException {
        // 1. Create a Wire-generated object (simulating application data)
        Greeting originalData = new Greeting.Builder()
                .message("Hello, World!")
                .senderNodeId("node-123")
                .build();

        // 2. Serialize data to ByteString (simulating generic argument serialization in
        // WebWorkerService)
        ByteString dataPayload = ByteString.of(Greeting.ADAPTER.encode(originalData));

        // 3. Create RPC Packet (simulating WebWorkerService envelope)
        String requestId = UUID.randomUUID().toString();
        RpcPacket requestPacket = new RpcPacket.Builder()
                .serviceId("EchoService")
                .methodName("echo")
                .requestId(requestId)
                .payload(dataPayload)
                .build();

        // 4. Serialize RPC Packet to bytes (simulating transport over postMessage)
        byte[] wireBytes = RpcPacket.ADAPTER.encode(requestPacket);

        // --- Network Boundary ---

        // 5. Deserialize RPC Packet (simulating WorkerBootstrap receive)
        RpcPacket receivedPacket = RpcPacket.ADAPTER.decode(wireBytes);

        // Verify envelope
        assertEquals("EchoService", receivedPacket.serviceId);
        assertEquals("echo", receivedPacket.methodName);
        assertEquals(requestId, receivedPacket.requestId);

        // 6. Deserialize Payload (simulating Worker Dispatcher)
        Greeting receivedData = Greeting.ADAPTER.decode(receivedPacket.payload);

        // Verify payload data
        assertEquals("Hello, World!", receivedData.message);
        assertEquals("node-123", receivedData.senderNodeId);

        logger.info("Serialization test passed!");
    }
}
