package uk.co.instanto.client.service;

import java.util.function.Consumer;
import uk.co.instanto.client.service.flow.Publisher;

/**
 * A safe, non-blocking stream result for subscription-style RPC calls.
 * Useful for server-sent events, topic subscriptions, or long-lived streams.
 * 
 * @param <T> The type of data in the stream.
 */
public interface AsyncStreamResult<T> extends Publisher<T> {

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
        return new AsyncStreamResult<R>() {
            @Override
            public Subscription subscribe(Consumer<R> onNext, Consumer<Throwable> onError, Runnable onComplete) {
                return AsyncStreamResult.this.subscribe(
                        item -> onNext.accept(mapper.apply(item)),
                        onError,
                        onComplete);
            }

            @Override
            public void subscribe(uk.co.instanto.client.service.flow.Subscriber<? super R> subscriber) {
                 AsyncStreamResult.this.subscribe(new uk.co.instanto.client.service.flow.Subscriber<T>() {
                     @Override
                     public void onSubscribe(uk.co.instanto.client.service.flow.Subscription subscription) {
                         subscriber.onSubscribe(subscription);
                     }

                     @Override
                     public void onNext(T item) {
                         subscriber.onNext(mapper.apply(item));
                     }

                     @Override
                     public void onError(Throwable throwable) {
                         subscriber.onError(throwable);
                     }

                     @Override
                     public void onComplete() {
                         subscriber.onComplete();
                     }
                 });
            }
        };
    }

    interface Subscription {
        void cancel();
    }
}
