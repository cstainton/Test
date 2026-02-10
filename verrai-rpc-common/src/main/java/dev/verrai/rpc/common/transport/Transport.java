package dev.verrai.rpc.common.transport;

public interface Transport {
    void send(byte[] data);

    void addMessageHandler(MessageHandler handler);
}
