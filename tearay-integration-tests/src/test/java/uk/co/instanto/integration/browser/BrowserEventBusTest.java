package uk.co.instanto.integration.browser;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.teavm.junit.TeaVMTestRunner;
import uk.co.instanto.client.service.EventBus;
import uk.co.instanto.client.service.dto.proto.NodeAnnouncedEvent;
import uk.co.instanto.client.service.transport.LocalTransport;
import java.util.ArrayList;
import java.util.Collections;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

@RunWith(TeaVMTestRunner.class)
public class BrowserEventBusTest {

    @Test
    public void testEventBusWithProtoInBrowser() {
        System.out.println("BrowserEventBusTest: Starting test...");

        // 1. Setup Bus 1 (Sender)
        EventBus senderBus = new EventBus("sender-node");
        registerCodec(senderBus);
        LocalTransport senderTransport = new LocalTransport();
        senderBus.addTransport(senderTransport);

        // 2. Setup Bus 2 (Receiver)
        EventBus receiverBus = new EventBus("receiver-node");
        registerCodec(receiverBus);
        LocalTransport receiverTransport = new LocalTransport();
        receiverBus.addTransport(receiverTransport);

        // 3. Wire Transports
        senderTransport.connect(receiverTransport);
        receiverTransport.connect(senderTransport);

        // 4. Subscribe on Receiver
        final boolean[] received = { false };
        receiverBus.subscribe(NodeAnnouncedEvent.class, event -> {
            System.out.println("BrowserEventBusTest: Received event from " + event.nodeId);
            received[0] = true;
            assertEquals("sender-node", event.nodeId);
        });

        // 5. Publish on Sender
        NodeAnnouncedEvent event = new NodeAnnouncedEvent.Builder()
                .nodeId("sender-node")
                .serviceIds(new ArrayList<>())
                .timestamp(System.currentTimeMillis())
                .build();

        senderBus.publish(event);

        // TeaVM/LocalTransport is synchronous, so result should be immediate
        assertTrue("Receiver should have processed event", received[0]);
        System.out.println("BrowserEventBusTest: Success!");
    }

    private void registerCodec(EventBus bus) {
        bus.registerCodec(NodeAnnouncedEvent.class,
                new uk.co.instanto.tearay.rpc.common.codec.Codec<NodeAnnouncedEvent, NodeAnnouncedEvent>() {
                    @Override
                    public NodeAnnouncedEvent toWire(NodeAnnouncedEvent domain) {
                        return domain;
                    }

                    @Override
                    public NodeAnnouncedEvent fromWire(NodeAnnouncedEvent wire) {
                        return wire;
                    }

                    @Override
                    public com.squareup.wire.ProtoAdapter<NodeAnnouncedEvent> getWireAdapter() {
                        return NodeAnnouncedEvent.ADAPTER;
                    }
                });
    }
}
