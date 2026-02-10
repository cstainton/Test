package uk.co.instanto.integration;

import uk.co.instanto.tearay.rpc.common.transport.stomp.StompClient;
import uk.co.instanto.tearay.rpc.common.transport.stomp.StompMessage;
import uk.co.instanto.tearay.rpc.common.transport.stomp.StompSubscriptionCallback;
import java.util.HashMap;
import java.util.Map;

/**
 * A mock implementation of StompClient for JVM verification.
 * In a real application, this would wrap a library like Spring StompClient or
 * similar.
 */
public class JvmStompClientAdapter implements StompClient {

    private final Map<String, StompSubscriptionCallback> subscriptions = new HashMap<>();

    @Override
    public boolean isConnected() {
        return true;
    }

    @Override
    public void send(String destination, String body) {
        // Mock loopback: if something is subscribed to this destination, deliver it
        StompSubscriptionCallback callback = subscriptions.get(destination);
        if (callback != null) {
            callback.onMessage(new StompMessage() {
                @Override
                public String getBody() {
                    return body;
                }

                @Override
                public Map<String, String> getHeaders() {
                    return new HashMap<>();
                }
            });
        }
    }

    @Override
    public void subscribe(String destination, StompSubscriptionCallback callback) {
        subscriptions.put(destination, callback);
    }
}
