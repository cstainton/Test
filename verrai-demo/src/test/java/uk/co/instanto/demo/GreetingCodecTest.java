package uk.co.instanto.demo;

import org.junit.Test;
import static org.junit.Assert.*;
import uk.co.instanto.demo.service.dto.Greeting;
import uk.co.instanto.demo.service.dto.GreetingJsonCodec;
import java.util.Map;
import java.util.HashMap;

public class GreetingCodecTest {

    @Test
    public void testMapSerialization() {
        Greeting greeting = new Greeting("Hello", "NodeA");
        greeting.getTranslations().put("fr", "Bonjour");
        greeting.getTranslations().put("de", "Hallo");

        GreetingJsonCodec codec = new GreetingJsonCodec();
        String json = codec.toJson(greeting);

        System.out.println("Encoded JSON: " + json);

        assertTrue(json.contains("\"translations\":{"));
        assertTrue(json.contains("\"fr\":\"Bonjour\""));
        assertTrue(json.contains("\"de\":\"Hallo\""));

        Greeting decoded = codec.fromJson(json);

        assertEquals("Hello", decoded.getMessage());
        assertEquals("NodeA", decoded.getSenderNodeId());
        assertNotNull(decoded.getTranslations());
        assertEquals(2, decoded.getTranslations().size());
        assertEquals("Bonjour", decoded.getTranslations().get("fr"));
        assertEquals("Hallo", decoded.getTranslations().get("de"));
    }
}
