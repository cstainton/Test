package dev.verrai.api.binding;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ConverterTest {

    @Test
    public void testIntegerConverter() {
        Converter<Integer, String> converter = ConverterRegistry.get(Integer.class, String.class);
        assertNotNull(converter, "Integer->String converter should be registered");

        assertEquals(123, converter.toModel("123"));
        assertEquals("123", converter.toWidget(123));
        assertNull(converter.toModel("abc")); // Invalid input
        assertNull(converter.toModel(null));
        assertEquals("", converter.toWidget(null));
    }

    @Test
    public void testPrimitiveIntegerConverter() {
        Converter<Integer, String> converter = ConverterRegistry.get(int.class, String.class);
        assertNotNull(converter, "int->String converter should be registered");

        assertEquals(123, converter.toModel("123"));
    }

    @Test
    public void testBooleanConverter() {
        Converter<Boolean, String> converter = ConverterRegistry.get(Boolean.class, String.class);
        assertNotNull(converter, "Boolean->String converter should be registered");

        assertTrue(converter.toModel("true"));
        assertFalse(converter.toModel("false"));
        assertEquals("true", converter.toWidget(true));
        assertEquals("false", converter.toWidget(false));
    }
}
