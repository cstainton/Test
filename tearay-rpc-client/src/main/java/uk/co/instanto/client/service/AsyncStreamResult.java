package uk.co.instanto.client.service;

import java.util.function.Consumer;

/**
 * A safe, non-blocking stream result for subscription-style RPC calls.
 * Useful for server-sent events, topic subscriptions, or long-lived streams.
 * 
 * @param <T> The type of data in the stream.
 */
public interface AsyncStreamResult<T> {

    /**
     * Subscribes to the stream.
     * 
     * @param onNext     Called when a new item arrives.
     * @param onError    Called if the stream terminates with an error.
     * @param onComplete Called when the stream completes successfully.
     * @return A Subscription handle to cancel the stream.
     */
    Subscription subscribe(Consumer<T> onNext, Consumer<Throwable> onError, Runnable onComplete);

    default <R> AsyncStreamResult<R> map(java.util.function.Function<T, R> mapper) {
        return (onNext, onError, onComplete) -> this.subscribe(
                item -> onNext.accept(mapper.apply(item)),
                onError,
                onComplete);
    }

    interface Subscription {
        void cancel();
    }
}
