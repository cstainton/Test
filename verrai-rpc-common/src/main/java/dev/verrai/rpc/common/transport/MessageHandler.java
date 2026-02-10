package dev.verrai.rpc.common.transport;

public interface MessageHandler {
    void onMessage(byte[] data);
}
