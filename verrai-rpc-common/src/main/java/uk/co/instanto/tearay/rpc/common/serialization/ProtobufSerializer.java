package uk.co.instanto.tearay.rpc.common.serialization;

import uk.co.instanto.tearay.rpc.common.codec.Codec;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

public class ProtobufSerializer implements Serializer {
    public static final String CONTENT_TYPE = "application/x-protobuf";

    // Registry of codecs for specific classes
    private final Map<Class<?>, Codec<?, ?>> codecRegistry = new ConcurrentHashMap<>();

    @Override
    public String getContentType() {
        return CONTENT_TYPE;
    }

    @Override
    public <T> void register(Class<T> clazz, Object adapterOrCodec) {
        if (adapterOrCodec instanceof Codec) {
            codecRegistry.put(clazz, (Codec<?, ?>) adapterOrCodec);
        } else {
            throw new IllegalArgumentException(
                    "ProtobufSerializer requires a Codec instance, got: " + adapterOrCodec.getClass().getName());
        }
    }

    @SuppressWarnings("unchecked")
    @Override
    public <T> byte[] encode(T object) {
        if (object == null) {
            return new byte[0];
        }
        Codec<T, ?> codec = (Codec<T, ?>) codecRegistry.get(object.getClass());
        if (codec == null) {
            throw new IllegalArgumentException("No codec registered for class: " + object.getClass().getName());
        }
        return encodeInternal(codec, object);
    }

    @SuppressWarnings("unchecked")
    private <T, W extends com.squareup.wire.Message<W, ?>> byte[] encodeInternal(Codec<T, ?> codec, T object) {
        Codec<T, W> typedCodec = (Codec<T, W>) codec;
        W wire = typedCodec.toWire(object);
        return typedCodec.getWireAdapter().encode(wire);
    }

    @SuppressWarnings("unchecked")
    @Override
    public <T> T decode(byte[] bytes, Class<T> clazz) {
        if (bytes == null || bytes.length == 0) {
            return null; // Or throw?
        }
        Codec<T, ?> codec = (Codec<T, ?>) codecRegistry.get(clazz);
        if (codec == null) {
            throw new IllegalArgumentException("No codec registered for class: " + clazz.getName());
        }
        return decodeInternal(codec, bytes, clazz);
    }

    @SuppressWarnings("unchecked")
    private <T, W extends com.squareup.wire.Message<W, ?>> T decodeInternal(Codec<T, ?> codec, byte[] bytes,
            Class<T> clazz) {
        try {
            Codec<T, W> typedCodec = (Codec<T, W>) codec;
            W wire = typedCodec.getWireAdapter().decode(bytes);
            return typedCodec.fromWire(wire);
        } catch (Exception e) {
            throw new RuntimeException("Failed to decode protobuf for class " + clazz.getName(), e);
        }
    }
}
