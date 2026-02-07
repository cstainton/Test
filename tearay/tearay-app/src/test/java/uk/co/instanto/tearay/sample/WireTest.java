package uk.co.instanto.tearay.sample;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.teavm.junit.SkipJVM;
import org.teavm.junit.TeaVMTestRunner;
import uk.co.instanto.tearay.api.wire.*;
import uk.co.instanto.tearay.wire.generated.WireCodecRegistryImpl;
import uk.co.instanto.tearay.sample.poly.*;
import java.util.ArrayList;
import java.util.Arrays;
import com.squareup.wire.ProtoWriter;
import com.squareup.wire.ProtoReader;
import okio.Buffer;
import java.io.IOException;
import static org.junit.Assert.*;

@RunWith(TeaVMTestRunner.class)
@SkipJVM
public class WireTest {

    @Test
    public void testJsonRoundTrip() {
        CodecRegistry registry = new WireCodecRegistryImpl();
        Codec<UserDTO> codec = registry.getCodec(UserDTO.class);
        assertNotNull("Codec should not be null", codec);

        UserDTO original = new UserDTO();
        original.name = "Alice";
        original.age = 30;
        original.active = true;
        original.tags = new ArrayList<>(Arrays.asList("admin", "user"));

        StringBuilder sb = new StringBuilder();
        JsonWriter writer = new JsonWriterImpl(sb);
        codec.encode(original, writer);
        String json = sb.toString();

        assertTrue(json.contains("\"name\":\"Alice\""));

        JsonReader reader = new JsonReaderImpl(json);
        UserDTO decoded = codec.decode(reader);

        assertNotNull(decoded);
        assertEquals(original.name, decoded.name);
    }

    @Test
    public void testPolymorphism() {
        CodecRegistry registry = new WireCodecRegistryImpl();
        Codec<Base> codec = registry.getCodec(Base.class);
        assertNotNull(codec);

        SubA a = new SubA();
        a.baseName = "BaseOfA";
        a.aValue = 123;

        StringBuilder sb = new StringBuilder();
        JsonWriter writer = new JsonWriterImpl(sb);
        codec.encode(a, writer);
        String json = sb.toString();

        assertTrue(json.contains("\"type\":\"SubA\""));
        assertTrue(json.contains("\"baseName\":\"BaseOfA\""));
        assertTrue(json.contains("\"aValue\":123"));

        JsonReader reader = new JsonReaderImpl(json);
        Base decoded = codec.decode(reader);

        assertTrue(decoded instanceof SubA);
        SubA decodedA = (SubA) decoded;
        assertEquals("BaseOfA", decodedA.baseName);
        assertEquals(123, decodedA.aValue);
    }

    @Test
    public void testProtobufRoundTrip() throws IOException {
        CodecRegistry registry = new WireCodecRegistryImpl();
        registry.setMode(WireMode.PROTOBUF);
        Codec<UserDTO> codec = registry.getCodec(UserDTO.class);
        assertNotNull("Codec should not be null", codec);

        UserDTO original = new UserDTO();
        original.name = "Bob";
        original.age = 40;
        original.active = false;
        original.tags = new ArrayList<>(Arrays.asList("proto", "buf"));

        Buffer buffer = new Buffer();
        ProtoWriter writer = new ProtoWriter(buffer);
        codec.encode(original, writer);

        byte[] bytes = buffer.readByteArray();
        assertTrue(bytes.length > 0);

        Buffer input = new Buffer();
        input.write(bytes);
        ProtoReader reader = new ProtoReader(input);

        UserDTO decoded = codec.decode(reader);
        assertNotNull(decoded);
        assertEquals(original.name, decoded.name);
        assertEquals(original.age, decoded.age);
        assertEquals(original.active, decoded.active);
        assertEquals(original.tags.size(), decoded.tags.size());
        assertEquals(original.tags.get(0), decoded.tags.get(0));
    }

    @Test
    public void testRecursiveProtobuf() throws IOException {
        CodecRegistry registry = new WireCodecRegistryImpl();
        registry.setMode(WireMode.PROTOBUF);
        Codec<RecursiveNode> codec = registry.getCodec(RecursiveNode.class);

        RecursiveNode root = new RecursiveNode();
        root.name = "Root";
        root.children = new ArrayList<>();

        RecursiveNode child1 = new RecursiveNode();
        child1.name = "Child1";
        root.children.add(child1);

        RecursiveNode child2 = new RecursiveNode();
        child2.name = "Child2";
        // child2.children = new ArrayList<>();
        // RecursiveNode grandChild = new RecursiveNode();
        // grandChild.name = "GrandChild";
        // child2.children.add(grandChild);
        root.children.add(child2);

        Buffer buffer = new Buffer();
        ProtoWriter writer = new ProtoWriter(buffer);
        codec.encode(root, writer);

        byte[] bytes = buffer.readByteArray();
        assertTrue(bytes.length > 0);

        Buffer input = new Buffer();
        input.write(bytes);
        ProtoReader reader = new ProtoReader(input);

        RecursiveNode decoded = codec.decode(reader);
        assertNotNull(decoded);
        assertEquals("Root", decoded.name);
        assertEquals(2, decoded.children.size());
        assertEquals("Child1", decoded.children.get(0).name);
        assertEquals("Child2", decoded.children.get(1).name);
    }
}
