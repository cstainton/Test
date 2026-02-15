package uk.co.instanto.client.service.serialization;

import org.junit.Test;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import static org.junit.Assert.*;

public class JsonSerializerTest {

    private final JsonSerializer serializer = new JsonSerializer();

    @Test
    public void testEncodeSimpleObject() {
        TestObject obj = new TestObject("test", 123);
        byte[] bytes = serializer.encode(obj);
        assertNotNull(bytes);
        assertTrue(bytes.length > 0);

        // Verify by decoding back to avoid brittle string assertions
        TestObject decoded = serializer.decode(bytes, TestObject.class);
        assertNotNull(decoded);
        assertEquals(obj.name, decoded.name);
        assertEquals(obj.value, decoded.value);
    }

    @Test
    public void testEncodeNull() {
        byte[] bytes = serializer.encode(null);
        assertNotNull(bytes);
        assertEquals(0, bytes.length);
    }

    @Test
    public void testDecodeSimpleObject() {
        String json = "{\"name\": \"decoded\", \"value\": 456}";
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);

        TestObject obj = serializer.decode(bytes, TestObject.class);
        assertNotNull(obj);
        assertEquals("decoded", obj.name);
        assertEquals(456, obj.value);
    }

    @Test
    public void testDecodeNull() {
        TestObject obj = serializer.decode(null, TestObject.class);
        assertNull(obj);
    }

    @Test
    public void testDecodeEmpty() {
        TestObject obj = serializer.decode(new byte[0], TestObject.class);
        assertNull(obj);
    }

    @Test
    public void testComplexObject() {
        ComplexObject complex = new ComplexObject();
        complex.id = "c1";
        complex.items = Arrays.asList("item1", "item2");
        complex.nested = new TestObject("nested", 999);

        byte[] bytes = serializer.encode(complex);
        assertNotNull(bytes);

        ComplexObject decoded = serializer.decode(bytes, ComplexObject.class);
        assertNotNull(decoded);
        assertEquals(complex.id, decoded.id);
        assertEquals(complex.items, decoded.items);
        assertEquals(complex.nested.name, decoded.nested.name);
        assertEquals(complex.nested.value, decoded.nested.value);
    }

    @Test
    public void testGetContentType() {
        assertEquals("application/json", serializer.getContentType());
    }

    // Helper classes for testing
    private static class TestObject {
        String name;
        int value;

        // No-arg constructor for Gson
        TestObject() {}

        TestObject(String name, int value) {
            this.name = name;
            this.value = value;
        }
    }

    private static class ComplexObject {
        String id;
        List<String> items;
        TestObject nested;
    }
}
