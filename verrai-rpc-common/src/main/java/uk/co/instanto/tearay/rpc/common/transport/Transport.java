package uk.co.instanto.tearay.rpc.common.transport;

public interface Transport {
    void send(byte[] data);

    void addMessageHandler(MessageHandler handler);
}
