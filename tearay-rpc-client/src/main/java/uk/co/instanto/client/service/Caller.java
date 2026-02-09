package uk.co.instanto.client.service;

import java.util.concurrent.CompletableFuture;
import java.util.function.Function;

/**
 * Encapsulates a service call with additional metadata and context.
 * 
 * @param <T> The service interface type.
 */
public interface Caller<T> {

    /**
     * Executes a service call within a managed context.
     * 
     * @param action A function that invokes the service method on the proxy stub.
     * @param <R>    The return type of the service method (usually T or
     *               CompletableFuture<T>).
     * @return The result of the action.
     */
    <R> R call(Function<T, R> action);

    /**
     * Returns the raw service stub if direct access is needed (use with caution).
     */
    T getService();
}
