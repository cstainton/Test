package uk.co.instanto.client.service.transport;

import uk.co.instanto.tearay.rpc.common.transport.MessageHandler;
import uk.co.instanto.tearay.rpc.common.transport.Transport;
import uk.co.instanto.tearay.rpc.common.transport.stomp.StompClient;
import uk.co.instanto.tearay.rpc.common.transport.stomp.StompMessage;
import java.util.Base64;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * A transport that sends and receives RPC packets via STOMP.
 * Platform-agnostic: relies on the StompClient interface.
 */
public class StompTransport implements Transport {
    private static final Logger logger = LoggerFactory.getLogger(StompTransport.class);

    private final StompClient stompClient;
    private final String sendDestination;
    private final String subscribeDestination;
    private final List<MessageHandler> handlers = new ArrayList<>();

    public StompTransport(StompClient stompClient, String sendDestination, String subscribeDestination) {
        this.stompClient = stompClient;
        this.sendDestination = sendDestination;
        this.subscribeDestination = subscribeDestination;

        // Subscribe to responses
        this.stompClient.subscribe(subscribeDestination, this::onStompMessage);
    }

    private void onStompMessage(StompMessage message) {
        logger.info("Received STOMP message on destination: {}", message.getHeaders().get("destination"));
        if (message.getBody() != null) {
            try {
                byte[] data = Base64.getDecoder().decode(message.getBody());
                List<MessageHandler> currentHandlers;
                synchronized (handlers) {
                    currentHandlers = new ArrayList<>(handlers);
                }
                for (MessageHandler handler : currentHandlers) {
                    try {
                        handler.onMessage(data);
                    } catch (Exception e) {
                        // Ignore handler errors to not break other handlers
                    }
                }
            } catch (IllegalArgumentException e) {
                // Not a base64 message or other decoding issue, ignore
            } catch (Exception e) {
                logger.error("Error decoding STOMP message", e);
            }
        }
    }

    @Override
    public void send(byte[] data) {
        if (stompClient.isConnected()) {
            String base64 = Base64.getEncoder().encodeToString(data);
            stompClient.send(sendDestination, base64);
        } else {
            logger.warn("StompTransport: Cannot send, client is not connected.");
        }
    }

    @Override
    public void addMessageHandler(MessageHandler handler) {
        synchronized (handlers) {
            handlers.add(handler);
        }
    }
}
