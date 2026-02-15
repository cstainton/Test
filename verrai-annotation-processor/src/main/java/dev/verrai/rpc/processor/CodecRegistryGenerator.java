package dev.verrai.rpc.processor;

import com.squareup.javapoet.*;
import dev.verrai.rpc.common.serialization.CodecLoader;
import dev.verrai.rpc.common.serialization.JsonCodecRegistry;

import javax.annotation.processing.Filer;
import javax.lang.model.element.Modifier;
import javax.lang.model.element.TypeElement;
import java.io.IOException;
import java.util.Set;
import java.util.zip.CRC32;

public class CodecRegistryGenerator {
    private final Filer filer;

    public CodecRegistryGenerator(Filer filer) {
        this.filer = filer;
    }

    public String generate(Set<TypeElement> elements) throws IOException {
        if (elements.isEmpty()) return null;

        // Generate unique class name based on content
        StringBuilder sig = new StringBuilder();
        // Sort elements to ensure deterministic hash?
        elements.stream()
                .map(e -> e.getQualifiedName().toString())
                .sorted()
                .forEach(s -> sig.append(s).append(","));

        CRC32 crc = new CRC32();
        crc.update(sig.toString().getBytes());
        String hash = Long.toHexString(crc.getValue());

        String packageName = "dev.verrai.rpc.generated";
        String className = "CodecLoader_" + hash;

        TypeSpec.Builder typeSpec = TypeSpec.classBuilder(className)
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(CodecLoader.class);

        MethodSpec.Builder loadMethod = MethodSpec.methodBuilder("load")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class);

        for (TypeElement element : elements) {
            ClassName typeName = ClassName.get(element);
            // Assuming JsonCodec is generated in the same package as the type with Name + "JsonCodec"
            ClassName codecClass = ClassName.get(typeName.packageName(), typeName.simpleName() + "JsonCodec");

            loadMethod.addStatement("$T.register($T.class, new $T())",
                    JsonCodecRegistry.class, typeName, codecClass);
        }

        typeSpec.addMethod(loadMethod.build());

        JavaFile javaFile = JavaFile.builder(packageName, typeSpec.build()).build();
        javaFile.writeTo(filer);

        return packageName + "." + className;
    }
}
