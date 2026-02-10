package uk.co.instanto.common.transport.stomp;

public interface StompSubscriptionCallback {
    void onMessage(StompMessage message);
}
