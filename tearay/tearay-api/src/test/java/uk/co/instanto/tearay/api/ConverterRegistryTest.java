package uk.co.instanto.tearay.api;

import org.junit.Test;
import static org.junit.Assert.*;

public class ConverterRegistryTest {

    @Test
    public void testDefaultConverters() {
        Converter<Integer, String> intStr = ConverterRegistry.find(Integer.class, String.class);
        assertNotNull(intStr);
        assertEquals("123", intStr.toWidgetValue(123));
        assertEquals(Integer.valueOf(123), intStr.toModelValue("123"));
        assertNull(intStr.toModelValue("abc"));

        Converter<String, Integer> strInt = ConverterRegistry.find(String.class, Integer.class);
        assertNotNull(strInt);
        assertEquals(Integer.valueOf(123), strInt.toWidgetValue("123"));
        assertEquals("123", strInt.toModelValue(123));

        Converter<Boolean, String> boolStr = ConverterRegistry.find(Boolean.class, String.class);
        assertNotNull(boolStr);
        assertEquals("true", boolStr.toWidgetValue(true));
        assertEquals(Boolean.TRUE, boolStr.toModelValue("true"));
        assertEquals(Boolean.FALSE, boolStr.toModelValue("false"));
    }

    @Test
    public void testCustomConverter() {
        class MyType {}
        Converter<MyType, String> converter = new Converter<MyType, String>() {
            @Override
            public MyType toModelValue(String widgetValue) { return new MyType(); }
            @Override
            public String toWidgetValue(MyType modelValue) { return "custom"; }
        };

        ConverterRegistry.register(MyType.class, String.class, converter);
        assertSame(converter, ConverterRegistry.find(MyType.class, String.class));
    }
}
