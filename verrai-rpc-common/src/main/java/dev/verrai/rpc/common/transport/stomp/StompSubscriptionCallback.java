package dev.verrai.rpc.common.transport.stomp;

public interface StompSubscriptionCallback {
    void onMessage(StompMessage message);
}
