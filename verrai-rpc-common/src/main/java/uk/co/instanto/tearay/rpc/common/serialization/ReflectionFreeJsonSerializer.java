package uk.co.instanto.tearay.rpc.common.serialization;

public class ReflectionFreeJsonSerializer implements Serializer {

    @Override
    public <T> byte[] encode(T object) {
        if (object == null)
            return new byte[0];
        JsonCodec<T> codec = (JsonCodec<T>) JsonCodecRegistry.get(object.getClass());
        if (codec == null) {
            throw new RuntimeException("No JsonCodec registered for " + object.getClass().getName());
        }
        return codec.toJson(object).getBytes();
    }

    @Override
    public <T> T decode(byte[] bytes, Class<T> clazz) {
        if (bytes == null || bytes.length == 0)
            return null;
        JsonCodec<T> codec = JsonCodecRegistry.get(clazz);
        if (codec == null) {
            throw new RuntimeException("No JsonCodec registered for " + clazz.getName());
        }
        return codec.fromJson(new String(bytes));
    }

    @Override
    public <T> void register(Class<T> clazz, Object adapterOrCodec) {
        if (adapterOrCodec instanceof JsonCodec) {
            JsonCodecRegistry.register(clazz, (JsonCodec<T>) adapterOrCodec);
        }
    }

    @Override
    public String getContentType() {
        return "application/json";
    }
}
