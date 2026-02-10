package uk.co.instanto.tearay.api.wire;

public interface GeneratedCodec<T> extends Codec<T> {
    void encodeFields(T value, JsonWriter writer);
    T decodeFields(JsonReader reader);
}
