package uk.co.instanto.tearay.rpc.common.transport.stomp;

public interface StompClient {
    boolean isConnected();

    void send(String destination, String body);

    void subscribe(String destination, StompSubscriptionCallback callback);
}
