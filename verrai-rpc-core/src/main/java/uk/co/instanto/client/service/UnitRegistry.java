package uk.co.instanto.client.service;

import dev.verrai.rpc.common.transport.Transport;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;
import java.util.List;

public class UnitRegistry {
    private static final UnitRegistry INSTANCE = new UnitRegistry();

    private final Map<String, Object> localServices = new HashMap<>();

    // Remote service ID -> Node ID
    private final Map<String, String> serviceToNode = new HashMap<>();
    // Node ID -> Transport
    private final Map<String, Transport> nodeToTransport = new HashMap<>();
    // Node ID -> Last heartbeat timestamp
    private final Map<String, Long> lastHeartbeats = new HashMap<>();

    // Local Node ID (for Reply-To)
    private String localNodeId;

    // Transport Resolver (NodeID -> Transport)
    private java.util.function.Function<String, Transport> transportResolver;

    // Service Factory registry
    private final Map<Class<?>, ServiceFactory<?>> factories = new HashMap<>();

    // Cached service stubs
    private final Map<String, Object> serviceStubs = new HashMap<>();

    // Node ID -> RpcClient (shared)
    private final Map<String, RpcClient> nodeClients = new HashMap<>();

    // Pending callbacks for async service resolution
    private final Map<String, List<ServiceReadyCallback<?>>> pendingCallbacks = new HashMap<>();

    // Encapsulated Discovery Service
    private DiscoveryService discoveryService;

    // Event Bus
    private EventBus eventBus;

    // Serializer
    private dev.verrai.rpc.common.serialization.Serializer serializer;

    private final Map<String, String> defaultHeaders = new HashMap<>();

    public UnitRegistry() {
    }

    /**
     * Auto-configures the registry for STOMP-based RPC.
     * Sets up the local node ID, transport resolver, and starts discovery.
     */
    public void configureStomp(String localNodeId,
            dev.verrai.rpc.common.transport.stomp.StompClient client) {
        setLocalNodeId(localNodeId);

        // Resolver: /topic/{targetNodeId}
        setTransportResolver(targetNodeId -> new uk.co.instanto.client.service.transport.StompTransport(client,
                "/topic/" + targetNodeId, "/topic/" + localNodeId));

        // Setup EventBus
        this.eventBus = new EventBus(localNodeId);
        // Use a dedicated topic for cross-node events, e.g., /topic/events
        // NOTE: Ideally all nodes subscribe to a common topic for announcements.
        // Or we broadcast to a well-known topic.
        uk.co.instanto.client.service.transport.StompTransport eventTransport = new uk.co.instanto.client.service.transport.StompTransport(
                client, "/topic/discovery", "/topic/discovery");
        this.eventBus.addTransport(eventTransport);

        // Register Codecs (Identity Codecs for Protos)
        registerIdentityCodec(uk.co.instanto.client.service.dto.proto.NodeAnnouncedEvent.class,
                uk.co.instanto.client.service.dto.proto.NodeAnnouncedEvent.ADAPTER);
        registerIdentityCodec(uk.co.instanto.client.service.dto.proto.NodeHeartbeatEvent.class,
                uk.co.instanto.client.service.dto.proto.NodeHeartbeatEvent.ADAPTER);
        registerIdentityCodec(uk.co.instanto.client.service.dto.proto.NodeDepartedEvent.class,
                uk.co.instanto.client.service.dto.proto.NodeDepartedEvent.ADAPTER);

        startDiscovery(localNodeId);

        loadGeneratedCodecs();

        // Init RpcServer for inbound requests (listening on /topic/localNodeId)
        uk.co.instanto.client.service.transport.StompTransport serverTransport = new uk.co.instanto.client.service.transport.StompTransport(
                client, null, "/topic/" + localNodeId);

        initRpcServer(serverTransport);
    }

