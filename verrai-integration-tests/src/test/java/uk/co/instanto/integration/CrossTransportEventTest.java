package uk.co.instanto.integration;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.co.instanto.client.service.EventBus;
import uk.co.instanto.client.service.EventHandler;
import uk.co.instanto.client.service.dto.proto.NodeAnnouncedEvent;
import uk.co.instanto.client.service.transport.StompTransport;
import uk.co.instanto.integration.transport.SimulatedWebWorkerTransport;
import uk.co.instanto.tearay.rpc.common.transport.stomp.StompClient;
import uk.co.instanto.tearay.rpc.common.transport.stomp.StompMessage;
import uk.co.instanto.tearay.rpc.common.transport.stomp.StompSubscriptionCallback;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class CrossTransportEventTest {
    private static final Logger logger = LoggerFactory.getLogger(CrossTransportEventTest.class);

    @Test
    public void testEventPropagation() throws Exception {
        // Shared Broker
        MockStompClient broker = new MockStompClient();
        String EVENT_TOPIC = "/topic/events";

        // --- Server Side ---
        // Server listens on EVENT_TOPIC and sends to EVENT_TOPIC
        StompTransport serverEventTransport = new StompTransport(broker, EVENT_TOPIC, EVENT_TOPIC);
        EventBus serverBus = new EventBus("ServerNode");
        serverBus.addTransport(serverEventTransport);

        // Server listens for events
        CountDownLatch serverReceivedLatch = new CountDownLatch(1);
        AtomicReference<NodeAnnouncedEvent> serverReceivedEvent = new AtomicReference<>();
        serverBus.registerCodec(NodeAnnouncedEvent.class, new NodeAnnouncedEventCodec()); // Need simple codec
        serverBus.subscribe(NodeAnnouncedEvent.class, event -> {
            logger.info("Server received event: " + event.nodeId);
            if ("WorkerNode".equals(event.nodeId)) {
                serverReceivedEvent.set(event);
                serverReceivedLatch.countDown();
            }
        });

        // --- Worker Side ---
        SimulatedWebWorkerTransport workerTransport = new SimulatedWebWorkerTransport();
        AtomicReference<Throwable> workerError = new AtomicReference<>();
        CountDownLatch workerReceivedLatch = new CountDownLatch(1);
        AtomicReference<NodeAnnouncedEvent> workerReceivedEvent = new AtomicReference<>();

        new Thread(() -> {
            try {
                logger.info("[Worker] Starting EventBus...");
                EventBus workerBus = new EventBus("WorkerNode");
                workerBus.addTransport(workerTransport);
                workerBus.registerCodec(NodeAnnouncedEvent.class, new NodeAnnouncedEventCodec());

                // 1. Subscribe
                workerBus.subscribe(NodeAnnouncedEvent.class, event -> {
                    logger.info("[Worker] Received event: " + event.nodeId);
                    if ("ServerNode".equals(event.nodeId)) {
                        workerReceivedEvent.set(event);
                        workerReceivedLatch.countDown();
                    }
                });

                // 2. Publish (Announce Self)
                logger.info("[Worker] Publishing announcement...");
                workerBus.publish(new NodeAnnouncedEvent.Builder().nodeId("WorkerNode").build());

            } catch (Exception e) {
                e.printStackTrace();
                workerError.set(e);
            }
        }, "Worker-Event-Thread").start();

        // --- Bridge (Main Thread) ---
        // 1. Forward Worker -> Broker (Topic)
        // 2. Forward Broker (Topic) -> Worker

        // Forward Broker -> Worker
        broker.subscribe(EVENT_TOPIC, message -> {
            // Avoid loop? Broker sends back to sender?
            // MockBroker might reflect.
            // But we are in Main Thread.
            // Decode and send to Worker
            try {
                logger.info("[Bridge] Received from Topic, forwarding to Worker");
                byte[] decoded = java.util.Base64.getDecoder().decode(message.getBody());
                workerTransport.injectIncoming(decoded);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        // Loop to forward Worker -> Broker
        long start = System.currentTimeMillis();
        while (System.currentTimeMillis() - start < 5000) {
            byte[] msg = workerTransport.pollOutgoing(10, TimeUnit.MILLISECONDS);
            if (msg != null) {
                logger.info("[Bridge] Forwarding Worker -> Topic");
                String base64 = java.util.Base64.getEncoder().encodeToString(msg);
                broker.send(EVENT_TOPIC, base64);
            }

            // Check if Server received Worker's event
            if (serverReceivedLatch.getCount() == 0 && workerReceivedLatch.getCount() > 0) {
                // If Server received, let's make Server reply or just publish its own
                // We can trigger Server publish now
            }
            // Trigger server publish once
        }

        serverBus.publish(new NodeAnnouncedEvent.Builder().nodeId("ServerNode").build());

        // Wait a bit more for Worker to receive
        long replyStart = System.currentTimeMillis();
        while (System.currentTimeMillis() - replyStart < 2000) {
            byte[] msg = workerTransport.pollOutgoing(10, TimeUnit.MILLISECONDS);
            if (msg != null) {
                String base64 = java.util.Base64.getEncoder().encodeToString(msg);
                broker.send(EVENT_TOPIC, base64);
            }
            if (workerReceivedLatch.getCount() == 0)
                break;
        }

        if (workerError.get() != null)
            throw new RuntimeException(workerError.get());

        assertNotNull("Server should receive Worker Event", serverReceivedEvent.get());
        assertEquals("WorkerNode", serverReceivedEvent.get().nodeId);

        assertNotNull("Worker should receive Server Event", workerReceivedEvent.get());
        assertEquals("ServerNode", workerReceivedEvent.get().nodeId);
    }

    // --- Mock Broker (Copied/Shared) ---
    private static class MockStompClient implements StompClient {
        private final Map<String, List<StompSubscriptionCallback>> subscriptions = new HashMap<>();

        @Override
        public boolean isConnected() {
            return true;
        }

        @Override
        public void send(String destination, String body) {
            logger.info("[Network] BROADCAST dest={} bodyLen={}", destination, body.length());
            List<StompSubscriptionCallback> callbacks = subscriptions.get(destination);
            if (callbacks != null) {
                for (StompSubscriptionCallback cb : callbacks) {
                    cb.onMessage(new StompMessage() {
                        @Override
                        public String getBody() {
                            return body;
                        }

                        @Override
                        public Map<String, String> getHeaders() {
                            return new HashMap<>();
                        }
                    });
                }
            }
        }

        @Override
        public void subscribe(String destination, StompSubscriptionCallback callback) {
            logger.info("[Network] SUBSCRIBE dest={}", destination);
            subscriptions.computeIfAbsent(destination, k -> new ArrayList<>()).add(callback);
        }
    }

    // --- Minimal Codec for Test ---
    public static class NodeAnnouncedEventCodec
            implements uk.co.instanto.tearay.rpc.common.codec.Codec<NodeAnnouncedEvent, NodeAnnouncedEvent> {
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
    }
}
