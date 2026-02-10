package uk.co.instanto.client.service;

import java.util.function.Function;

public class CallerImpl<T> implements Caller<T> {

    private final T serviceStub;

    public CallerImpl(T serviceStub) {
        this.serviceStub = serviceStub;
    }

    @Override
    public <R> R call(Function<T, R> action) {
        // Here we could inject ThreadLocal context, Request IDs, etc.
        // For now, it's a direct pass-through.
        return action.apply(serviceStub);
    }

    @Override
    public T getService() {
        return serviceStub;
    }
}
