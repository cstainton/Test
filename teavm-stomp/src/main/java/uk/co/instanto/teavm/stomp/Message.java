package uk.co.instanto.teavm.stomp;

import org.teavm.jso.JSObject;
import org.teavm.jso.JSProperty;

public interface Message extends JSObject {
    @JSProperty
    String getCommand();

    @JSProperty
    JSObject getHeaders();

    @JSProperty
    String getBody();

    void ack(JSObject headers);

    void nack(JSObject headers);
}
