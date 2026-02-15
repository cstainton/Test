package uk.co.instanto.client.service;

import dev.verrai.rpc.common.serialization.Serializer;
import dev.verrai.rpc.common.transport.MessageHandler;
import dev.verrai.rpc.common.transport.Transport;
import okio.ByteString;
import org.junit.Before;
import org.junit.Test;
import uk.co.instanto.client.service.proto.RpcPacket;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.Assert.*;

public class RpcClientTest {

    private MockTransport transport;
    private RpcClient client;
    private StringSerializer serializer;

    @Before
    public void setUp() {
        transport = new MockTransport();
        client = new RpcClient(transport);
        serializer = new StringSerializer();
        client.setSerializer(serializer);
    }

    @Test
    public void testInvokeStubSuccess() throws Exception {
        String serviceId = "testService";
        String methodId = "testMethod";
        String requestData = "request";
        String responseData = "response";

        // RpcClient returns raw bytes, user/stub is responsible for decoding
        AsyncResult<byte[]> future = client.invokeStub(serviceId, methodId, new Object[]{requestData});

        // Verify request sent
        assertEquals(1, transport.sentPackets.size());
        RpcPacket sentPacket = transport.sentPackets.get(0);
        assertEquals(serviceId, sentPacket.serviceId);
        assertEquals(methodId, sentPacket.methodName);
        assertEquals(RpcPacket.Type.REQUEST, sentPacket.type);
        assertEquals(requestData, sentPacket.payload.utf8());

        // Simulate response
        RpcPacket responsePacket = new RpcPacket.Builder()
                .type(RpcPacket.Type.RESPONSE)
                .requestId(sentPacket.requestId)
                .payload(ByteString.encodeUtf8(responseData))
                .build();
        transport.injectResponse(responsePacket);

        final AtomicReference<String> resultRef = new AtomicReference<>();
        final CountDownLatch latch = new CountDownLatch(1);
        future.thenAccept(resBytes -> {
            String res = new String(resBytes, StandardCharsets.UTF_8);
            resultRef.set(res);
            latch.countDown();
        });

        assertTrue(latch.await(1, TimeUnit.SECONDS));
        assertEquals(responseData, resultRef.get());
    }

    @Test
    public void testInvokeStubError() throws Exception {
        String serviceId = "testService";
        String methodId = "testMethod";
        String requestData = "request";
        String errorMessage = "Something went wrong";

        AsyncResult<byte[]> future = client.invokeStub(serviceId, methodId, new Object[]{requestData});

        assertEquals(1, transport.sentPackets.size());
        RpcPacket sentPacket = transport.sentPackets.get(0);

        // Simulate error response
        RpcPacket errorPacket = new RpcPacket.Builder()
                .type(RpcPacket.Type.ERROR)
                .requestId(sentPacket.requestId)
                .payload(ByteString.encodeUtf8(errorMessage))
                .build();
        transport.injectResponse(errorPacket);

        final AtomicReference<Throwable> errorRef = new AtomicReference<>();
        final CountDownLatch latch = new CountDownLatch(1);
        future.exceptionally(ex -> {
            errorRef.set(ex);
            latch.countDown();
            return null;
        });

        assertTrue(latch.await(1, TimeUnit.SECONDS));
        assertNotNull(errorRef.get());
        assertEquals(errorMessage, errorRef.get().getMessage());
    }

