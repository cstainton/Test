package uk.co.instanto.client.service;

import uk.co.instanto.client.service.proto.DiscoveryPacket;
import uk.co.instanto.tearay.rpc.common.transport.Transport;
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
    public final String nodeId = UUID.randomUUID().toString();
    private final List<Transport> transports = new ArrayList<>();
    private final ServiceRegistry registry;

    public String getNodeId() {
        return nodeId;
    }

    public DiscoveryService() {
        this(ServiceRegistry.getInstance());
    }

    public DiscoveryService(ServiceRegistry registry) {
        this.registry = registry;
    }

    public void addTransport(Transport transport) {
        transports.add(transport);
        transport.addMessageHandler(bytes -> handleDiscovery(transport, bytes));
    }

    public void announce() {
        DiscoveryPacket packet = new DiscoveryPacket.Builder()
                .type(DiscoveryPacket.Type.ANNOUNCE)
                .nodeId(nodeId)
                .serviceIds(new ArrayList<>(registry.getDiscoverableServiceIdsInstance()))
                .build();
        byte[] bytes = DiscoveryPacket.ADAPTER.encode(packet);
        for (Transport t : transports) {
            t.send(bytes);
        }
    }

    public void heartbeat() {
        DiscoveryPacket packet = new DiscoveryPacket.Builder()
                .type(DiscoveryPacket.Type.HEARTBEAT)
                .nodeId(nodeId)
                .build();
        byte[] bytes = DiscoveryPacket.ADAPTER.encode(packet);
        for (Transport t : transports) {
            t.send(bytes);
        }
    }

    private void handleDiscovery(Transport transport, byte[] bytes) {
        try {
            DiscoveryPacket packet = DiscoveryPacket.ADAPTER.decode(bytes);
            if (packet.nodeId.equals(nodeId)) {
                return; // Ignore our own announcements
            }

            if (packet.type == DiscoveryPacket.Type.ANNOUNCE) {
                logger.info("Node {} announced services: {}", packet.nodeId, packet.serviceIds);
                for (String serviceId : packet.serviceIds) {
                    registry.registerRemote(serviceId, packet.nodeId, transport);
                }
            } else if (packet.type == DiscoveryPacket.Type.HEARTBEAT) {
                registry.updateHeartbeat(packet.nodeId);
            } else if (packet.type == DiscoveryPacket.Type.BYE) {
                registry.removeNode(packet.nodeId);
            }
        } catch (Exception e) {
            // Probably not a DiscoveryPacket, ignore
        }
    }
}
