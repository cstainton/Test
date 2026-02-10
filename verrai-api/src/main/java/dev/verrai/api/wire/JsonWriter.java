package dev.verrai.api.wire;

public interface JsonWriter {
    void beginObject();
    void endObject();
    void name(String name);
    void value(String value);
    void value(int value);
    void value(double value);
    void value(boolean value);
    void beginArray();
    void endArray();
}
