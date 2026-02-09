package uk.co.instanto.tearay.rpc.common.serialization;

import java.util.HashMap;
import java.util.Map;

public class JsonCodecRegistry {
    private static final Map<Class<?>, JsonCodec<?>> codecs = new HashMap<>();

    public static <T> void register(Class<T> clazz, JsonCodec<T> codec) {
        codecs.put(clazz, codec);
    }

    @SuppressWarnings("unchecked")
    public static <T> JsonCodec<T> get(Class<T> clazz) {
        return (JsonCodec<T>) codecs.get(clazz);
    }
}
