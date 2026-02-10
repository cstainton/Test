package uk.co.instanto.tearay.api;

public interface Event<T> {
    void fire(T event);
}