    private <T extends com.squareup.wire.Message<T, ?>> void registerIdentityCodec(Class<T> cls,
            com.squareup.wire.ProtoAdapter<T> adapter) {
        this.eventBus.registerCodec(cls, new dev.verrai.rpc.common.codec.Codec<T, T>() {
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

    private void loadGeneratedCodecs() {
        // In a real reflection-free environment, we might need a generated Registry
        // class
        // that calls this. For now, we'll try to load known DTOs or scan if possible?
        // Actually, without reflection, we need the Annotation Processor to generate a
        // loader.
        // BUT, for this MVP, let's just manually register the ones we know about in
        // configureStomp,
        // or try to load them by name if we know the package.

        // Better: The Annotation Processor should generate a "CodecRegistryLoader"
        // service.
        // For now, let's just catch exceptions and try to load.
        String[] dtos = {
                "uk.co.instanto.client.service.dto.proto.NodeAnnouncedEvent",
                "uk.co.instanto.client.service.dto.proto.NodeHeartbeatEvent",
                "uk.co.instanto.client.service.dto.proto.NodeDepartedEvent",
                "uk.co.instanto.demo.service.dto.Greeting",
                "uk.co.instanto.demo.service.dto.Country",
                "uk.co.instanto.demo.service.dto.MyData"
        };

        for (String dto : dtos) {
            try {
                Class<?> dtoClass = Class.forName(dto);
                Class<?> codecClass = Class.forName(dto + "JsonCodec");
                Object codec = codecClass.getDeclaredConstructor().newInstance();
                dev.verrai.rpc.common.serialization.JsonCodecRegistry.register(
                        (Class) dtoClass, (dev.verrai.rpc.common.serialization.JsonCodec) codec);
            } catch (Throwable e) {
                // Ignore if not found
                // System.out.println("Could not load JsonCodec for: " + dto);
            }
        }
    }

    /**
     * Starts the discovery service for this registry.
     */
    public void startDiscovery(String localNodeId) {
        if (this.eventBus == null) {
            throw new IllegalStateException("EventBus must be configured before starting discovery.");
        }
        this.setLocalNodeId(localNodeId);
        if (this.discoveryService == null) {
            this.discoveryService = new DiscoveryService(this, this.eventBus, localNodeId);
        }
        this.discoveryService.announce();
    }

    public void announce() {
        if (this.discoveryService != null) {
            this.discoveryService.announce();
        }
    }

    public EventBus getEventBus() {
        return eventBus;
    }

    public void setEventBus(EventBus eventBus) {
        this.eventBus = eventBus;
    }

    /**
     * Asynchronously waits for a service to become available.
     * If already available, callback is invoked immediately.
     */
    public <T> void awaitService(Class<T> serviceClass, ServiceReadyCallback<T> callback) {
        T existing = getService(serviceClass);
        if (existing != null) {
            callback.onServiceReady(existing);
            return;
        }

        synchronized (pendingCallbacks) {
            pendingCallbacks.computeIfAbsent(serviceClass.getName(), k -> new ArrayList<>())
                    .add(callback);
        }
    }

    public void setLocalNodeId(String localNodeId) {
        this.localNodeId = localNodeId;
    }

    public void setTransportResolver(java.util.function.Function<String, Transport> transportResolver) {
        this.transportResolver = transportResolver;
    }

    public void setSerializer(dev.verrai.rpc.common.serialization.Serializer serializer) {
        this.serializer = serializer;
        // Update existing clients?
        for (RpcClient client : nodeClients.values()) {
            client.setSerializer(serializer);
        }
    }

    public void setDefaultHeader(String key, String value) {
        this.defaultHeaders.put(key, value);
        for (RpcClient client : nodeClients.values()) {
            client.setDefaultHeader(key, value);
        }
    }

    public static UnitRegistry getInstance() {
        return INSTANCE;
    }

    public static void register(Class<?> serviceClass, Object serviceInstance) {
        INSTANCE.registerLocal(serviceClass.getName(), serviceInstance);
    }

    public static void register(String name, Object serviceInstance) {
        INSTANCE.registerLocal(name, serviceInstance);
    }

    public <T> void registerFactory(Class<T> serviceClass, ServiceFactory<T> factory) {
        factories.put(serviceClass, factory);
    }

    public void registerLocal(String name, Object serviceInstance) {
        localServices.put(name, serviceInstance);
    }

    public void registerRemote(String serviceId, String nodeId, Transport transport) {
        serviceToNode.put(serviceId, nodeId);
        nodeToTransport.put(nodeId, transport);
        updateHeartbeat(nodeId);

        // Check pending callbacks
        List<ServiceReadyCallback<?>> callbacks;
        synchronized (pendingCallbacks) {
            callbacks = pendingCallbacks.remove(serviceId);
        }

        if (callbacks != null) {
            try {
                // We need the Class object to call getService properly.
                // Try to load it by name or find in factories.
                Class<?> serviceClass = null;
                for (Class<?> cls : factories.keySet()) {
                    if (cls.getName().equals(serviceId)) {
                        serviceClass = cls;
                        break;
                    }
                }

                if (serviceClass == null) {
                    // Try reflection
                    try {
                        serviceClass = Class.forName(serviceId);
                    } catch (ClassNotFoundException e) {
                        // ignore
                    }
                }

                if (serviceClass != null) {
                    Object serviceStub = getServiceInternal(serviceClass);
                    for (ServiceReadyCallback<?> cb : callbacks) {
                        ((ServiceReadyCallback<Object>) cb).onServiceReady(serviceStub);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void updateHeartbeat(String nodeId) {
        lastHeartbeats.put(nodeId, System.currentTimeMillis());
    }

    public static Object getLocalService(String name) {
        return INSTANCE.getLocalServiceInstance(name);
    }

    public Object getLocalServiceInstance(String name) {
        return localServices.get(name);
    }

    public <T> T getService(Class<T> serviceClass) {
        return getServiceInternal(serviceClass);
    }

    public RpcClient getClientForService(String serviceId) {
        String nodeId = serviceToNode.get(serviceId);
        if (nodeId == null) {
            return null; // Not found yet
        }

        return nodeClients.computeIfAbsent(nodeId, nid -> {
            Transport transport = null;
            if (transportResolver != null) {
                transport = transportResolver.apply(nid);
            }
            if (transport == null) {
                transport = nodeToTransport.get(nid);
            }
            if (transport == null) {
                throw new RuntimeException("No transport available for node: " + nid);
            }

            String replyTo = (localNodeId != null) ? "/topic/" + localNodeId : null;
            RpcClient rpcClient = new RpcClient(transport, replyTo);
            if (serializer != null) {
                rpcClient.setSerializer(serializer);
            }
            for (Map.Entry<String, String> entry : defaultHeaders.entrySet()) {
                rpcClient.setDefaultHeader(entry.getKey(), entry.getValue());
            }
            return rpcClient;
        });
    }

    private <T> T getServiceInternal(Class<T> serviceClass) {
        String serviceId = serviceClass.getName();

        // 1. Check local
        if (localServices.containsKey(serviceId)) {
            return serviceClass.cast(localServices.get(serviceId));
        }

        // 2. Check cached stubs
        if (serviceStubs.containsKey(serviceId)) {
            return serviceClass.cast(serviceStubs.get(serviceId));
        }

        // 3. Create remote stub
        RpcClient client = getClientForService(serviceId);
        if (client == null) {
            return null;
        }

        ServiceFactory<T> factory = (ServiceFactory<T>) factories.get(serviceClass);
        if (factory == null) {
            throw new RuntimeException(
                    "No factory registered for " + serviceId + ". Ensure you called registerFactory().");
        }

        T stub = factory.create(client);
        serviceStubs.put(serviceId, stub);
        return stub;
    }

    public static Transport getTransportForService(String serviceId) {
        return INSTANCE.getTransportForServiceInstance(serviceId);
    }

    public Transport getTransportForServiceInstance(String serviceId) {
        String nodeId = serviceToNode.get(serviceId);
        if (nodeId != null) {
            return nodeToTransport.get(nodeId);
        }
        return null;
    }

    public static Set<String> getLocalServiceIds() {
        return INSTANCE.getLocalServiceIdsInstance();
    }

    public Set<String> getLocalServiceIdsInstance() {
        return new HashSet<>(localServices.keySet());
    }

    public static Set<String> getDiscoverableServiceIds() {
        return INSTANCE.getDiscoverableServiceIdsInstance();
    }

    public Set<String> getDiscoverableServiceIdsInstance() {
        Set<String> all = new HashSet<>(localServices.keySet());
        all.addAll(serviceToNode.keySet());
        return all;
    }

    // Optional RpcServer for handling inbound requests
    private RpcServer rpcServer;

    public void initRpcServer(Transport transport) {
        if (this.rpcServer == null) {
            this.rpcServer = new RpcServer(transport, this);
        }
    }

    public void registerDispatcher(String serviceId,
            uk.co.instanto.client.service.transport.ServiceDispatcher dispatcher) {
        if (rpcServer != null) {
            rpcServer.registerDispatcher(serviceId, dispatcher);
        } else {
            // Store temporarily or warn? For now assume initRpcServer called first.
            // Or lazily init if we had transport? But we don't store "server transport".
            throw new IllegalStateException(
                    "RpcServer not initialized. Call configureStomp() or initRpcServer() first.");
        }
    }

    public void cleanupStaleServices(long timeoutMs) {
        long now = System.currentTimeMillis();
        List<String> staleNodes = new ArrayList<>();
        for (Map.Entry<String, Long> entry : lastHeartbeats.entrySet()) {
            if (now - entry.getValue() > timeoutMs) {
                staleNodes.add(entry.getKey());
            }
        }

        for (String nodeId : staleNodes) {
            System.out.println("Cleaning up stale node: " + nodeId);
            removeNode(nodeId);
        }
    }

    public void removeNode(String nodeId) {
        lastHeartbeats.remove(nodeId);
        nodeToTransport.remove(nodeId);
        nodeClients.remove(nodeId);
        serviceToNode.entrySet().removeIf(entry -> entry.getValue().equals(nodeId));
        // We should also invalidate stubs if needed, but for now simple removal
        // suffices
    }
}
