package uk.co.instanto.tearay.rpc.processor;

import com.squareup.javapoet.JavaFile;
import com.squareup.javapoet.TypeSpec;
import com.squareup.wire.java.JavaGenerator;
import com.squareup.wire.schema.Location;
import com.squareup.wire.schema.Schema;
import com.squareup.wire.schema.SchemaLoader;
import com.squareup.wire.schema.ProtoFile;
import okio.FileSystem;

import javax.annotation.processing.ProcessingEnvironment;
import javax.tools.Diagnostic;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WireGenerator {

    private final ProcessingEnvironment processingEnv;
    private final Map<String, String> protoFiles = new HashMap<>();
    private final Path tempDir;

    public WireGenerator(ProcessingEnvironment processingEnv) {
        this.processingEnv = processingEnv;
        this.tempDir = java.nio.file.Paths.get("target/tearay_protos_debug").toAbsolutePath();
    }

    public void addProtoFile(String path, String content) {
        protoFiles.put(path, content);
    }

    public void generateWireClasses() {
        try {
            if (protoFiles.isEmpty())
                return;

            if (!Files.exists(tempDir)) {
                Files.createDirectories(tempDir);
            }

            // Write user-provided proto files to tempDir
            for (Map.Entry<String, String> entry : protoFiles.entrySet()) {
                Path filePath = tempDir.resolve(entry.getKey());
                if (!Files.exists(filePath.getParent())) {
                    Files.createDirectories(filePath.getParent());
                }
                Files.write(filePath, entry.getValue().getBytes());
            }

            // Extract standard protos from classpath to tempDir
            extractStandardProto("google/protobuf/descriptor.proto");
            extractStandardProto("google/protobuf/wrappers.proto");
            extractStandardProto("google/protobuf/any.proto");
            extractStandardProto("google/protobuf/timestamp.proto");
            extractStandardProto("google/protobuf/duration.proto");
            extractStandardProto("google/protobuf/struct.proto");
            extractStandardProto("google/protobuf/empty.proto");

            java.nio.file.Path javaOut = tempDir.resolve("generated_java");
            if (!Files.exists(javaOut)) {
                Files.createDirectories(javaOut);
            }

            List<String> args = new ArrayList<>();
            args.add("--proto_path=" + tempDir.toAbsolutePath().toString());
            args.add("--java_out=" + javaOut.toAbsolutePath().toString());

            // Add all user proto files (relative paths)
            for (String relativePath : protoFiles.keySet()) {
                args.add(relativePath);
            }

            com.squareup.wire.WireLogger logger = new com.squareup.wire.ConsoleWireLogger();

            com.squareup.wire.WireCompiler compiler = com.squareup.wire.WireCompiler.forArgs(
                    okio.FileSystem.SYSTEM,
                    logger,
                    args.toArray(new String[0]));

            compiler.compile();

            // Read generated files and write to Filer
            if (Files.exists(javaOut)) {
                Files.walk(javaOut)
                        .filter(Files::isRegularFile)
                        .filter(p -> p.toString().endsWith(".java"))
                        .forEach(p -> {
                            try {
                                String content = new String(Files.readAllBytes(p));
                                // Deduce class name from file path relative to javaOut
                                // e.g. javaOut/com/pkg/Foo.java -> com.pkg.Foo
                                String rel = javaOut.relativize(p).toString();
                                String fqcn = rel.replace(java.io.File.separatorChar, '.').replace(".java", "");

                                processingEnv.getFiler().createSourceFile(fqcn).openWriter().append(content).close();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        });
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("WireCompiler failed", e);
        }
    }

    private void extractStandardProto(String path) {
        try {
            InputStream is = getClass().getClassLoader().getResourceAsStream(path);
            if (is != null) {
                java.nio.file.Path target = tempDir.resolve(path);
                if (!Files.exists(target.getParent())) {
                    Files.createDirectories(target.getParent());
                }
                Files.copy(is, target, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
            } else {
                System.err.println("WARNING: Standard proto not found on classpath: " + path);
            }
        } catch (IOException e) {
            System.err.println("WARNING: Failed to extract " + path + ": " + e.getMessage());
        }
    }
}
