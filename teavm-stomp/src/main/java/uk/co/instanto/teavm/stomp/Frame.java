package uk.co.instanto.teavm.stomp;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.JSProperty;

public interface Frame extends JSObject {
    @JSProperty
    String getCommand();

    @JSProperty
    JSObject getHeaders();

    @JSProperty
    String getBody();
    
    @JSBody(script = "return this.toString();")
    String toString();
}
