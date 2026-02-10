package dev.verrai.api.wire;

public interface CodecRegistry {
    void setMode(WireMode mode);
    <T> Codec<T> getCodec(Class<T> clazz);
}
