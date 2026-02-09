package uk.co.instanto.client.service.transport;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.dom.events.MessageEvent;
import org.teavm.jso.typedarrays.Uint8Array;
import uk.co.instanto.tearay.rpc.common.transport.MessageHandler;
import uk.co.instanto.tearay.rpc.common.transport.Transport;
import java.util.ArrayList;
import java.util.List;

public class WebWorkerTransport implements Transport {

    private final JSObject worker;
    private final List<MessageHandler> handlers = new ArrayList<>();

    public WebWorkerTransport(JSObject worker) {
        this.worker = worker;
        listen(worker, this);
    }

    @Override
    public void send(byte[] data) {
        Uint8Array uint8Array = Uint8Array.create(data.length);
        for (int i = 0; i < data.length; i++) {
            uint8Array.set(i, (short) (data[i] & 0xFF));
        }
        postMessage(worker, uint8Array);
    }

    @Override
    public void addMessageHandler(MessageHandler handler) {
        synchronized (handlers) {
            handlers.add(handler);
        }
    }

    public void handleIncoming(MessageEvent event) {
        JSObject data = event.getData();
        if (isUint8Array(data)) {
            Uint8Array array = data.cast();
            byte[] bytes = new byte[array.getLength()];
            for (int i = 0; i < bytes.length; i++) {
                bytes[i] = (byte) array.get(i);
            }

            List<MessageHandler> currentHandlers;
            synchronized (handlers) {
                currentHandlers = new ArrayList<>(handlers);
            }
            for (MessageHandler handler : currentHandlers) {
                handler.onMessage(bytes);
            }
        }
    }

    @JSBody(params = { "target",
            "transport" }, script = "target.onmessage = function(e) { transport.@uk.co.instanto.client.service.transport.WebWorkerTransport::handleIncoming(*)(e); };")
    private static native void listen(JSObject target, WebWorkerTransport transport);

    @JSBody(params = { "worker", "message" }, script = "worker.postMessage(message);")
    private static native void postMessage(JSObject worker, JSObject message);

    @JSBody(params = "obj", script = "return obj instanceof Uint8Array;")
    private static native boolean isUint8Array(JSObject obj);
}