    @Test
    public void testInvokeStreamStubSuccess() throws Exception {
        String serviceId = "streamService";
        String methodId = "streamMethod";
        String requestData = "startStream";

        // RpcClient returns raw bytes for stream too
        AsyncStreamResult<byte[]> streamResult = client.invokeStreamStub(serviceId, methodId, new Object[]{requestData});

        assertEquals(1, transport.sentPackets.size());
        RpcPacket sentPacket = transport.sentPackets.get(0);
        assertEquals(RpcPacket.Type.REQUEST, sentPacket.type);

        List<String> receivedItems = new ArrayList<>();
        CountDownLatch completeLatch = new CountDownLatch(1);

        streamResult.subscribe(
            bytes -> receivedItems.add(new String(bytes, StandardCharsets.UTF_8)),
            e -> {},
            completeLatch::countDown
        );

        // Simulate STREAM_DATA
        RpcPacket dataPacket1 = new RpcPacket.Builder()
                .type(RpcPacket.Type.STREAM_DATA)
                .requestId(sentPacket.requestId)
                .payload(ByteString.encodeUtf8("item1"))
                .build();
        transport.injectResponse(dataPacket1);

        RpcPacket dataPacket2 = new RpcPacket.Builder()
                .type(RpcPacket.Type.STREAM_DATA)
                .requestId(sentPacket.requestId)
                .payload(ByteString.encodeUtf8("item2"))
                .build();
        transport.injectResponse(dataPacket2);

        // Simulate STREAM_COMPLETE
        RpcPacket completePacket = new RpcPacket.Builder()
                .type(RpcPacket.Type.STREAM_COMPLETE)
                .requestId(sentPacket.requestId)
                .build();
        transport.injectResponse(completePacket);

        assertTrue(completeLatch.await(1, TimeUnit.SECONDS));
        assertEquals(2, receivedItems.size());
        assertEquals("item1", receivedItems.get(0));
        assertEquals("item2", receivedItems.get(1));
    }

    @Test
    public void testInvokeStreamStubError() throws Exception {
        String serviceId = "streamService";
        String methodId = "streamMethod";
        String errorMessage = "Stream failed";

        AsyncStreamResult<byte[]> streamResult = client.invokeStreamStub(serviceId, methodId, new Object[]{"start"});
        RpcPacket sentPacket = transport.sentPackets.get(0);

        final AtomicReference<Throwable> errorRef = new AtomicReference<>();
        CountDownLatch errorLatch = new CountDownLatch(1);
        streamResult.subscribe(item -> {}, ex -> {
            errorRef.set(ex);
            errorLatch.countDown();
        }, () -> {});

        // Simulate STREAM_ERROR
        RpcPacket errorPacket = new RpcPacket.Builder()
                .type(RpcPacket.Type.STREAM_ERROR)
                .requestId(sentPacket.requestId)
                .payload(ByteString.encodeUtf8(errorMessage))
                .build();
        transport.injectResponse(errorPacket);

        assertTrue(errorLatch.await(1, TimeUnit.SECONDS));
        assertNotNull(errorRef.get());
        assertEquals(errorMessage, errorRef.get().getMessage());
    }

    @Test
    public void testDefaultHeaders() {
        client.setDefaultHeader("Auth", "Token123");
        client.setDefaultHeader("Trace-Id", "abc-def");

        client.invokeStub("srv", "method", new Object[]{"data"});

        assertEquals(1, transport.sentPackets.size());
        RpcPacket packet = transport.sentPackets.get(0);

        assertNotNull(packet.headers);
        assertEquals("Token123", packet.headers.get("Auth"));
        assertEquals("abc-def", packet.headers.get("Trace-Id"));
    }

    // --- Inner Classes ---

    private static class MockTransport implements Transport {
        final List<RpcPacket> sentPackets = new ArrayList<>();
        MessageHandler handler;

        @Override
        public void send(byte[] data) {
            try {
                RpcPacket packet = RpcPacket.ADAPTER.decode(data);
                sentPackets.add(packet);
            } catch (Exception e) {
                throw new RuntimeException("Failed to decode sent packet", e);
            }
        }

        @Override
        public void addMessageHandler(MessageHandler handler) {
            this.handler = handler;
        }

        void injectResponse(RpcPacket packet) {
            if (handler != null) {
                byte[] data = RpcPacket.ADAPTER.encode(packet);
                handler.onMessage(data);
            }
        }
    }

    private static class StringSerializer implements Serializer {
        @Override
        public <T> byte[] encode(T object) {
            return object.toString().getBytes(StandardCharsets.UTF_8);
        }

        @Override
        public <T> T decode(byte[] bytes, Class<T> clazz) {
            return clazz.cast(new String(bytes, StandardCharsets.UTF_8));
        }

        @Override
        public <T> void register(Class<T> clazz, Object adapterOrCodec) {
            // No-op
        }

        @Override
        public String getContentType() {
            return "text/plain";
        }
    }
}
