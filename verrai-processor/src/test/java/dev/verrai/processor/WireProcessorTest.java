package dev.verrai.processor;

import com.google.testing.compile.Compilation;
import com.google.testing.compile.JavaFileObjects;
import org.junit.Test;
import javax.tools.JavaFileObject;

import static com.google.testing.compile.Compiler.javac;
import static com.google.testing.compile.CompilationSubject.assertThat;

public class WireProcessorTest {

    @Test
    public void testPrimitiveListGeneration() {
        JavaFileObject source = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.PrimitiveListModel",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.wire.Proto;",
            "import dev.verrai.api.wire.ProtoField;",
            "import java.util.List;",
            "",
            "@Proto",
            "public class PrimitiveListModel {",
            "    @ProtoField(id = 1, packed = true)",
            "    public List<Integer> packedInts;",
            "",
            "    @ProtoField(id = 2, packed = false)",
            "    public List<Integer> unpackedInts;",
            "",
            "    @ProtoField(id = 3, packed = true)",
            "    public List<Long> packedLongs;",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new WireProcessor())
            .compile(source);

        assertThat(compilation).succeeded();

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.PrimitiveListModelProtoCodec")
            .contentsAsUtf8String()
            .contains("writer.writeTag(1, FieldEncoding.LENGTH_DELIMITED)"); // Packed tag

        // Check packed encoding logic for int
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.PrimitiveListModelProtoCodec")
            .contentsAsUtf8String()
            .contains("Buffer buffer = new Buffer()");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.PrimitiveListModelProtoCodec")
            .contentsAsUtf8String()
            .contains("ProtoWriter packedWriter = new ProtoWriter(buffer)");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.PrimitiveListModelProtoCodec")
            .contentsAsUtf8String()
            .contains("packedWriter.writeVarint32(item)");

        // Check unpacked encoding logic for int
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.PrimitiveListModelProtoCodec")
            .contentsAsUtf8String()
            .contains("writer.writeTag(2, FieldEncoding.VARINT)");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.PrimitiveListModelProtoCodec")
            .contentsAsUtf8String()
            .contains("writer.writeVarint32(item)");

        // Check decoding logic for packed int
        // It should check peekFieldEncoding
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.PrimitiveListModelProtoCodec")
            .contentsAsUtf8String()
            .contains("FieldEncoding.LENGTH_DELIMITED.equals(reader.peekFieldEncoding())");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.PrimitiveListModelProtoCodec")
            .contentsAsUtf8String()
            .contains("ByteString bytes = reader.readBytes()");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.PrimitiveListModelProtoCodec")
            .contentsAsUtf8String()
            .contains("ProtoReader packedReader = new ProtoReader(buffer)");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.PrimitiveListModelProtoCodec")
            .contentsAsUtf8String()
            .contains("while (!buffer.exhausted())");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.PrimitiveListModelProtoCodec")
            .contentsAsUtf8String()
            .contains("value.packedInts.add(packedReader.readVarint32())");
    }
}
