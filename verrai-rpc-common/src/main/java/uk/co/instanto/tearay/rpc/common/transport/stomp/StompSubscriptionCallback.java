package uk.co.instanto.tearay.rpc.common.transport.stomp;

public interface StompSubscriptionCallback {
    void onMessage(StompMessage message);
}
