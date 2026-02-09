package uk.co.instanto.common.transport;

public interface Transport {
    void send(byte[] data);

    void addMessageHandler(MessageHandler handler);
}
