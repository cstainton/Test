package uk.co.instanto.client.service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class AsyncStreamResultImpl<T> implements AsyncStreamResult<T> {

    private final List<Subscriber<T>> subscribers = new ArrayList<>();

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

    // --- Internal methods to feed data ---

    public void onNext(T item) {
        synchronized (subscribers) {
            for (Subscriber<T> sub : subscribers) {
                try {
                    sub.onNext.accept(item);
                } catch (Exception e) {
                    // Log or handle subscriber error
                    e.printStackTrace();
                }
            }
        }
    }

    public void onError(Throwable error) {
        synchronized (subscribers) {
            for (Subscriber<T> sub : subscribers) {
                try {
                    sub.onError.accept(error);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            subscribers.clear();
        }
    }

    public void onComplete() {
        synchronized (subscribers) {
            for (Subscriber<T> sub : subscribers) {
                try {
                    sub.onComplete.run();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            subscribers.clear();
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
