package uk.co.instanto.tearay.api.wire;

public interface JsonReader {
    void beginObject();
    void endObject();
    boolean hasNext();
    String nextName();
    String nextString();
    int nextInt();
    double nextDouble();
    boolean nextBoolean();
    void skipValue();
    void beginArray();
    void endArray();

    // For polymorphism
    String peekString(String name);
}
