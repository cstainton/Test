package uk.co.instanto.client.service;

import dev.verrai.rpc.common.transport.Transport;
import dev.verrai.rpc.common.codec.Codec;
import uk.co.instanto.client.service.proto.RpcPacket;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Consumer;
import java.util.function.Function;

public class RpcClient {

    private final Transport transport;
    private final String replyTo;

    private dev.verrai.rpc.common.serialization.Serializer serializer = new dev.verrai.rpc.common.serialization.ProtobufSerializer();

    private final Map<String, RpcResponseFuture> pendingRequests = new ConcurrentHashMap<>();
    private final Map<String, AsyncStreamResultImpl<?>> pendingStreams = new ConcurrentHashMap<>();
    private final Map<String, String> defaultHeaders = new HashMap<>();

    public RpcClient(Transport transport) {
        this(transport, null);
    }

    public RpcClient(Transport transport, String replyTo) {
        this.transport = transport;
        this.replyTo = replyTo;
        this.transport.addMessageHandler(this::handleIncomingBytes);
    }

    public void setSerializer(dev.verrai.rpc.common.serialization.Serializer serializer) {
        this.serializer = serializer;
    }

    public dev.verrai.rpc.common.serialization.Serializer getSerializer() {
        return this.serializer;
    }

    public <T> void registerCodec(Class<T> type, Codec<T, ?> codec) {
        serializer.register(type, codec);
    }

    public void setDefaultHeader(String key, String value) {
        this.defaultHeaders.put(key, value);
    }

