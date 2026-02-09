package uk.co.instanto.teavm.stomp;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;

public abstract class StompClient implements JSObject {

        @JSBody(params = { "url" }, script = "return Stomp.client(url);")
        public static native StompClient client(String url);

        @JSBody(params = { "ws" }, script = "return Stomp.over(ws);")
        public static native StompClient over(JSObject ws);

        public native void connect(JSObject headers, ConnectCallback connectCallback, ErrorCallback errorCallback);

        public native void connect(JSObject headers, ConnectCallback connectCallback, ErrorCallback errorCallback,
                        CloseCallback closeCallback);

        public native void connect(String login, String passcode, ConnectCallback connectCallback,
                        ErrorCallback errorCallback, CloseCallback closeCallback);

        public native void connect(String login, String passcode, ConnectCallback connectCallback,
                        ErrorCallback errorCallback);

        public native void disconnect(DisconnectCallback callback, JSObject headers);

        public native void send(String destination, JSObject headers, String body);

        public native JSObject subscribe(String destination, MessageCallback callback, JSObject headers);

        public native JSObject subscribe(String destination, MessageCallback callback);

        public native void unsubscribe(String id);

        public native void begin(String transaction);

        public native void commit(String transaction);

        public native void abort(String transaction);

        @JSBody(script = "return this.connected;")
        public native boolean isConnected();

        @JSBody(params = "connected", script = "this.connected = connected;")
        public native void setConnected(boolean connected);

        @JSBody(script = "return this.heartbeat;")
        public native JSObject getHeartbeat();

        @JSBody(params = "heartbeat", script = "this.heartbeat = heartbeat;")
        public native void setHeartbeat(JSObject heartbeat);

        public native void debug(String message);
}
