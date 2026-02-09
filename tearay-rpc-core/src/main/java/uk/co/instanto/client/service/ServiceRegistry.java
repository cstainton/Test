package uk.co.instanto.client.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.co.instanto.tearay.rpc.common.transport.Transport;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;
import java.util.List;

public class ServiceRegistry {
    private static final Logger logger = LoggerFactory.getLogger(ServiceRegistry.class);
    private static final ServiceRegistry INSTANCE = new ServiceRegistry();

    private final Map<String, Object> localServices = new HashMap<>();

    // Remote service ID -> Node ID
    private final Map<String, String> serviceToNode = new HashMap<>();
    // Node ID -> Transport
    private final Map<String, Transport> nodeToTransport = new HashMap<>();
    // Node ID -> Last heartbeat timestamp
    private final Map<String, Long> lastHeartbeats = new HashMap<>();

    public ServiceRegistry() {
    }

    public static ServiceRegistry getInstance() {
        return INSTANCE;
    }

    public static void register(Class<?> serviceClass, Object serviceInstance) {
        INSTANCE.registerLocal(serviceClass.getName(), serviceInstance);
    }

    public static void register(String name, Object serviceInstance) {
        INSTANCE.registerLocal(name, serviceInstance);
    }

    public void registerLocal(String name, Object serviceInstance) {
        localServices.put(name, serviceInstance);
    }

    public void registerRemote(String serviceId, String nodeId, Transport transport) {
        serviceToNode.put(serviceId, nodeId);
        nodeToTransport.put(nodeId, transport);
        updateHeartbeat(nodeId);
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

    public void cleanupStaleServices(long timeoutMs) {
        long now = System.currentTimeMillis();
        List<String> staleNodes = new ArrayList<>();
        for (Map.Entry<String, Long> entry : lastHeartbeats.entrySet()) {
            if (now - entry.getValue() > timeoutMs) {
                staleNodes.add(entry.getKey());
            }
        }

        for (String nodeId : staleNodes) {
            logger.info("Cleaning up stale node: {}", nodeId);
            removeNode(nodeId);
        }
    }

    public void removeNode(String nodeId) {
        lastHeartbeats.remove(nodeId);
        nodeToTransport.remove(nodeId);
        serviceToNode.entrySet().removeIf(entry -> entry.getValue().equals(nodeId));
    }
}