    private void handleIncomingBytes(byte[] data) {
        try {
            RpcPacket packet = RpcPacket.ADAPTER.decode(data);

            if (packet.type == RpcPacket.Type.RESPONSE) {
                RpcResponseFuture future = pendingRequests.remove(packet.requestId);
                if (future != null) {
                    future.complete(packet.payload.toByteArray());
                }
            } else if (packet.type == RpcPacket.Type.STREAM_ERROR) {
                RpcResponseFuture future = pendingRequests.remove(packet.requestId);
                if (future != null) {
                    String errorMsg = packet.payload.utf8();
                    future.completeExceptionally(new RuntimeException(errorMsg));
                }
                AsyncStreamResultImpl<?> stream = pendingStreams.get(packet.requestId); // assuming requestId ==
                                                                                        // streamId
                if (stream != null) {
                    stream.onError(new RuntimeException(packet.payload.utf8()));
                    pendingStreams.remove(packet.requestId);
                }
            } else if (packet.type == RpcPacket.Type.STREAM_DATA) {
                AsyncStreamResultImpl<?> stream = pendingStreams.get(packet.requestId);
                if (stream != null) {
                    stream.onNextBytes(packet.payload.toByteArray());
                }
            } else if (packet.type == RpcPacket.Type.STREAM_COMPLETE) {
                AsyncStreamResultImpl<?> stream = pendingStreams.remove(packet.requestId);
                if (stream != null) {
                    stream.onComplete();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @SuppressWarnings("unchecked")
    public <T> AsyncResult<T> invokeStub(String serviceId, String methodId, Object[] args) {
        Object requestDto = args[0];
        byte[] payload = serializer.encode(requestDto);

        String requestId = java.util.UUID.randomUUID().toString();
        RpcPacket.Builder builder = new RpcPacket.Builder()
                .serviceId(serviceId)
                .methodName(methodId)
                .requestId(requestId)
                .payload(okio.ByteString.of(payload))
                .replyTo(replyTo != null ? replyTo : "")
                .type(RpcPacket.Type.REQUEST);

        if (defaultHeaders != null && !defaultHeaders.isEmpty()) {
            builder.headers = defaultHeaders;
        }

        RpcPacket packet = builder.build();

        RpcResponseFuture future = new RpcResponseFuture();
        pendingRequests.put(requestId, future);

        transport.send(RpcPacket.ADAPTER.encode(packet));

        return (AsyncResult<T>) future;
    }

    @SuppressWarnings("unchecked")
    public <T> AsyncStreamResult<T> invokeStreamStub(String serviceId, String methodId, Object[] args) {
        Object requestDto = args[0];
        byte[] payload = serializer.encode(requestDto);

        String requestId = java.util.UUID.randomUUID().toString();
        RpcPacket.Builder builder = new RpcPacket.Builder()
                .serviceId(serviceId)
                .methodName(methodId)
                .requestId(requestId)
                .payload(okio.ByteString.of(payload))
                .replyTo(replyTo != null ? replyTo : "")
                .type(RpcPacket.Type.REQUEST);

        if (defaultHeaders != null && !defaultHeaders.isEmpty()) {
            builder.headers = defaultHeaders;
        }

        RpcPacket packet = builder.build();

        AsyncStreamResultImpl<T> result = new AsyncStreamResultImpl<>();
        pendingStreams.put(requestId, result);

        transport.send(RpcPacket.ADAPTER.encode(packet));

        return result;
    }

    // Inner classes
    public static class AsyncResultImpl<T> implements AsyncResult<T> {
        private T result;
        private Throwable error;
        private boolean completed;
        private final List<Consumer<T>> successCallbacks = new ArrayList<>();
        private final List<Consumer<Throwable>> errorCallbacks = new ArrayList<>();

        public AsyncResultImpl() {
        }

        public void complete(T value) {
            if (completed)
                return;
            this.result = value;
            this.completed = true;
            for (Consumer<T> cb : successCallbacks) {
                cb.accept(value);
            }
            successCallbacks.clear();
            errorCallbacks.clear();
        }

        public void completeExceptionally(Throwable ex) {
            if (completed)
                return;
            this.error = ex;
            this.completed = true;
            for (Consumer<Throwable> cb : errorCallbacks) {
                cb.accept(ex);
            }
            successCallbacks.clear();
            errorCallbacks.clear();
        }

        @Override
        public <U> AsyncResult<U> thenApply(Function<T, U> fn) {
            AsyncResultImpl<U> next = new AsyncResultImpl<>();
            if (completed) {
                if (error != null) {
                    next.completeExceptionally(error);
                } else {
                    try {
                        next.complete(fn.apply(result));
                    } catch (Throwable t) {
                        next.completeExceptionally(t);
                    }
                }
            } else {
                this.successCallbacks.add(val -> {
                    try {
                        next.complete(fn.apply(val));
                    } catch (Throwable t) {
                        next.completeExceptionally(t);
                    }
                });
                this.errorCallbacks.add(next::completeExceptionally);
            }
            return next;
        }

        @Override
        public AsyncResult<Void> thenAccept(Consumer<T> action) {
            AsyncResultImpl<Void> next = new AsyncResultImpl<>();
            if (completed) {
                if (error != null) {
                    next.completeExceptionally(error);
                } else {
                    try {
                        action.accept(result);
                        next.complete(null);
                    } catch (Throwable t) {
                        next.completeExceptionally(t);
                    }
                }
            } else {
                this.successCallbacks.add(val -> {
                    try {
                        action.accept(val);
                        next.complete(null);
                    } catch (Throwable t) {
                        next.completeExceptionally(t);
                    }
                });
                this.errorCallbacks.add(next::completeExceptionally);
            }
            return next;
        }

        @Override
        public AsyncResult<T> exceptionally(Function<Throwable, T> fn) {
            AsyncResultImpl<T> next = new AsyncResultImpl<>();
            if (completed) {
                if (error != null) {
                    try {
                        next.complete(fn.apply(error));
                    } catch (Throwable t) {
                        next.completeExceptionally(t);
                    }
                } else {
                    next.complete(result);
                }
            } else {
                this.successCallbacks.add(next::complete);
                this.errorCallbacks.add(err -> {
                    try {
                        next.complete(fn.apply(err));
                    } catch (Throwable t) {
                        next.completeExceptionally(t);
                    }
                });
            }
            return next;
        }
    }

    public static class RpcResponseFuture extends AsyncResultImpl<Object> {
        public RpcResponseFuture() {
            super();
        }
    }

    public static class AsyncStreamResultImpl<T> implements AsyncStreamResult<T> {
        private final List<SubscriptionRecord<T>> subscribers = new ArrayList<>();

        public void onNextBytes(byte[] bytes) {
            for (SubscriptionRecord<T> sub : subscribers) {
                try {
                    // Safe cast if T is Object/byte[]
                    sub.onNext.accept((T) bytes);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        public void onError(Throwable t) {
            for (SubscriptionRecord<T> sub : subscribers) {
                sub.onError.accept(t);
            }
            subscribers.clear();
        }

        public void onComplete() {
            for (SubscriptionRecord<T> sub : subscribers) {
                sub.onComplete.run();
            }
            subscribers.clear();
        }

        @Override
        public Subscription subscribe(Consumer<T> onNext, Consumer<Throwable> onError, Runnable onComplete) {
            SubscriptionRecord<T> record = new SubscriptionRecord<>(onNext, onError, onComplete);
            subscribers.add(record);
            return () -> subscribers.remove(record);
        }

        private static class SubscriptionRecord<T> {
            final Consumer<T> onNext;
            final Consumer<Throwable> onError;
            final Runnable onComplete;

            SubscriptionRecord(Consumer<T> onNext, Consumer<Throwable> onError, Runnable onComplete) {
                this.onNext = onNext;
                this.onError = onError;
                this.onComplete = onComplete;
            }
        }
    }
}
