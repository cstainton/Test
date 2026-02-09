package uk.co.instanto.tearay.rpc.common.serialization;

public interface JsonCodec<T> {
    String toJson(T object);

    T fromJson(String json);
}
