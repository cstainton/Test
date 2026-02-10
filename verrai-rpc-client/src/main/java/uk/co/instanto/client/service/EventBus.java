package uk.co.instanto.client.service;

import com.squareup.wire.Message;
import com.squareup.wire.ProtoAdapter;
import okio.ByteString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.co.instanto.client.service.proto.EventPacket;
import uk.co.instanto.client.service.proto.RpcPacket;
import uk.co.instanto.tearay.rpc.common.codec.Codec;
import uk.co.instanto.tearay.rpc.common.transport.Transport;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Central hub for publishing and subscribing to events across service
 * boundaries.
 * Events are serialized using Protobuf and transmitted via the Transport
 * abstraction.
 */
public class EventBus {
    private static final Logger logger = LoggerFactory.getLogger(EventBus.class);

    private final String publisherId;
    private final Map<Class<?>, Codec<?, ?>> codecRegistry = new ConcurrentHashMap<>();
    private final Map<String, List<EventHandler<?>>> handlers = new ConcurrentHashMap<>();
    private final List<Transport> transports = new ArrayList<>();

    public EventBus(String publisherId) {
        this.publisherId = publisherId;
    }

    /**
     * Add a transport for sending and receiving events.
     */
    public void addTransport(Transport transport) {
        transports.add(transport);
        transport.addMessageHandler(this::handleIncomingBytes);
    }

    /**
     * Register a codec for an event type.
     */
    public <P, W extends Message<W, ?>> void registerCodec(Class<P> eventClass, Codec<P, W> codec) {
        codecRegistry.put(eventClass, codec);
        logger.debug("Registered codec for event type: {}", eventClass.getName());
    }

    /**
     * Publish an event to all subscribers.
     */
    @SuppressWarnings("unchecked")
    public <T> void publish(T event) {
        if (event == null) {
            throw new IllegalArgumentException("Event cannot be null");
        }

        Class<?> eventClass = event.getClass();
        Codec<T, ?> codec = (Codec<T, ?>) codecRegistry.get(eventClass);

        if (codec == null) {
            throw new IllegalStateException("No codec registered for event type: " + eventClass.getName());
        }

        try {
            // Serialize the event
            Object wireEvent = codec.toWire(event);
            @SuppressWarnings("rawtypes")
            ProtoAdapter adapter = codec.getWireAdapter();
            @SuppressWarnings("unchecked")
            byte[] payload = adapter.encode(wireEvent);

            // Create EventPacket
            EventPacket packet = new EventPacket.Builder()
                    .eventType(eventClass.getName())
                    .payload(ByteString.of(payload))
                    .publisherId(publisherId)
                    .timestamp(System.currentTimeMillis())
                    .build();

            byte[] eventPacketBytes = EventPacket.ADAPTER.encode(packet);

            // Wrap in RpcPacket
            RpcPacket rpcPacket = new RpcPacket.Builder()
                    .type(RpcPacket.Type.EVENT)
                    .requestId(UUID.randomUUID().toString())
                    .payload(ByteString.of(eventPacketBytes))
                    .build();

            byte[] finalBytes = RpcPacket.ADAPTER.encode(rpcPacket);

            // Send via all transports
            for (Transport transport : transports) {
                transport.send(finalBytes);
            }

            logger.debug("Published event: {} from {}", eventClass.getSimpleName(), publisherId);
        } catch (Exception e) {
            logger.error("Failed to publish event: {}", eventClass.getName(), e);
            throw new RuntimeException("Failed to publish event", e);
        }
    }

    /**
     * Subscribe to events of a specific type.
     */
    public <T> void subscribe(Class<T> eventClass, EventHandler<T> handler) {
        String eventType = eventClass.getName();
        handlers.computeIfAbsent(eventType, k -> new ArrayList<>()).add(handler);
        logger.debug("Subscribed to event type: {}", eventType);
    }

    /**
     * Handle incoming event packets from transports.
     */
    @SuppressWarnings("unchecked")
    private void handleIncomingBytes(byte[] bytes) {
        try {
            // Decode as RpcPacket first
            RpcPacket rpcPacket = RpcPacket.ADAPTER.decode(bytes);

            // Only process EVENT packets
            if (rpcPacket.type != RpcPacket.Type.EVENT) {
                return;
            }

            EventPacket packet = EventPacket.ADAPTER.decode(rpcPacket.payload);

            // Don't process our own events (optional - could be configurable)
            if (publisherId.equals(packet.publisherId)) {
                return;
            }

            String eventType = packet.eventType;
            List<EventHandler<?>> eventHandlers = handlers.get(eventType);

            if (eventHandlers == null || eventHandlers.isEmpty()) {
                logger.trace("No handlers for event type: {}", eventType);
                return;
            }

            // Find codec for this event type
            Class<?> eventClass = Class.forName(eventType);
            Codec<?, ?> codec = codecRegistry.get(eventClass);

            if (codec == null) {
                logger.warn("No codec registered for event type: {}", eventType);
                return;
            }

            // Deserialize the event
            byte[] payloadBytes = packet.payload.toByteArray();
            ProtoAdapter<?> adapter = codec.getWireAdapter();
            Message<?, ?> wireEvent = (Message<?, ?>) adapter.decode(payloadBytes);

            // Cast codec to work with Message types
            @SuppressWarnings("rawtypes")
            Codec rawCodec = codec;
            @SuppressWarnings("unchecked")
            Object event = rawCodec.fromWire(wireEvent);

            // Invoke all handlers
            for (EventHandler<?> handler : eventHandlers) {
                try {
                    ((EventHandler<Object>) handler).onEvent(event);
                } catch (Exception e) {
                    logger.error("Error in event handler for type: {}", eventType, e);
                }
            }

            logger.debug("Processed event: {} from {}", eventType, packet.publisherId);
        } catch (ClassNotFoundException e) {
            logger.warn("Unknown event type: {}", e.getMessage());
        } catch (Exception e) {
            // Not an EventPacket or other error - ignore
            logger.trace("Failed to decode as EventPacket", e);
        }
    }
}
