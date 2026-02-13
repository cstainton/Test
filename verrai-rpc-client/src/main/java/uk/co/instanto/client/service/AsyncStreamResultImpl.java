package uk.co.instanto.client.service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class AsyncStreamResultImpl<T> implements AsyncStreamResult<T> {

    private final List<Subscriber<T>> subscribers = new ArrayList<>();
    private RpcClient client;
    private String requestId;

    public AsyncStreamResultImpl() {
    }

    public AsyncStreamResultImpl(RpcClient client, String requestId) {
        this.client = client;
        this.requestId = requestId;
    }

    @Override
    public Subscription subscribe(Consumer<T> onNext, Consumer<Throwable> onError, Runnable onComplete) {
        Subscriber<T> sub = new Subscriber<>(onNext, onError, onComplete);
        synchronized (subscribers) {
            subscribers.add(sub);
        }
        return () -> {
            synchronized (subscribers) {
                subscribers.remove(sub);
            }
        };
    }

    @Override
    public void subscribe(uk.co.instanto.client.service.flow.Subscriber<? super T> subscriber) {
        final Subscription sub = subscribe(
                subscriber::onNext,
                subscriber::onError,
                subscriber::onComplete);

        uk.co.instanto.client.service.flow.Subscription flowSub = new uk.co.instanto.client.service.flow.Subscription() {
            @Override
            public void request(long n) {
                if (client != null && requestId != null) {
                    client.sendStreamRequestN(requestId, n);
                }
            }

            @Override
            public void cancel() {
                sub.cancel();
            }
        };

        subscriber.onSubscribe(flowSub);
    }

    // --- Internal methods to feed data ---

    @SuppressWarnings("unchecked")
    public void onNextBytes(byte[] bytes) {
        // Safe cast if T is Object/byte[] - assuming serializer handling or direct bytes
        // In reality, we should deserialize here if we had the serializer and class.
        // For now, we follow existing pattern in RpcClient.
        try {
            onNext((T) bytes);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void onNext(T item) {
        List<Subscriber<T>> subs;
        synchronized (subscribers) {
            subs = new ArrayList<>(subscribers);
        }
        for (Subscriber<T> sub : subs) {
            try {
                sub.onNext.accept(item);
            } catch (Exception e) {
                // Log or handle subscriber error
                e.printStackTrace();
            }
        }
    }

    public void onError(Throwable error) {
        List<Subscriber<T>> subs;
        synchronized (subscribers) {
            subs = new ArrayList<>(subscribers);
            subscribers.clear();
        }
        for (Subscriber<T> sub : subs) {
            try {
                sub.onError.accept(error);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void onComplete() {
        List<Subscriber<T>> subs;
        synchronized (subscribers) {
            subs = new ArrayList<>(subscribers);
            subscribers.clear();
        }
        for (Subscriber<T> sub : subs) {
            try {
                sub.onComplete.run();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private static class Subscriber<T> {
        final Consumer<T> onNext;
        final Consumer<Throwable> onError;
        final Runnable onComplete;

        public Subscriber(Consumer<T> onNext, Consumer<Throwable> onError, Runnable onComplete) {
            this.onNext = onNext;
            this.onError = onError;
            this.onComplete = onComplete;
        }
    }
}
