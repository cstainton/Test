package uk.co.instanto.tearay.api;

public interface TakesValue<V> {
    void setValue(V value);
    V getValue();
}
