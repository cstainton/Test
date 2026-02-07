package uk.co.instanto.tearay.api.wire;

import com.squareup.wire.ProtoReader;
import com.squareup.wire.ProtoWriter;
import java.io.IOException;

public interface Codec<T> {
    // JSON methods
    void encode(T value, JsonWriter writer);
    T decode(JsonReader reader);

    // Protobuf methods (default to throw unsupported if not implemented/generated)
    default void encode(T value, ProtoWriter writer) throws IOException {
        throw new UnsupportedOperationException("Protobuf encode not implemented");
    }
    default T decode(ProtoReader reader) throws IOException {
        throw new UnsupportedOperationException("Protobuf decode not implemented");
    }
}
