package uk.co.instanto.teavm.stomp;

import org.teavm.jso.JSFunctor;

@JSFunctor
public interface ErrorCallback extends org.teavm.jso.JSObject {
    void onError(Frame error);
}
