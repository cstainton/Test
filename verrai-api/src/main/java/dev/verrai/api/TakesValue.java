package dev.verrai.api;

public interface TakesValue<V> {
    void setValue(V value);
    V getValue();
}
