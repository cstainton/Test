package dev.verrai.api;

public interface Event<T> {
    void fire(T event);
}
