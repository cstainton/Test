package uk.co.instanto.client.service.serialization;

import uk.co.instanto.tearay.rpc.common.serialization.Serializer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.nio.charset.StandardCharsets;

public class JsonSerializer implements Serializer {

    private final Gson gson;

    public JsonSerializer() {
        this.gson = new GsonBuilder()
                .setPrettyPrinting()
                .create();
    }

    @Override
    public <T> byte[] encode(T object) {
        if (object == null) {
            return new byte[0];
        }
        String json = gson.toJson(object);
        return json.getBytes(StandardCharsets.UTF_8);
    }

    @Override
    public <T> T decode(byte[] bytes, Class<T> clazz) {
        if (bytes == null || bytes.length == 0) {
            return null;
        }
        String json = new String(bytes, StandardCharsets.UTF_8);
        return gson.fromJson(json, clazz);
    }

    @Override
    public <T> void register(Class<T> clazz, Object adapterOrCodec) {
        // Gson doesn't strictly need registration for typical POJOs.
        // If specific TypeAdapters are needed, we'd need a way to register them on the
        // Builder,
        // which is harder after creation.
        // For now, we assume default Gson behavior is sufficient or valid via
        // annotations.
    }

    @Override
    public String getContentType() {
        return "application/json";
    }
}
