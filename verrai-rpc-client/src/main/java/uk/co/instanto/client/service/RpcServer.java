package uk.co.instanto.client.service;

import uk.co.instanto.client.service.proto.RpcPacket;
import uk.co.instanto.tearay.rpc.common.transport.ServiceDispatcher;
import uk.co.instanto.tearay.rpc.common.transport.Transport;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * RpcServer listens for incoming RPC requests on a transport and dispatches
 * them
 * to the appropriate service implementation using generated dispatchers.
 */
public class RpcServer {
    private static final Logger logger = LoggerFactory.getLogger(RpcServer.class);
    private final Transport transport;
    private final UnitRegistry registry;
    private final Map<String, ServiceDispatcher> dispatchers = new HashMap<>();

    public RpcServer(Transport transport, UnitRegistry registry) {
        this.transport = transport;
        this.registry = registry;
        this.transport.addMessageHandler(this::handleIncomingBytes);
    }

    public void registerDispatcher(String serviceId, ServiceDispatcher dispatcher) {
        dispatchers.put(serviceId, dispatcher);
    }

    private void handleIncomingBytes(byte[] bytes) {
        try {
            RpcPacket packet = RpcPacket.ADAPTER.decode(bytes);
            if (packet.type == RpcPacket.Type.REQUEST) {
                Object impl = registry.getLocalServiceInstance(packet.serviceId);
                if (impl != null) {
                    ServiceDispatcher dispatcher = dispatchers.get(packet.serviceId);
                    if (dispatcher != null) {
                        dispatcher.dispatch(packet, impl, transport);
                    } else {
                        logger.warn("No dispatcher found for service: {}", packet.serviceId);
                    }
                }
            }
        } catch (Exception e) {
            // Ignore if not an RpcPacket or other decoding error
        }
    }
}
