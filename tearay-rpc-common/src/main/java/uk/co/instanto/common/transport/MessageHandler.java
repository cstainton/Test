package uk.co.instanto.common.transport;

public interface MessageHandler {
    void onMessage(byte[] data);
}
