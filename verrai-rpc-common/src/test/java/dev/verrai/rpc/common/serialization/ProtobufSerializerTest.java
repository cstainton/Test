package dev.verrai.rpc.common.serialization;

import com.squareup.wire.Message;
import com.squareup.wire.ProtoAdapter;
import dev.verrai.rpc.common.codec.Codec;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ProtobufSerializerTest {

    private ProtobufSerializer serializer;

    @Before
    public void setUp() {
        serializer = new ProtobufSerializer();
    }

    @Test
    public void getContentType_returnsCorrectString() {
        assertEquals("application/x-protobuf", serializer.getContentType());
    }

    @Test
    public void register_addsCodecToRegistry() {
        Codec codec = mock(Codec.class);
        // We can't directly check the private map, but we can verify behavior via encode/decode
        // or ensure no exception is thrown.
        serializer.register(TestObject.class, codec);
    }

    @Test(expected = IllegalArgumentException.class)
    public void register_throwsExceptionForInvalidAdapter() {
        serializer.register(TestObject.class, new Object());
    }

    @Test
    public void encode_withValidObjectAndRegisteredCodec() {
        Codec<TestObject, TestWireMessage> codec = mock(Codec.class);
        TestObject testObject = new TestObject();
        TestWireMessage wireMessage = mock(TestWireMessage.class);
        ProtoAdapter<TestWireMessage> adapter = mock(ProtoAdapter.class);
        byte[] expectedBytes = new byte[]{1, 2, 3};

        when(codec.toWire(testObject)).thenReturn(wireMessage);
        when(codec.getWireAdapter()).thenReturn(adapter);
        when(adapter.encode(wireMessage)).thenReturn(expectedBytes);

        serializer.register(TestObject.class, codec);
        byte[] result = serializer.encode(testObject);

        assertArrayEquals(expectedBytes, result);
        verify(codec).toWire(testObject);
        verify(adapter).encode(wireMessage);
    }

    @Test
    public void encode_withNullObject_returnsEmptyBytes() {
        byte[] result = serializer.encode(null);
        assertNotNull(result);
        assertEquals(0, result.length);
    }

    @Test(expected = IllegalArgumentException.class)
    public void encode_withUnregisteredObject_throwsException() {
        serializer.encode(new TestObject());
    }

    @Test
    public void decode_withValidBytesAndRegisteredCodec() throws java.io.IOException {
        Codec<TestObject, TestWireMessage> codec = mock(Codec.class);
        TestObject expectedObject = new TestObject();
        TestWireMessage wireMessage = mock(TestWireMessage.class);
        ProtoAdapter<TestWireMessage> adapter = mock(ProtoAdapter.class);
        byte[] inputBytes = new byte[]{1, 2, 3};

        when(codec.getWireAdapter()).thenReturn(adapter);
        when(adapter.decode(inputBytes)).thenReturn(wireMessage);
        when(codec.fromWire(wireMessage)).thenReturn(expectedObject);

        serializer.register(TestObject.class, codec);
        TestObject result = serializer.decode(inputBytes, TestObject.class);

        assertEquals(expectedObject, result);
        verify(adapter).decode(inputBytes);
        verify(codec).fromWire(wireMessage);
    }

    @Test
    public void decode_withNullBytes_returnsNull() {
        assertNull(serializer.decode(null, TestObject.class));
    }

    @Test
    public void decode_withEmptyBytes_returnsNull() {
        assertNull(serializer.decode(new byte[0], TestObject.class));
    }

    @Test(expected = IllegalArgumentException.class)
    public void decode_withUnregisteredClass_throwsException() {
        serializer.decode(new byte[]{1, 2, 3}, TestObject.class);
    }

    @Test(expected = RuntimeException.class)
    public void decode_failure_throwsRuntimeException() throws java.io.IOException {
        Codec<TestObject, TestWireMessage> codec = mock(Codec.class);
        ProtoAdapter<TestWireMessage> adapter = mock(ProtoAdapter.class);
        byte[] inputBytes = new byte[]{1, 2, 3};

        when(codec.getWireAdapter()).thenReturn(adapter);
        when(adapter.decode(inputBytes)).thenThrow(new RuntimeException("Decode error"));

        serializer.register(TestObject.class, codec);
        serializer.decode(inputBytes, TestObject.class);
    }

    // Dummy classes for testing
    private static class TestObject {}

    // We need to extend Message for the generic bounds in ProtobufSerializer methods
    private abstract static class TestWireMessage extends Message<TestWireMessage, TestWireMessage.Builder> {
        public TestWireMessage(ProtoAdapter<TestWireMessage> adapter, okio.ByteString unknownFields) {
            super(adapter, unknownFields);
        }
        static class Builder extends Message.Builder<TestWireMessage, Builder> {
            @Override
            public TestWireMessage build() {
                return null;
            }
        }
    }
}
