package uk.co.instanto.client.service;

import org.junit.Test;
import static org.junit.Assert.*;
import java.util.concurrent.atomic.AtomicBoolean;
import uk.co.instanto.client.service.proto.EventPacket;
import uk.co.instanto.client.service.proto.RpcPacket;
import okio.ByteString;
import dev.verrai.rpc.common.codec.Codec;
import com.squareup.wire.ProtoAdapter;
import com.squareup.wire.Message;
import dev.verrai.rpc.common.transport.Transport;
import java.util.UUID;
import dev.verrai.rpc.common.transport.MessageHandler;
import uk.co.instanto.client.service.Scope;

public class EventBusSecurityTest {

    // Simple POJO event
    public static class TestEvent {
        public String data;
        public TestEvent(String data) { this.data = data; }
    }

    // Mock transport for injection
    static class MockTransport implements Transport {
        private MessageHandler handler;

        @Override
        public void send(byte[] bytes) {
            // No-op for send in this test
        }

        @Override
        public void addMessageHandler(MessageHandler handler) {
            this.handler = handler;
        }

        public void inject(byte[] bytes) {
            if (handler != null) {
                handler.onMessage(bytes);
            }
        }
    }

    private Codec<TestEvent, RpcPacket> testCodec = new Codec<TestEvent, RpcPacket>() {
        @Override
        public RpcPacket toWire(TestEvent domain) {
             return new RpcPacket.Builder()
                 .requestId(domain.data) // Abuse requestId to store string data
                 .build();
        }

        @Override
        public TestEvent fromWire(RpcPacket wire) {
            return new TestEvent(wire.requestId);
        }

        @Override
        public ProtoAdapter<RpcPacket> getWireAdapter() {
            return RpcPacket.ADAPTER;
        }
    };

    private byte[] createPacket(String publisherId) {
        // 1. Create the inner payload (TestEvent -> RpcPacket wire bytes)
        RpcPacket wireEvent = new RpcPacket.Builder().requestId("payload").build();
        byte[] eventPayload = RpcPacket.ADAPTER.encode(wireEvent);

        // 2. Create the EventPacket wrapping the payload
        EventPacket eventPacket = new EventPacket.Builder()
            .eventType(TestEvent.class.getName())
            .payload(ByteString.of(eventPayload))
            .publisherId(publisherId)
            .timestamp(System.currentTimeMillis())
            .build();

        byte[] eventPacketBytes = EventPacket.ADAPTER.encode(eventPacket);

        // 3. Create the RpcPacket wrapping the EventPacket
        RpcPacket envelope = new RpcPacket.Builder()
            .type(RpcPacket.Type.EVENT)
            .requestId(UUID.randomUUID().toString())
            .payload(ByteString.of(eventPacketBytes))
            .build();

        return RpcPacket.ADAPTER.encode(envelope);
    }

    @Test
    public void testLocalScopeEnforcement() throws Exception {
        EventBus bus = new EventBus("local-node");
        AtomicBoolean received = new AtomicBoolean(false);
        MockTransport transport = new MockTransport();
        bus.addTransport(transport);

        bus.registerCodec(TestEvent.class, testCodec);
        bus.registerEventScope(TestEvent.class, Scope.LOCAL); // Enforce LOCAL scope

        bus.subscribe(TestEvent.class, event -> {
            received.set(true);
        });

        transport.inject(createPacket("remote-node"));

        assertFalse("Should NOT have received LOCAL event from remote transport", received.get());
    }

    @Test
    public void testAuthorizedPublisherEnforcement_Unauthorized() throws Exception {
        EventBus bus = new EventBus("local-node");
        AtomicBoolean received = new AtomicBoolean(false);
        MockTransport transport = new MockTransport();
        bus.addTransport(transport);

        bus.registerCodec(TestEvent.class, testCodec);
        bus.addAuthorizedPublisher(TestEvent.class, "good-node"); // Enforce ACL

        bus.subscribe(TestEvent.class, event -> {
            received.set(true);
        });

        transport.inject(createPacket("evil-node"));

        assertFalse("Should NOT have received event from unauthorized publisher", received.get());
    }

    @Test
    public void testAuthorizedPublisherEnforcement_Authorized() throws Exception {
        EventBus bus = new EventBus("local-node");
        AtomicBoolean received = new AtomicBoolean(false);
        MockTransport transport = new MockTransport();
        bus.addTransport(transport);

        bus.registerCodec(TestEvent.class, testCodec);
        bus.addAuthorizedPublisher(TestEvent.class, "good-node"); // Enforce ACL

        bus.subscribe(TestEvent.class, event -> {
            received.set(true);
        });

        transport.inject(createPacket("good-node"));

        assertTrue("Should have received event from authorized publisher", received.get());
    }

    @Test
    public void testDefaultBehavior() throws Exception {
        EventBus bus = new EventBus("local-node");
        AtomicBoolean received = new AtomicBoolean(false);
        MockTransport transport = new MockTransport();
        bus.addTransport(transport);

        bus.registerCodec(TestEvent.class, testCodec);
        // No security config

        bus.subscribe(TestEvent.class, event -> {
            received.set(true);
        });

        transport.inject(createPacket("any-node"));

        assertTrue("Should receive event by default (backward compatibility)", received.get());
    }
}
