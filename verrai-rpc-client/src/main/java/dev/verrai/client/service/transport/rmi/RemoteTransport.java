package dev.verrai.client.service.transport.rmi;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface RemoteTransport extends Remote {
    void receiveMessage(byte[] data) throws RemoteException;
    void establishConnection(RemoteTransport peer) throws RemoteException;
}
