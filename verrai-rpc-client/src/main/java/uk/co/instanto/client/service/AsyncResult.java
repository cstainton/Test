package uk.co.instanto.client.service;

import java.util.function.Consumer;
import java.util.function.Function;

/**
 * A safe, non-blocking alternative to CompletableFuture for TeaVM
 * compatibility.
 * This interface exposes only methods that are safe to use in a browser
 * environment
 * (i.e., no blocking get() or join()).
 * 
 * @param <T> The result type.
 */
public interface AsyncResult<T> {

    /**
     * returns a new AsyncResult that, when this stage completes normally,
     * is executed with this stage's result as the argument to the implementation
     * action.
     */
    <U> AsyncResult<U> thenApply(Function<T, U> fn);

    /**
     * Returns a new AsyncResult that, when this stage completes normally,
     * is executed with this stage's result as the argument to the implementation
     * action.
     */
    AsyncResult<Void> thenAccept(Consumer<T> action);

    /**
     * Returns a new AsyncResult that, when this stage completes exceptionally,
     * is executed with this stage's exception as the argument to the supplied
     * function.
     */
    AsyncResult<T> exceptionally(Function<Throwable, T> fn);

}
