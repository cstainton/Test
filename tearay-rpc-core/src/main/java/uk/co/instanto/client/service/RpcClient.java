package uk.co.instanto.client.service;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.squareup.wire.Message;

import okio.ByteString;
import uk.co.instanto.client.service.proto.RpcPacket;
import uk.co.instanto.tearay.rpc.common.codec.Codec;
import uk.co.instanto.tearay.rpc.common.transport.Transport;

public class RpcClient {
    private static final Logger logger = LoggerFactory.getLogger(RpcClient.class);

    private final Transport transport;
    private final String replyTo;
    private final Map<Class<?>, Codec<?, ?>> codecRegistry = new HashMap<>();
    private final Map<String, CompletableFuture<byte[]>> pendingRequests = new ConcurrentHashMap<>();

    public RpcClient(Transport transport) {
        this(transport, "");
    }

    public RpcClient(Transport transport, String replyTo) {
        this.transport = transport;
        this.replyTo = replyTo;
        this.transport.addMessageHandler(this::handleIncomingBytes);
    }

    public <P, W extends Message<W, ?>> void registerCodec(Class<P> pojoClass, Codec<P, W> codec) {
        codecRegistry.put(pojoClass, codec);
    }

    private void handleIncomingBytes(byte[] bytes) {
        try {
            RpcPacket packet = RpcPacket.ADAPTER.decode(bytes);
            if (packet.type == RpcPacket.Type.RESPONSE) {
                logger.debug("Received RESPONSE for requestId: {}", packet.requestId);
                CompletableFuture<byte[]> future = pendingRequests.remove(packet.requestId);
                if (future != null) {
                    future.complete(packet.payload.toByteArray());
                } else {
                    logger.warn("Received RESPONSE for unknown requestId: {}", packet.requestId);
                }
            } else {
                logger.debug("Received RPC packet of type: {}", packet.type);
            }
        } catch (Exception e) {
            // Ignore if not an RpcPacket or other error
        }
    }

    @SuppressWarnings("unchecked")
    public <T> T create(Class<T> serviceInterface) {
        // Try to automatically register codecs for method parameters and returns
        for (Method method : serviceInterface.getMethods()) {
            for (Class<?> paramType : method.getParameterTypes()) {
                registerCodecIfPossible(paramType);
            }
            registerCodecIfPossible(method.getReturnType());
        }

        return (T) Proxy.newProxyInstance(
                serviceInterface.getClassLoader(),
                new Class<?>[] { serviceInterface },
                new ServiceInvocationHandler(serviceInterface));
    }

    private void registerCodecIfPossible(Class<?> type) {
        if (type == void.class || type.isPrimitive() || type == String.class || type == byte[].class)
            return;
        if (codecRegistry.containsKey(type))
            return;
        try {
            String codecClassName = type.getName() + "Codec";
            Class<?> codecClass = Class.forName(codecClassName);
            Codec<?, ?> codec = (Codec<?, ?>) codecClass.getDeclaredConstructor().newInstance();
            codecRegistry.put(type, codec);
        } catch (Exception e) {
            // Probably no codec found, ignore
        }
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    public Object invokeStub(String serviceId, String methodName, Object[] args) {
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
                payload = ByteString.of(codec.getWireAdapter().encode(wireMsg));
            } else {
                // For now, support only Wire Messages or raw bytes or registered POJOs
                logger.error("Unsupported argument type: {}", arg.getClass());
            }
        }

        String requestId = UUID.randomUUID().toString();
        RpcPacket packet = new RpcPacket.Builder()
                .type(RpcPacket.Type.REQUEST)
                .serviceId(serviceId)
                .methodName(methodName)
                .requestId(requestId)
                .replyTo(replyTo)
                .payload(payload)
                .build();

        CompletableFuture<byte[]> future = new CompletableFuture<>();
        pendingRequests.put(requestId, future);

        byte[] bytes = RpcPacket.ADAPTER.encode(packet);
        transport.send(bytes);

        try {
            // Blocking wait for the demo
            return future.get(10, TimeUnit.SECONDS);
        } catch (Exception e) {
            throw new RuntimeException("RPC failed: " + e.getMessage(), e);
        }
    }

    private class ServiceInvocationHandler implements InvocationHandler {
        private final String serviceId;

        public ServiceInvocationHandler(Class<?> serviceInterface) {
            this.serviceId = serviceInterface.getName();
        }

        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            return invokeStub(serviceId, method.getName(), args);
        }
    }
}
