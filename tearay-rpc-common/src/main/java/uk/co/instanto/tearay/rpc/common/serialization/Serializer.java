package uk.co.instanto.tearay.rpc.common.serialization;

public interface Serializer {
    /**
     * Encodes an object into a byte array.
     */
    <T> byte[] encode(T object);

    /**
     * Decodes a byte array into an object of the given class.
     */
    <T> T decode(byte[] bytes, Class<T> clazz);

    /**
     * Registers a codec/adapter for a specific class if needed by the
     * implementation.
     * (Mainly for Protobuf, might be no-op for JSON)
     */
    <T> void register(Class<T> clazz, Object adapterOrCodec);

    /**
     * Returns the content type of this serialization format.
     * e.g. "application/x-protobuf" or "application/json"
     */
    String getContentType();
}
