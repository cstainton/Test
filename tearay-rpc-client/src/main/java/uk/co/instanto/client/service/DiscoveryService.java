package uk.co.instanto.client.service;

import uk.co.instanto.client.service.dto.proto.NodeAnnouncedEvent;
import uk.co.instanto.client.service.dto.proto.NodeHeartbeatEvent;
import uk.co.instanto.client.service.dto.proto.NodeDepartedEvent;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Handles service discovery and liveness tracking.
 * Can be added to any node (JVM, Browser, Worker).
 */
public class DiscoveryService {
    private static final Logger logger = LoggerFactory.getLogger(DiscoveryService.class);
    public final String nodeId;
    private final EventBus eventBus;
    private final UnitRegistry registry;

    public String getNodeId() {
        return nodeId;
    }

    public DiscoveryService(UnitRegistry registry, EventBus eventBus, String nodeId) {
        this.registry = registry;
        this.eventBus = eventBus;
        this.nodeId = nodeId;
        setup();
    }

    private void setup() {
        // Subscribe to events
        eventBus.subscribe(uk.co.instanto.client.service.dto.proto.NodeAnnouncedEvent.class, this::onNodeAnnounced);
        eventBus.subscribe(uk.co.instanto.client.service.dto.proto.NodeHeartbeatEvent.class, this::onHeartbeat);
        eventBus.subscribe(uk.co.instanto.client.service.dto.proto.NodeDepartedEvent.class, this::onNodeDeparted);
    }

    public void announce() {
        logger.info("Announcing node: " + nodeId);
        uk.co.instanto.client.service.dto.proto.NodeAnnouncedEvent event = new uk.co.instanto.client.service.dto.proto.NodeAnnouncedEvent.Builder()
                .nodeId(nodeId)
                .serviceIds(new ArrayList<>(registry.getDiscoverableServiceIdsInstance()))
                .timestamp(System.currentTimeMillis())
                .build();
        eventBus.publish(event);
    }

    public void heartbeat() {
        uk.co.instanto.client.service.dto.proto.NodeHeartbeatEvent event = new uk.co.instanto.client.service.dto.proto.NodeHeartbeatEvent.Builder()
                .nodeId(nodeId)
                .timestamp(System.currentTimeMillis())
                .build();
        eventBus.publish(event);
    }

    public void bye() {
        uk.co.instanto.client.service.dto.proto.NodeDepartedEvent event = new uk.co.instanto.client.service.dto.proto.NodeDepartedEvent.Builder()
                .nodeId(nodeId)
                .timestamp(System.currentTimeMillis())
                .build();
        eventBus.publish(event);
    }

    private void onNodeAnnounced(uk.co.instanto.client.service.dto.proto.NodeAnnouncedEvent event) {
        if (event.nodeId.equals(nodeId))
            return;
        logger.info("Node {} announced services: {}", event.nodeId, event.serviceIds);

        // We need a transport to reach this node.
        // With EventBus, we might not know the direct transport unless the event
        // metadata carries it?
        // OR, the EventBus IS the transport logic.
        // BUT UnitRegistry needs a Transport to create RpcClient.

        // Use the EventBus transport!
        // Wait, RpcClient needs a specific target. StompTransport(topic/target).
        // The event doesn't carry transport info (IP/Topic).
        // Convention: /topic/{nodeId}

        // We can use the existing TransportResolver in UnitRegistry if configured.
        // Currently UnitRegistry.registerRemote takes a Transport.

        // Ideally UnitRegistry should resolve the transport lazily based on NodeID.
        // For now, we can try to resolve it using the registry's resolver logic or
        // assume STOMP convention.

        // Let's rely on UnitRegistry's resolveTransport assumption or pass null and
        // let it resolve?
        // UnitRegistry.registerRemote(serviceId, nodeId, transport)

        // For now, we pass NULL transport and Update UnitRegistry to use its
        // resolver if null.

        for (String serviceId : event.serviceIds) {
            registry.registerRemote(serviceId, event.nodeId, null);
        }
    }

    private void onHeartbeat(uk.co.instanto.client.service.dto.proto.NodeHeartbeatEvent event) {
        if (event.nodeId.equals(nodeId))
            return;
        registry.registerRemote(null, event.nodeId, null); // Just update heartbeat
    }

    private void onNodeDeparted(uk.co.instanto.client.service.dto.proto.NodeDepartedEvent event) {
        if (event.nodeId.equals(nodeId))
            return;
        registry.removeNode(event.nodeId);
    }
}
