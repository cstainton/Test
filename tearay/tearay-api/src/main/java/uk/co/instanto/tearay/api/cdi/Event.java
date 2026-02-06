package uk.co.instanto.tearay.api.cdi;

public interface Event<T> {
    void fire(T event);
}
