package uk.co.instanto.client.service;

import uk.co.instanto.client.service.transport.LocalTransport;
import uk.co.instanto.client.service.dto.proto.NodeAnnouncedEvent;
import uk.co.instanto.client.service.dto.proto.NodeHeartbeatEvent;
import uk.co.instanto.client.service.dto.proto.NodeDepartedEvent;

public class GlobalUnitBootstrap {

    public static class SimulatedUnit {
        public final String nodeId;
        public final UnitRegistry registry;
        public final EventBus eventBus;
        public final LocalTransport localTransport;

        public SimulatedUnit(String nodeId, UnitRegistry registry, EventBus eventBus, LocalTransport localTransport) {
            this.nodeId = nodeId;
            this.registry = registry;
            this.eventBus = eventBus;
            this.localTransport = localTransport;
        }

        public void startDiscovery() {
            registry.startDiscovery(nodeId);
        }
    }

    public static SimulatedUnit createSimulatedUnit(String nodeId) {
        UnitRegistry registry = new UnitRegistry();
        EventBus bus = new EventBus(nodeId);

        registerIdentityCodec(bus, NodeAnnouncedEvent.class, NodeAnnouncedEvent.ADAPTER);
        registerIdentityCodec(bus, NodeHeartbeatEvent.class, NodeHeartbeatEvent.ADAPTER);
        registerIdentityCodec(bus, NodeDepartedEvent.class, NodeDepartedEvent.ADAPTER);

        registry.setEventBus(bus);

        LocalTransport transport = new LocalTransport();
        bus.addTransport(transport);

        // Ensure local node ID is set on registry (so getLocalService works with
        // reply-to?)
        registry.setLocalNodeId(nodeId);

        return new SimulatedUnit(nodeId, registry, bus, transport);
    }

    private static <T extends com.squareup.wire.Message<T, ?>> void registerIdentityCodec(EventBus bus, Class<T> cls,
            com.squareup.wire.ProtoAdapter<T> adapter) {
        bus.registerCodec(cls, new uk.co.instanto.tearay.rpc.common.codec.Codec<T, T>() {
            @Override
            public T toWire(T domain) {
                return domain;
            }

            @Override
            public T fromWire(T wire) {
                return wire;
            }

            @Override
            public com.squareup.wire.ProtoAdapter<T> getWireAdapter() {
                return adapter;
            }
        });
    }
}
