package uk.co.instanto.client.service.transport;

import uk.co.instanto.tearay.rpc.common.transport.MessageHandler;
import uk.co.instanto.tearay.rpc.common.transport.Transport;
import java.util.ArrayList;
import java.util.List;

/**
 * A transport that allows direct, in-process communication.
 * Useful for when the service is running in the same thread (e.g. main JS
 * thread).
 */
public class LocalTransport implements Transport {

    private final List<MessageHandler> handlers = new ArrayList<>();
    private LocalTransport peer;

    public LocalTransport() {
    }

    /**
     * Connects this transport to another LocalTransport instance.
     */
    public void connect(LocalTransport peer) {
        this.peer = peer;
    }

    @Override
    public void send(byte[] data) {
        if (peer != null) {
            peer.deliver(data);
        }
    }

    private void deliver(byte[] data) {
        // Safe copy to avoid ConcurrentModificationException if a handler adds/removes
        // another handler
        List<MessageHandler> currentHandlers;
        synchronized (handlers) {
            currentHandlers = new ArrayList<>(handlers);
        }
        for (MessageHandler handler : currentHandlers) {
            handler.onMessage(data);
        }
    }

    @Override
    public void addMessageHandler(MessageHandler handler) {
        synchronized (handlers) {
            handlers.add(handler);
        }
    }
}
