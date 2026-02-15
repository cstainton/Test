package uk.co.instanto.client.service;

import org.junit.Test;
import static org.junit.Assert.*;
import uk.co.instanto.client.service.proto.RpcPacket;
import uk.co.instanto.client.service.transport.ServiceDispatcher;
import dev.verrai.rpc.common.transport.Transport;
import dev.verrai.rpc.common.transport.MessageHandler;
import java.util.concurrent.atomic.AtomicBoolean;
import okio.ByteString;

public class RpcServerTest {

    @Test
    public void testHandleIncomingBytes_MissingAuth_Dispatches() throws Exception {
        // Setup
        MockTransport transport = new MockTransport();
        UnitRegistry registry = new UnitRegistry();
        RpcServer server = new RpcServer(transport, registry);

        // Register a dummy service
        String serviceId = "TestService";
        Object implementation = new Object();
        registry.registerLocal(serviceId, implementation);

        AtomicBoolean dispatched = new AtomicBoolean(false);
        ServiceDispatcher dispatcher = (packet, impl, trans) -> {
            dispatched.set(true);
        };
        server.registerDispatcher(serviceId, dispatcher);

        // Create a packet without auth headers
        RpcPacket packet = new RpcPacket.Builder()
            .type(RpcPacket.Type.REQUEST)
            .serviceId(serviceId)
            .methodName("testMethod")
            .requestId("123")
            .payload(ByteString.EMPTY)
            .build();

        byte[] bytes = RpcPacket.ADAPTER.encode(packet);

        // Simulate incoming message
        if (transport.handler != null) {
            transport.handler.onMessage(bytes);
        } else {
            fail("Handler not registered");
        }

        // Assert that it was dispatched (Default behavior is allow if no authenticator set)
        assertTrue("Request should have been dispatched even without auth", dispatched.get());
    }

    @Test
    public void testHandleIncomingBytes_WithAuth_Success() throws Exception {
        // Setup
        MockTransport transport = new MockTransport();
        UnitRegistry registry = new UnitRegistry();
        RpcServer server = new RpcServer(transport, registry);

        server.setAuthenticator(packet -> true); // Allow

        // Register a dummy service
        String serviceId = "TestService";
        Object implementation = new Object();
        registry.registerLocal(serviceId, implementation);

        AtomicBoolean dispatched = new AtomicBoolean(false);
        ServiceDispatcher dispatcher = (packet, impl, trans) -> {
            dispatched.set(true);
        };
        server.registerDispatcher(serviceId, dispatcher);

        // Create a packet
        RpcPacket packet = new RpcPacket.Builder()
            .type(RpcPacket.Type.REQUEST)
            .serviceId(serviceId)
            .methodName("testMethod")
            .requestId("123")
            .payload(ByteString.EMPTY)
            .build();

        byte[] bytes = RpcPacket.ADAPTER.encode(packet);

        if (transport.handler != null) {
            transport.handler.onMessage(bytes);
        } else {
            fail("Handler not registered");
        }

        assertTrue("Request should be dispatched when auth returns true", dispatched.get());
    }

    @Test
    public void testHandleIncomingBytes_WithAuth_Failure() throws Exception {
        // Setup
        MockTransport transport = new MockTransport();
        UnitRegistry registry = new UnitRegistry();
        RpcServer server = new RpcServer(transport, registry);

        server.setAuthenticator(packet -> false); // Deny

        // Register a dummy service
        String serviceId = "TestService";
        Object implementation = new Object();
        registry.registerLocal(serviceId, implementation);

        AtomicBoolean dispatched = new AtomicBoolean(false);
        ServiceDispatcher dispatcher = (packet, impl, trans) -> {
            dispatched.set(true);
        };
        server.registerDispatcher(serviceId, dispatcher);

        // Create a packet
        RpcPacket packet = new RpcPacket.Builder()
            .type(RpcPacket.Type.REQUEST)
            .serviceId(serviceId)
            .methodName("testMethod")
            .requestId("123")
            .payload(ByteString.EMPTY)
            .build();

        byte[] bytes = RpcPacket.ADAPTER.encode(packet);

        if (transport.handler != null) {
            transport.handler.onMessage(bytes);
        } else {
            fail("Handler not registered");
        }

        assertFalse("Request should NOT be dispatched when auth returns false", dispatched.get());
    }

    @Test
    public void testHandleIncomingBytes_AuthFailure_SendsError() throws Exception {
        // Setup
        MockTransport transport = new MockTransport();
        UnitRegistry registry = new UnitRegistry();
        RpcServer server = new RpcServer(transport, registry);

        // Deny all requests
        server.setAuthenticator(packet -> false);

        // Create a request packet
        RpcPacket request = new RpcPacket.Builder()
            .type(RpcPacket.Type.REQUEST)
            .serviceId("TestService")
            .methodName("testMethod")
            .requestId("req-123")
            .replyTo("/topic/reply")
            .payload(ByteString.EMPTY)
            .build();

        byte[] requestBytes = RpcPacket.ADAPTER.encode(request);

        // Simulate incoming message
        if (transport.handler != null) {
            transport.handler.onMessage(requestBytes);
        } else {
            fail("Handler not registered");
        }

        // Verify that an ERROR packet was sent
        assertNotNull("Should have sent a response", transport.lastSentMessage);

        RpcPacket response = RpcPacket.ADAPTER.decode(transport.lastSentMessage);
        assertEquals("Should be ERROR type", RpcPacket.Type.ERROR, response.type);
        assertEquals("Should match requestId", "req-123", response.requestId);
        assertEquals("Should have error message", "Authentication failed", response.payload.utf8());
    }

    // Helper classes
    static class MockTransport implements Transport {
        MessageHandler handler;
        byte[] lastSentMessage;

        @Override
        public void addMessageHandler(MessageHandler handler) {
            this.handler = handler;
        }

        @Override
        public void send(byte[] message) {
            this.lastSentMessage = message;
        }
    }
}
