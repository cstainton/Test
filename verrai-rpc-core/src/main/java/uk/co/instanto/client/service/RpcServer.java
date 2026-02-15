package uk.co.instanto.client.service;

import uk.co.instanto.client.service.proto.RpcPacket;
import uk.co.instanto.client.service.transport.ServiceDispatcher;
import dev.verrai.rpc.common.transport.Transport;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import okio.ByteString;

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
    private Authenticator authenticator;

    public RpcServer(Transport transport, UnitRegistry registry) {
        this.transport = transport;
        this.registry = registry;
        this.transport.addMessageHandler(this::handleIncomingBytes);
    }

    public void registerDispatcher(String serviceId, ServiceDispatcher dispatcher) {
        dispatchers.put(serviceId, dispatcher);
    }

    public void setAuthenticator(Authenticator authenticator) {
        this.authenticator = authenticator;
    }

    private void handleIncomingBytes(byte[] bytes) {
        RpcPacket packet = null;
        try {
            packet = RpcPacket.ADAPTER.decode(bytes);
        } catch (Exception e) {
            // Ignore if not an RpcPacket or other decoding error
            logger.debug("Failed to decode incoming packet", e);
            return;
        }

        if (packet.type == RpcPacket.Type.REQUEST) {
            try {
                if (authenticator != null && !authenticator.authenticate(packet)) {
                    logger.warn("Authentication failed for service: {}", packet.serviceId);
                    sendError(packet, "Authentication failed");
                    return;
                }

                Object impl = registry.getLocalServiceInstance(packet.serviceId);
                if (impl != null) {
                    ServiceDispatcher dispatcher = dispatchers.get(packet.serviceId);
                    if (dispatcher != null) {
                        dispatcher.dispatch(packet, impl, transport);
                    } else {
                        logger.warn("No dispatcher found for service: {}", packet.serviceId);
                        sendError(packet, "Service not found");
                    }
                } else {
                    logger.warn("Service implementation not found: {}", packet.serviceId);
                    sendError(packet, "Service implementation not found");
                }
            } catch (Exception e) {
                logger.error("Error handling request for service: {}", packet.serviceId, e);
                sendError(packet, "Internal Server Error");
            }
        }
    }

    private void sendError(RpcPacket request, String message) {
        if (request.requestId == null) return;
        // Best effort to reply. If transport is one-way, this might not work.
        try {
            RpcPacket.Builder builder = new RpcPacket.Builder()
                .type(RpcPacket.Type.ERROR)
                .requestId(request.requestId)
                .serviceId(request.serviceId)
                .methodName(request.methodName)
                .payload(okio.ByteString.encodeUtf8(message));

            if (request.replyTo != null) {
                builder.replyTo(request.replyTo);
            }

            RpcPacket response = builder.build();
            transport.send(RpcPacket.ADAPTER.encode(response));
        } catch (Exception e) {
            logger.error("Failed to send error response", e);
        }
    }
}
