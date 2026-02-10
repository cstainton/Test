package dev.verrai.api.wire;

public interface GeneratedCodec<T> extends Codec<T> {
    void encodeFields(T value, JsonWriter writer);
    T decodeFields(JsonReader reader);
}
