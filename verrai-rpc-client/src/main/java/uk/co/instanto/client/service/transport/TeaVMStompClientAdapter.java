package uk.co.instanto.client.service.transport;

import dev.verrai.rpc.common.transport.stomp.StompClient;
import dev.verrai.rpc.common.transport.stomp.StompSubscriptionCallback;
import dev.verrai.rpc.common.transport.stomp.StompMessage;
import java.util.HashMap;
import java.util.Map;
import org.teavm.jso.JSBody;
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
            JSObject jsoHeaders = jsoMessage.getHeaders();
            if (!JSObjects.isUndefined(jsoHeaders) && jsoHeaders != null) {
                String[] keys = getKeys(jsoHeaders);
                for (String key : keys) {
                    String value = getValue(jsoHeaders, key);
                    headers.put(key, value);
                }
            }
            return headers;
        }

        @JSBody(params = "obj", script = "return Object.keys(obj);")
        private static native String[] getKeys(JSObject obj);

        @JSBody(params = { "obj", "key" }, script = "return obj[key];")
        private static native String getValue(JSObject obj, String key);
    }
}
