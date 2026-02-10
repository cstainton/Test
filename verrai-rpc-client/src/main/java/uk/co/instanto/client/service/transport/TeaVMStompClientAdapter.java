package uk.co.instanto.client.service.transport;

import uk.co.instanto.tearay.rpc.common.transport.stomp.StompClient;
import uk.co.instanto.tearay.rpc.common.transport.stomp.StompSubscriptionCallback;
import uk.co.instanto.tearay.rpc.common.transport.stomp.StompMessage;
import java.util.HashMap;
import java.util.Map;
import org.teavm.jso.JSObject;
import org.teavm.jso.core.JSString;
import org.teavm.jso.core.JSObjects;

public class TeaVMStompClientAdapter implements StompClient {

    private final uk.co.instanto.teavm.stomp.StompClient jsoClient;

    public TeaVMStompClientAdapter(uk.co.instanto.teavm.stomp.StompClient jsoClient) {
        this.jsoClient = jsoClient;
    }

    @Override
    public boolean isConnected() {
        return jsoClient.isConnected();
    }

    @Override
    public void send(String destination, String body) {
        jsoClient.send(destination, null, body);
    }

    @Override
    public void subscribe(String destination, StompSubscriptionCallback callback) {
        jsoClient.subscribe(destination, jsoMessage -> {
            callback.onMessage(new TeaVMStompMessageAdapter(jsoMessage));
        });
    }

    private static class TeaVMStompMessageAdapter implements StompMessage {
        private final uk.co.instanto.teavm.stomp.Message jsoMessage;

        public TeaVMStompMessageAdapter(uk.co.instanto.teavm.stomp.Message jsoMessage) {
            this.jsoMessage = jsoMessage;
        }

        @Override
        public String getBody() {
            return jsoMessage.getBody();
        }

        @Override
        public Map<String, String> getHeaders() {
            Map<String, String> headers = new HashMap<>();
            // TODO: Implement header iteration if needed
            return headers;
        }
    }
}
