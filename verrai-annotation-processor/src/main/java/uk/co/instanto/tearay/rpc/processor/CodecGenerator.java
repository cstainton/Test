package uk.co.instanto.tearay.rpc.processor;

import com.squareup.javapoet.*;
import uk.co.instanto.tearay.rpc.common.codec.Codec;

import javax.lang.model.element.*;
import javax.lang.model.type.TypeMirror;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class CodecGenerator {

    public JavaFile generate(TypeElement typeElement) {
        String packageName = ((PackageElement) typeElement.getEnclosingElement()).getQualifiedName().toString();
        String simpleName = typeElement.getSimpleName().toString();
        ClassName pojoType = ClassName.get(packageName, simpleName);
        ClassName wireType = ClassName.get(packageName + ".proto", simpleName);

        ParameterizedTypeName codecInterface = ParameterizedTypeName.get(
                ClassName.get(Codec.class),
                pojoType,
                wireType);

        TypeSpec.Builder typeSpec = TypeSpec.classBuilder(simpleName + "Codec")
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(codecInterface);

        // toWire method
        MethodSpec.Builder toWire = MethodSpec.methodBuilder("toWire")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(wireType)
                .addParameter(pojoType, "pojo");

        toWire.addStatement("if (pojo == null) return null");
        toWire.addCode("return new $T.Builder()\n", wireType);

        for (Element enclosed : typeElement.getEnclosedElements()) {
            if (enclosed.getKind() == ElementKind.FIELD && !enclosed.getModifiers().contains(Modifier.STATIC)) {
                String fieldName = enclosed.getSimpleName().toString();
                String capName = fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
                String rawType = enclosed.asType().toString();

                String getterPrefix = rawType.equalsIgnoreCase("boolean") ? "is" : "get";

                if (TypeUtils.getProtoType(rawType) != null || TypeUtils.isMap(rawType)) {
                    if ("byte[]".equals(rawType)) {
                        toWire.addCode("    .$L($T.of(pojo.$L$L()))\n", fieldName, ClassName.get("okio", "ByteString"), getterPrefix, capName);
                    } else {
                        toWire.addCode("    .$L(pojo.$L$L())\n", fieldName, getterPrefix, capName);
                    }
                } else if (TypeUtils.isCollection(rawType)) {
                    generateCollectionToWire(toWire, fieldName, rawType, getterPrefix, capName);
                } else if (isEnum(enclosed.asType())) {
                    String wireTypeName = getWireTypeName(enclosed.asType());
                    toWire.addCode("    .$L($T.valueOf(pojo.$L$L().name()))\n", fieldName,
                            ClassName.bestGuess(wireTypeName), getterPrefix, capName);
                } else {
                    // Nested POJO
                    toWire.addCode("    .$L(new $TCodec().toWire(pojo.$L$L()))\n", fieldName,
                            ClassName.bestGuess(rawType), getterPrefix, capName);
                }
            }
        }
        toWire.addStatement("    .build()");
        typeSpec.addMethod(toWire.build());

        // fromWire method
        MethodSpec.Builder fromWire = MethodSpec.methodBuilder("fromWire")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(pojoType)
                .addParameter(wireType, "wire");

        fromWire.addStatement("if (wire == null) return null");
        fromWire.addStatement("$T pojo = new $T()", pojoType, pojoType);

        for (Element enclosed : typeElement.getEnclosedElements()) {
            if (enclosed.getKind() == ElementKind.FIELD && !enclosed.getModifiers().contains(Modifier.STATIC)) {
                String fieldName = enclosed.getSimpleName().toString();
                String capName = fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
                String rawType = enclosed.asType().toString();

                if (TypeUtils.getProtoType(rawType) != null || TypeUtils.isMap(rawType)) {
                    if ("byte[]".equals(rawType)) {
                        fromWire.addStatement("pojo.set$L(wire.$L.toByteArray())", capName, fieldName);
                    } else {
                        fromWire.addStatement("pojo.set$L(wire.$L)", capName, fieldName);
                    }
                } else if (TypeUtils.isCollection(rawType)) {
                    generateCollectionFromWire(fromWire, fieldName, rawType, capName);
                } else if (isEnum(enclosed.asType())) {
                    fromWire.addStatement("pojo.set$L($T.valueOf(wire.$L.name()))", capName,
                            ClassName.bestGuess(rawType), fieldName);
                } else {
                    // Nested POJO
                    fromWire.addStatement("pojo.set$L(new $TCodec().fromWire(wire.$L))", capName,
                            ClassName.bestGuess(rawType), fieldName);
                }
            }
        }
        fromWire.addStatement("return pojo");
        typeSpec.addMethod(fromWire.build());

        // getWireAdapter method
        ClassName protoAdapter = ClassName.get("com.squareup.wire", "ProtoAdapter");
        ParameterizedTypeName adapterReturn = ParameterizedTypeName.get(protoAdapter, wireType);

        MethodSpec getWireAdapter = MethodSpec.methodBuilder("getWireAdapter")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(adapterReturn)
                .addStatement("return $T.ADAPTER", wireType)
                .build();

        typeSpec.addMethod(getWireAdapter);

        return JavaFile.builder(packageName, typeSpec.build()).build();
    }

    private void generateCollectionToWire(MethodSpec.Builder builder, String fieldName, String rawType,
            String getterPrefix, String capName) {
        String innerType = getInnerType(rawType);
        if (TypeUtils.getProtoType(innerType) != null) {
            if (rawType.endsWith("[]")) {
                builder.addCode("    .$L($T.asList(pojo.$L$L()))\n", fieldName, Arrays.class, getterPrefix, capName);
            } else {
                builder.addCode("    .$L(pojo.$L$L())\n", fieldName, getterPrefix, capName);
            }
        } else {
            // Collection of POJOs
            if (rawType.endsWith("[]")) {
                builder.addCode("    .$L($T.stream(pojo.$L$L())\n", fieldName, Arrays.class, getterPrefix, capName);
            } else {
                builder.addCode("    .$L(pojo.$L$L().stream()\n", fieldName, getterPrefix, capName);
            }
            builder.addCode("        .map(item -> new $TCodec().toWire(item))\n", ClassName.bestGuess(innerType));
            builder.addCode("        .collect($T.toList()))\n", Collectors.class);
        }
    }

    private void generateCollectionFromWire(MethodSpec.Builder builder, String fieldName, String rawType,
            String capName) {
        String innerType = getInnerType(rawType);
        if (TypeUtils.getProtoType(innerType) != null) {
            if (rawType.endsWith("[]")) {
                builder.addStatement("pojo.set$L(wire.$L.toArray(new $T[0]))", capName, fieldName,
                        ClassName.bestGuess(innerType));
            } else if (rawType.startsWith("java.util.Set")) {
                builder.addStatement("pojo.set$L(new $T<>(wire.$L))", capName, java.util.HashSet.class, fieldName);
            } else {
                builder.addStatement("pojo.set$L(wire.$L)", capName, fieldName);
            }
        } else {
            // Collection of POJOs
            builder.addCode("pojo.set$L(wire.$L.stream()\n", capName, fieldName);
            builder.addCode("    .map(item -> new $TCodec().fromWire(item))\n", ClassName.bestGuess(innerType));

            if (rawType.endsWith("[]")) {
                builder.addCode("    .toArray($T[]::new));\n", ClassName.bestGuess(innerType));
            } else if (rawType.startsWith("java.util.Set")) {
                builder.addCode("    .collect($T.toSet()));\n", Collectors.class);
            } else {
                builder.addCode("    .collect($T.toList()));\n", Collectors.class);
            }
        }
    }

    private String getInnerType(String typeName) {
        if (typeName.endsWith("[]")) {
            return typeName.substring(0, typeName.length() - 2);
        }
        int start = typeName.indexOf('<');
        int end = typeName.lastIndexOf('>');
        if (start > 0 && end > start) {
            return typeName.substring(start + 1, end);
        }
        return typeName;
    }

    private boolean isEnum(TypeMirror type) {
        if (type.getKind() == javax.lang.model.type.TypeKind.DECLARED) {
            javax.lang.model.element.Element element = ((javax.lang.model.type.DeclaredType) type).asElement();
            return element.getKind() == javax.lang.model.element.ElementKind.ENUM;
        }
        return false;
    }

    private String getWireTypeName(TypeMirror typeMirror) {
        if (typeMirror.getKind() == javax.lang.model.type.TypeKind.DECLARED) {
            javax.lang.model.element.TypeElement typeElement = (javax.lang.model.element.TypeElement) ((javax.lang.model.type.DeclaredType) typeMirror)
                    .asElement();

            // This logic is slightly flawed for inner enums where enclosing is not package
            // Find package
            Element enclosing = typeElement.getEnclosingElement();
            while (enclosing.getKind() != ElementKind.PACKAGE) {
                enclosing = enclosing.getEnclosingElement();
            }
            String packageName = ((javax.lang.model.element.PackageElement) enclosing).getQualifiedName().toString();

            String simpleName = typeElement.getSimpleName().toString();
            // reconstruct simple name for nested types? e.g. RpcPacket.Type
            // For now simple fix: typeMirror.toString() is FQCN. Use replace to inject
            // .proto
            String fqcn = typeElement.getQualifiedName().toString();
            return fqcn.replace(packageName, packageName + ".proto");
        }
        return typeMirror.toString();
    }
}
