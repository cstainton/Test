package uk.co.instanto.tearay.rpc.common.transport;

public interface MessageHandler {
    void onMessage(byte[] data);
}
