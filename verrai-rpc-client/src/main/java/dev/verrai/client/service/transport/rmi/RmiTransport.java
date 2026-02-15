package dev.verrai.client.service.transport.rmi;

import dev.verrai.rpc.common.transport.MessageHandler;
import dev.verrai.rpc.common.transport.Transport;
import java.io.Serializable;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.List;

public class RmiTransport implements Transport, RemoteTransport, Serializable {
    private static final long serialVersionUID = 1L;
    private RemoteTransport peer;
    private final transient List<MessageHandler> handlers = new ArrayList<>();

    public RmiTransport() {
    }

    @Override
    public void send(byte[] data) {
        if (peer == null) {
            throw new IllegalStateException("Peer not connected");
        }
        try {
            peer.receiveMessage(data);
        } catch (RemoteException e) {
            throw new RuntimeException("Failed to send message via RMI", e);
        }
    }

    @Override
    public void addMessageHandler(MessageHandler handler) {
        synchronized (handlers) {
            handlers.add(handler);
        }
    }

    @Override
    public void receiveMessage(byte[] data) throws RemoteException {
        List<MessageHandler> currentHandlers;
        synchronized (handlers) {
            currentHandlers = new ArrayList<>(handlers);
        }
        for (MessageHandler handler : currentHandlers) {
            try {
                handler.onMessage(data);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void establishConnection(RemoteTransport peer) throws RemoteException {
        this.peer = peer;
    }

    public void setPeer(RemoteTransport peer) {
        this.peer = peer;
    }
}
