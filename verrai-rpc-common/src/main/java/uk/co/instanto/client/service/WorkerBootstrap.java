package uk.co.instanto.client.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.co.instanto.client.service.proto.RpcPacket;
import dev.verrai.rpc.common.transport.Transport;
import uk.co.instanto.client.service.transport.ServiceDispatcher;
import java.util.HashMap;
import java.util.Map;

public class WorkerBootstrap {

    private static final Logger logger = LoggerFactory.getLogger(WorkerBootstrap.class);

    private final Transport transport;
    private final Map<String, ServiceDispatcher> dispatchers = new HashMap<>();

    public WorkerBootstrap(Transport transport) {
        this.transport = transport;
        this.transport.addMessageHandler(this::handleMessage);
    }

    public void registerDispatcher(String serviceId, ServiceDispatcher dispatcher) {
        dispatchers.put(serviceId, dispatcher);
    }

    private void handleMessage(byte[] bytes) {
        try {
            RpcPacket packet = RpcPacket.ADAPTER.decode(bytes);
            logger.debug("Worker received RPC: {}.{}", packet.serviceId, packet.methodName);

            ServiceDispatcher dispatcher = dispatchers.get(packet.serviceId);
            if (dispatcher == null) {
                logger.warn("Dispatcher not found for service: {}", packet.serviceId);
                return;
            }

            Object service = UnitRegistry.getLocalService(packet.serviceId);
            if (service == null) {
                logger.warn("Service implementation not found: {}", packet.serviceId);
                return;
            }

            dispatcher.dispatch(packet, service, transport);
        } catch (Exception e) {
            logger.error("Error handling RPC message", e);
        }
    }
}
