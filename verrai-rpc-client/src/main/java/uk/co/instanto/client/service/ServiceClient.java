package uk.co.instanto.client.service;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.dom.events.MessageEvent;
import org.teavm.jso.typedarrays.Uint8Array;

import com.squareup.wire.Message;

import okio.ByteString;
import uk.co.instanto.client.service.proto.RpcPacket;
import uk.co.instanto.tearay.rpc.common.codec.Codec;

public class ServiceClient {

    private final JSObject worker;
    private final Map<Class<?>, Codec<?, ?>> codecRegistry = new HashMap<>();

    public ServiceClient(JSObject worker) {
        this.worker = worker;
        listenToWorker(worker);
    }

    public <P, W extends Message<W, ?>> void registerCodec(Class<P> pojoClass, Codec<P, W> codec) {
        codecRegistry.put(pojoClass, codec);
    }

    @JSBody(params = { "target",
            "client" }, script = "target.onmessage = function(e) { client.@uk.co.instanto.client.service.ServiceClient::handleMessage(*)(e); };")
    private static native void listenToWorker(JSObject target, ServiceClient client);

    private void listenToWorker(JSObject worker) {
        listenToWorker(worker, this);
    }

    public void handleMessage(MessageEvent event) {
        // Assume data is Uint8Array
        JSObject data = event.getData();
        if (isUint8Array(data)) {
            Uint8Array array = data.cast();
            byte[] bytes = new byte[array.getLength()];
            for (int i = 0; i < bytes.length; i++) {
                bytes[i] = (byte) array.get(i);
            }

            try {
                RpcPacket packet = RpcPacket.ADAPTER.decode(bytes);
                // Handle response...
                System.out.println("Received RPC response for: " + packet.requestId);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @JSBody(params = "obj", script = "return obj instanceof Uint8Array;")
    private static native boolean isUint8Array(JSObject obj);

    public <T> T create(Class<T> serviceInterface) {
        return (T) Proxy.newProxyInstance(
                serviceInterface.getClassLoader(),
                new Class<?>[] { serviceInterface },
                new ServiceInvocationHandler(serviceInterface));
    }

    private class ServiceInvocationHandler implements InvocationHandler {
        private final String serviceId;

        public ServiceInvocationHandler(Class<?> serviceInterface) {
            this.serviceId = serviceInterface.getName();
        }

        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            ByteString payload = ByteString.EMPTY;
            if (args != null && args.length > 0) {
                Object arg = args[0];
                if (arg instanceof Message) {
                    payload = ByteString.of(((Message<?, ?>) arg).encode());
                } else if (arg instanceof byte[]) {
                    payload = ByteString.of((byte[]) arg);
                } else if (codecRegistry.containsKey(arg.getClass())) {
                    Codec codec = codecRegistry.get(arg.getClass());
                    Message wireMsg = (Message) codec.toWire(arg);
                    // Use the codec's adapter to encode the wire message
                    // Note: codec.getWireAdapter() returns ProtoAdapter<WIRE>
                    // Encode returns byte[]
                    payload = ByteString.of(codec.getWireAdapter().encode(wireMsg));
                } else {
                    // For now, support only Wire Messages or raw bytes or registered POJOs
                    System.err.println("Unsupported argument type: " + arg.getClass());
                }
            }

            RpcPacket packet = new RpcPacket.Builder()
                    .serviceId(serviceId)
                    .methodName(method.getName())
                    .requestId(UUID.randomUUID().toString())
                    .payload(payload)
                    .build();

            byte[] bytes = RpcPacket.ADAPTER.encode(packet);

            Uint8Array uint8Array = Uint8Array.create(bytes.length);
            for (int i = 0; i < bytes.length; i++) {
                uint8Array.set(i, (short) (bytes[i] & 0xFF));
            }

            postMessage(worker, uint8Array);

            return null;
        }
    }

    @JSBody(params = { "worker", "message" }, script = "worker.postMessage(message);")
    private static native void postMessage(JSObject worker, JSObject message);
}
