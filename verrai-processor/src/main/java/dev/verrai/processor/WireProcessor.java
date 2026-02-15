package dev.verrai.processor;

import com.squareup.javapoet.*;
import dev.verrai.api.wire.*;
import com.squareup.wire.ProtoWriter;
import com.squareup.wire.ProtoReader;
import com.squareup.wire.FieldEncoding;
import okio.ByteString;
import okio.Buffer;
import java.io.IOException;

import javax.annotation.processing.*;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.*;
import javax.lang.model.type.*;
import javax.lang.model.util.*;
import javax.tools.Diagnostic;
import java.util.*;

@SupportedAnnotationTypes("dev.verrai.api.wire.Proto")
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class WireProcessor extends AbstractProcessor {

    private Types typeUtils;
    private Elements elementUtils;
    private Filer filer;
    private Messager messager;

    private final Map<ClassName, ClassName> jsonCodecs = new HashMap<>();
    private final Map<ClassName, ClassName> protoCodecs = new HashMap<>();

    @Override
    public synchronized void init(ProcessingEnvironment processingEnv) {
        super.init(processingEnv);
        typeUtils = processingEnv.getTypeUtils();
        elementUtils = processingEnv.getElementUtils();
        filer = processingEnv.getFiler();
        messager = processingEnv.getMessager();
    }

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        Set<? extends Element> protoElements = roundEnv.getElementsAnnotatedWith(Proto.class);

        for (Element element : protoElements) {
            if (element.getKind() != ElementKind.CLASS) {
                messager.printMessage(Diagnostic.Kind.ERROR, "@Proto only valid on classes", element);
                continue;
            }
            TypeElement typeElement = (TypeElement) element;
            try {
                generateJsonCodec(typeElement);
                generateProtoCodec(typeElement);
            } catch (IOException e) {
                messager.printMessage(Diagnostic.Kind.ERROR, "Error generating codec for " + typeElement + ": " + e.getMessage(), typeElement);
            }
        }

        if (roundEnv.processingOver() && (!jsonCodecs.isEmpty() || !protoCodecs.isEmpty())) {
            try {
                generateRegistry();
            } catch (IOException e) {
                messager.printMessage(Diagnostic.Kind.ERROR, "Error generating registry: " + e.getMessage());
            }
        }

        return true;
    }

    // ... JSON Codec Generation ...
    private void generateJsonCodec(TypeElement typeElement) throws IOException {
        String packageName = elementUtils.getPackageOf(typeElement).getQualifiedName().toString();
        String className = typeElement.getSimpleName().toString();
        ClassName targetClass = ClassName.get(typeElement);
        ClassName codecClass = ClassName.get(packageName, className + "JsonCodec");

        jsonCodecs.put(targetClass, codecClass);

        TypeSpec.Builder typeSpec = TypeSpec.classBuilder(codecClass)
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(ParameterizedTypeName.get(ClassName.get(GeneratedCodec.class), targetClass));

        MethodSpec constructor = MethodSpec.constructorBuilder()
                .addModifiers(Modifier.PUBLIC)
                .addParameter(CodecRegistry.class, "registry")
                .addStatement("this.registry = registry")
                .build();
        typeSpec.addMethod(constructor);
        typeSpec.addField(CodecRegistry.class, "registry", Modifier.PRIVATE, Modifier.FINAL);

        Proto proto = typeElement.getAnnotation(Proto.class);
        List<TypeMirror> subTypes = getSubTypes(proto);
        String typeField = proto.typeField();

        // Encode
        MethodSpec.Builder encode = MethodSpec.methodBuilder("encode")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .addParameter(targetClass, "value")
                .addParameter(JsonWriter.class, "writer")
                .addStatement("if (value == null) { writer.value((String)null); return; }")
                .addStatement("writer.beginObject()");

        if (!subTypes.isEmpty() && !typeField.isEmpty()) {
            encode.addStatement("String type = null");
            for (TypeMirror subType : subTypes) {
                TypeElement subElement = (TypeElement) typeUtils.asElement(subType);
                encode.beginControlFlow("if (value instanceof $T)", TypeName.get(subType));
                encode.addStatement("type = $S", subElement.getSimpleName().toString());
                encode.endControlFlow();
            }
            encode.beginControlFlow("if (type != null)");
            encode.addStatement("writer.name($S)", typeField);
            encode.addStatement("writer.value(type)");
            encode.addStatement("$T codec = registry.getCodec(value.getClass())", Codec.class);
            encode.addStatement("(($T)codec).encodeFields(value, writer)", GeneratedCodec.class);
            encode.endControlFlow();
            encode.beginControlFlow("else");
             encode.addStatement("encodeFields(value, writer)");
            encode.endControlFlow();
        } else {
             encode.addStatement("encodeFields(value, writer)");
        }
        encode.addStatement("writer.endObject()");
        typeSpec.addMethod(encode.build());

        // Decode
        MethodSpec.Builder decode = MethodSpec.methodBuilder("decode")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(targetClass)
                .addParameter(JsonReader.class, "reader")
                .addStatement("reader.beginObject()");

        if (!subTypes.isEmpty() && !typeField.isEmpty()) {
            decode.addStatement("String type = reader.peekString($S)", typeField);
            decode.beginControlFlow("if (type != null)");
            decode.beginControlFlow("switch(type)");
            for (TypeMirror subType : subTypes) {
                TypeElement subElement = (TypeElement) typeUtils.asElement(subType);
                 decode.addCode("case $S:\n", subElement.getSimpleName().toString());
                 decode.addStatement("  $T codec_$L = registry.getCodec($T.class)", Codec.class, subElement.getSimpleName(), TypeName.get(subType));
                 decode.addStatement("  $T val_$L = ($T) (($T)codec_$L).decodeFields(reader)",
                         targetClass, subElement.getSimpleName(), targetClass, GeneratedCodec.class, subElement.getSimpleName());
                 decode.addStatement("  reader.endObject()");
                 decode.addStatement("  return val_$L", subElement.getSimpleName());
            }
            decode.endControlFlow();
            decode.endControlFlow();
        }

        decode.addStatement("$T value = decodeFields(reader)", targetClass);
        decode.addStatement("reader.endObject()");
        decode.addStatement("return value");
        typeSpec.addMethod(decode.build());

        // Encode Fields
        MethodSpec.Builder encodeFields = MethodSpec.methodBuilder("encodeFields")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .addParameter(targetClass, "value")
                .addParameter(JsonWriter.class, "writer");

        List<VariableElement> allFields = getAllFields(typeElement);
        for (VariableElement field : allFields) {
             if (field.getAnnotation(ProtoField.class) == null) continue;
             String fieldName = field.getSimpleName().toString();
             encodeFields.addStatement("writer.name($S)", fieldName);
             addEncodeStatementJson(encodeFields, field.asType(), "value." + fieldName);
        }
        typeSpec.addMethod(encodeFields.build());

        // Decode Fields
        MethodSpec.Builder decodeFields = MethodSpec.methodBuilder("decodeFields")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(targetClass)
                .addParameter(JsonReader.class, "reader");

        if (typeElement.getModifiers().contains(Modifier.ABSTRACT)) {
            decodeFields.addStatement("throw new $T(\"Cannot instantiate abstract class $L\")", UnsupportedOperationException.class, targetClass);
        } else {
            decodeFields.addStatement("$T value = new $T()", targetClass, targetClass);
            decodeFields.beginControlFlow("while (reader.hasNext())");
            decodeFields.addStatement("String name = reader.nextName()");
            decodeFields.beginControlFlow("switch (name)");

            for (VariableElement field : allFields) {
                if (field.getAnnotation(ProtoField.class) == null) continue;
                String fieldName = field.getSimpleName().toString();
                decodeFields.addCode("case $S:\n", fieldName);
                decodeFields.addCode("  ");
                addDecodeStatementJson(decodeFields, field.asType(), "value." + fieldName);
                decodeFields.addStatement("  break");
            }
            if (!typeField.isEmpty()) {
                decodeFields.addCode("case $S: reader.skipValue(); break;\n", typeField);
            }
            decodeFields.addCode("default: reader.skipValue(); break;\n");
            decodeFields.endControlFlow();
            decodeFields.endControlFlow();
            decodeFields.addStatement("return value");
        }
        typeSpec.addMethod(decodeFields.build());

        JavaFile.builder(packageName, typeSpec.build()).build().writeTo(filer);
    }

    // ----------- PROTO CODEC GENERATION -----------

    private void generateProtoCodec(TypeElement typeElement) throws IOException {
        String packageName = elementUtils.getPackageOf(typeElement).getQualifiedName().toString();
        String className = typeElement.getSimpleName().toString();
        ClassName targetClass = ClassName.get(typeElement);
        ClassName codecClass = ClassName.get(packageName, className + "ProtoCodec");

        protoCodecs.put(targetClass, codecClass);

        TypeSpec.Builder typeSpec = TypeSpec.classBuilder(codecClass)
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(ParameterizedTypeName.get(ClassName.get(Codec.class), targetClass));

        MethodSpec constructor = MethodSpec.constructorBuilder()
                .addModifiers(Modifier.PUBLIC)
                .addParameter(CodecRegistry.class, "registry")
                .addStatement("this.registry = registry")
                .build();
        typeSpec.addMethod(constructor);
        typeSpec.addField(CodecRegistry.class, "registry", Modifier.PRIVATE, Modifier.FINAL);

        typeSpec.addMethod(MethodSpec.methodBuilder("encode")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .addParameter(targetClass, "value")
                .addParameter(JsonWriter.class, "writer")
                .addStatement("throw new $T(\"Wrong mode\")", UnsupportedOperationException.class)
                .build());

        typeSpec.addMethod(MethodSpec.methodBuilder("decode")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(targetClass)
                .addParameter(JsonReader.class, "reader")
                .addStatement("throw new $T(\"Wrong mode\")", UnsupportedOperationException.class)
                .build());

        // encode(T, ProtoWriter)
        MethodSpec.Builder encodeProto = MethodSpec.methodBuilder("encode")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .addException(IOException.class)
                .addParameter(targetClass, "value")
                .addParameter(ProtoWriter.class, "writer");

        List<VariableElement> allFields = getAllFields(typeElement);
        for (VariableElement field : allFields) {
             ProtoField protoField = field.getAnnotation(ProtoField.class);
             if (protoField == null) continue;
             int id = protoField.id();
             if (id == 0) continue;

             TypeMirror type = field.asType();
             String accessor = "value." + field.getSimpleName();

             addEncodeStatementProto(encodeProto, type, accessor, protoField);
        }
        typeSpec.addMethod(encodeProto.build());

        // decode(ProtoReader)
        MethodSpec.Builder decodeProto = MethodSpec.methodBuilder("decode")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .addException(IOException.class)
                .returns(targetClass)
                .addParameter(ProtoReader.class, "reader");

        if (typeElement.getModifiers().contains(Modifier.ABSTRACT)) {
             decodeProto.addStatement("throw new $T(\"Cannot instantiate abstract class $L\")", UnsupportedOperationException.class, targetClass);
        } else {
            decodeProto.addStatement("$T value = new $T()", targetClass, targetClass);
            decodeProto.beginControlFlow("for (int tag; (tag = reader.nextTag()) != -1; )");
            decodeProto.beginControlFlow("switch (tag)");

            for (VariableElement field : allFields) {
                 ProtoField protoField = field.getAnnotation(ProtoField.class);
                 if (protoField == null || protoField.id() == 0) continue;

                 decodeProto.addCode("case $L: ", protoField.id());
                 addDecodeStatementProto(decodeProto, field.asType(), "value." + field.getSimpleName(), protoField);
                 decodeProto.addStatement("break");
            }

            decodeProto.addCode("default: ");
            decodeProto.addStatement("$T encoding = reader.peekFieldEncoding()", FieldEncoding.class);
            decodeProto.addStatement("encoding.rawProtoAdapter().decode(reader)");
            // Note: Not adding unknown field to map as we don't have one in DTO
            decodeProto.addStatement("break");

            decodeProto.endControlFlow(); // switch
            decodeProto.endControlFlow(); // for
            decodeProto.addStatement("return value");
        }

        typeSpec.addMethod(decodeProto.build());

        JavaFile.builder(packageName, typeSpec.build()).build().writeTo(filer);
    }

    // ----------- HELPERS -----------

    private void addEncodeStatementProto(MethodSpec.Builder builder, TypeMirror type, String accessor, ProtoField protoField) {
        int id = protoField.id();
        if (type.getKind() == TypeKind.INT) {
             builder.addStatement("writer.writeTag($L, $T.VARINT)", id, FieldEncoding.class);
             builder.addStatement("writer.writeVarint32($L)", accessor);
        } else if (type.getKind() == TypeKind.BOOLEAN) {
             builder.addStatement("writer.writeTag($L, $T.VARINT)", id, FieldEncoding.class);
             builder.addStatement("writer.writeVarint32($L ? 1 : 0)", accessor);
        } else if (isString(type)) {
             builder.addStatement("writer.writeTag($L, $T.LENGTH_DELIMITED)", id, FieldEncoding.class);
             builder.addStatement("writer.writeBytes($T.encodeUtf8($L))", ByteString.class, accessor);
        } else if (isList(type)) {
             // Handle List
             DeclaredType declaredType = (DeclaredType) type;
             TypeMirror elementType = declaredType.getTypeArguments().get(0);

             if (isPrimitiveOrWrapper(elementType)) {
                 boolean packed = protoField.packed();
                 if (packed) {
                     builder.beginControlFlow("if ($L != null)", accessor);
                     builder.addStatement("$T buffer = new $T()", Buffer.class, Buffer.class);
                     builder.addStatement("$T packedWriter = new $T(buffer)", ProtoWriter.class, ProtoWriter.class);
                     builder.beginControlFlow("for ($T item : $L)", elementType, accessor);

                     if (isInteger(elementType)) {
                         builder.addStatement("packedWriter.writeVarint32(item)");
                     } else if (isLong(elementType)) {
                         builder.addStatement("packedWriter.writeVarint64(item)");
                     } else if (isBoolean(elementType)) {
                         builder.addStatement("packedWriter.writeVarint32(item ? 1 : 0)");
                     } else if (isFloat(elementType)) {
                         builder.addStatement("packedWriter.writeFixed32($T.floatToIntBits(item))", Float.class);
                     } else if (isDouble(elementType)) {
                         builder.addStatement("packedWriter.writeFixed64($T.doubleToLongBits(item))", Double.class);
                     }

                     builder.endControlFlow();
                     builder.addStatement("writer.writeTag($L, $T.LENGTH_DELIMITED)", id, FieldEncoding.class);
                     builder.addStatement("writer.writeBytes(buffer.readByteString())");
                     builder.endControlFlow();
                 } else {
                     builder.beginControlFlow("if ($L != null)", accessor);
                     builder.beginControlFlow("for ($T item : $L)", elementType, accessor);

                     if (isInteger(elementType)) {
                         builder.addStatement("writer.writeTag($L, $T.VARINT)", id, FieldEncoding.class);
                         builder.addStatement("writer.writeVarint32(item)");
                     } else if (isLong(elementType)) {
                         builder.addStatement("writer.writeTag($L, $T.VARINT)", id, FieldEncoding.class);
                         builder.addStatement("writer.writeVarint64(item)");
                     } else if (isBoolean(elementType)) {
                         builder.addStatement("writer.writeTag($L, $T.VARINT)", id, FieldEncoding.class);
                         builder.addStatement("writer.writeVarint32(item ? 1 : 0)");
                     } else if (isFloat(elementType)) {
                         builder.addStatement("writer.writeTag($L, $T.FIXED32)", id, FieldEncoding.class);
                         builder.addStatement("writer.writeFixed32($T.floatToIntBits(item))", Float.class);
                     } else if (isDouble(elementType)) {
                         builder.addStatement("writer.writeTag($L, $T.FIXED64)", id, FieldEncoding.class);
                         builder.addStatement("writer.writeFixed64($T.doubleToLongBits(item))", Double.class);
                     }

                     builder.endControlFlow();
                     builder.endControlFlow();
                 }
             } else {
                 builder.beginControlFlow("if ($L != null)", accessor);
                 builder.beginControlFlow("for ($T item : $L)", elementType, accessor);

                 // If item is Proto
                 if (isProto(elementType)) {
                     builder.addStatement("$T buffer = new $T()", Buffer.class, Buffer.class);
                     builder.addStatement("$T nestedWriter = new $T(buffer)", ProtoWriter.class, ProtoWriter.class);
                     builder.addStatement("registry.getCodec($T.class).encode(item, nestedWriter)", TypeName.get(elementType));
                     builder.addStatement("writer.writeTag($L, $T.LENGTH_DELIMITED)", id, FieldEncoding.class);
                     builder.addStatement("writer.writeBytes(buffer.readByteString())");
                 } else if (isString(elementType)) {
                     builder.addStatement("writer.writeTag($L, $T.LENGTH_DELIMITED)", id, FieldEncoding.class);
                     builder.addStatement("writer.writeBytes($T.encodeUtf8(item))", ByteString.class);
                 }

                 builder.endControlFlow();
                 builder.endControlFlow();
             }
        } else if (isProto(type)) {
             // Nested Message
             builder.beginControlFlow("if ($L != null)", accessor);
             builder.addStatement("$T buffer = new $T()", Buffer.class, Buffer.class);
             builder.addStatement("$T nestedWriter = new $T(buffer)", ProtoWriter.class, ProtoWriter.class);
             builder.addStatement("registry.getCodec($T.class).encode($L, nestedWriter)", TypeName.get(type), accessor);
             builder.addStatement("writer.writeTag($L, $T.LENGTH_DELIMITED)", id, FieldEncoding.class);
             builder.addStatement("writer.writeBytes(buffer.readByteString())");
             builder.endControlFlow();
        }
    }

    private void addDecodeStatementProto(MethodSpec.Builder builder, TypeMirror type, String accessor, ProtoField protoField) {
        if (type.getKind() == TypeKind.INT) {
             builder.addStatement("$L = reader.readVarint32()", accessor);
        } else if (type.getKind() == TypeKind.BOOLEAN) {
             builder.addStatement("$L = reader.readVarint32() != 0", accessor);
        } else if (isString(type)) {
             builder.addStatement("$L = reader.readString()", accessor);
        } else if (isList(type)) {
             DeclaredType declaredType = (DeclaredType) type;
             TypeMirror elementType = declaredType.getTypeArguments().get(0);

             builder.addStatement("if ($L == null) $L = new $T<>()", accessor, accessor, ArrayList.class);

             if (isPrimitiveOrWrapper(elementType)) {
                  builder.beginControlFlow("if ($T.LENGTH_DELIMITED.equals(reader.peekFieldEncoding()))", FieldEncoding.class);
                  // Packed
                  builder.addStatement("$T bytes = reader.readBytes()", ByteString.class);
                  builder.addStatement("$T buffer = new $T().write(bytes)", Buffer.class, Buffer.class);
                  builder.addStatement("$T packedReader = new $T(buffer)", ProtoReader.class, ProtoReader.class);
                  builder.beginControlFlow("while (!buffer.exhausted())");

                  if (isInteger(elementType)) {
                      builder.addStatement("$L.add(packedReader.readVarint32())", accessor);
                  } else if (isLong(elementType)) {
                      builder.addStatement("$L.add(packedReader.readVarint64())", accessor);
                  } else if (isBoolean(elementType)) {
                      builder.addStatement("$L.add(packedReader.readVarint32() != 0)", accessor);
                  } else if (isFloat(elementType)) {
                      builder.addStatement("$L.add($T.intBitsToFloat(packedReader.readFixed32()))", accessor, Float.class);
                  } else if (isDouble(elementType)) {
                      builder.addStatement("$L.add($T.longBitsToDouble(packedReader.readFixed64()))", accessor, Double.class);
                  }

                  builder.endControlFlow();
                  builder.nextControlFlow("else");
                  // Unpacked
                  if (isInteger(elementType)) {
                      builder.addStatement("$L.add(reader.readVarint32())", accessor);
                  } else if (isLong(elementType)) {
                      builder.addStatement("$L.add(reader.readVarint64())", accessor);
                  } else if (isBoolean(elementType)) {
                      builder.addStatement("$L.add(reader.readVarint32() != 0)", accessor);
                  } else if (isFloat(elementType)) {
                      builder.addStatement("$L.add($T.intBitsToFloat(reader.readFixed32()))", accessor, Float.class);
                  } else if (isDouble(elementType)) {
                      builder.addStatement("$L.add($T.longBitsToDouble(reader.readFixed64()))", accessor, Double.class);
                  }

                  builder.endControlFlow();
             } else if (isProto(elementType)) {
                 builder.addStatement("long token = reader.beginMessage()");
                 builder.addStatement("$T item = registry.getCodec($T.class).decode(reader)", elementType, TypeName.get(elementType));
                 builder.addStatement("reader.endMessage(token)");
                 builder.addStatement("$L.add(item)", accessor);
             } else if (isString(elementType)) {
                 builder.addStatement("$L.add(reader.readString())", accessor);
             }
        } else if (isProto(type)) {
             // Nested Message
             builder.addStatement("long token = reader.beginMessage()");
             builder.addStatement("$L = registry.getCodec($T.class).decode(reader)", accessor, TypeName.get(type));
             builder.addStatement("reader.endMessage(token)");
        }
    }

    private boolean isProto(TypeMirror type) {
        if (type.getKind() != TypeKind.DECLARED) return false;
        TypeElement element = (TypeElement) ((DeclaredType) type).asElement();
        return element.getAnnotation(Proto.class) != null;
    }

    private List<VariableElement> getAllFields(TypeElement element) {
        List<VariableElement> fields = new ArrayList<>(ElementFilter.fieldsIn(element.getEnclosedElements()));
        TypeMirror superclass = element.getSuperclass();
        if (superclass.getKind() == TypeKind.DECLARED) {
            TypeElement superElement = (TypeElement) ((DeclaredType) superclass).asElement();
            fields.addAll(getAllFields(superElement));
        }
        return fields;
    }

    private List<TypeMirror> getSubTypes(Proto proto) {
        try {
            proto.subTypes();
        } catch (MirroredTypesException e) {
            return (List<TypeMirror>) e.getTypeMirrors();
        }
        return Collections.emptyList();
    }

    private void addEncodeStatementJson(MethodSpec.Builder builder, TypeMirror type, String accessor) {
        if (type.getKind().isPrimitive()) {
            builder.addStatement("writer.value($L)", accessor);
        } else if (isString(type)) {
            builder.addStatement("writer.value($L)", accessor);
        } else if (isList(type)) {
             DeclaredType declaredType = (DeclaredType) type;
             TypeMirror elementType = declaredType.getTypeArguments().get(0);
             builder.addStatement("writer.beginArray()");
             builder.beginControlFlow("for ($T item : $L)", elementType, accessor);
             addEncodeStatementJson(builder, elementType, "item");
             builder.endControlFlow();
             builder.addStatement("writer.endArray()");
        } else {
             builder.addStatement("registry.getCodec($T.class).encode($L, writer)", TypeName.get(type), accessor);
        }
    }

    private void addDecodeStatementJson(MethodSpec.Builder builder, TypeMirror type, String accessor) {
        if (type.getKind() == TypeKind.INT) {
            builder.addStatement("$L = reader.nextInt()", accessor);
        } else if (type.getKind() == TypeKind.DOUBLE) {
            builder.addStatement("$L = reader.nextDouble()", accessor);
        } else if (type.getKind() == TypeKind.BOOLEAN) {
            builder.addStatement("$L = reader.nextBoolean()", accessor);
        } else if (isString(type)) {
            builder.addStatement("$L = reader.nextString()", accessor);
        } else if (isList(type)) {
             DeclaredType declaredType = (DeclaredType) type;
             TypeMirror elementType = declaredType.getTypeArguments().get(0);
             builder.addStatement("$L = new java.util.ArrayList<>()", accessor);
             builder.addStatement("reader.beginArray()");
             builder.beginControlFlow("while (reader.hasNext())");
             builder.addStatement("$T item", elementType);
             addDecodeStatementJson(builder, elementType, "item");
             builder.addStatement("$L.add(item)", accessor);
             builder.endControlFlow();
             builder.addStatement("reader.endArray()");
        } else {
             builder.addStatement("$L = registry.getCodec($T.class).decode(reader)", accessor, TypeName.get(type));
        }
    }

    private boolean isString(TypeMirror type) {
        return type.toString().equals("java.lang.String");
    }

    private boolean isList(TypeMirror type) {
        TypeElement listElement = elementUtils.getTypeElement("java.util.List");
        return typeUtils.isAssignable(typeUtils.erasure(type), typeUtils.erasure(listElement.asType()));
    }

    private boolean isInteger(TypeMirror type) {
        return type.getKind() == TypeKind.INT || type.toString().equals("java.lang.Integer");
    }
    private boolean isLong(TypeMirror type) {
        return type.getKind() == TypeKind.LONG || type.toString().equals("java.lang.Long");
    }
    private boolean isBoolean(TypeMirror type) {
        return type.getKind() == TypeKind.BOOLEAN || type.toString().equals("java.lang.Boolean");
    }
    private boolean isFloat(TypeMirror type) {
        return type.getKind() == TypeKind.FLOAT || type.toString().equals("java.lang.Float");
    }
    private boolean isDouble(TypeMirror type) {
        return type.getKind() == TypeKind.DOUBLE || type.toString().equals("java.lang.Double");
    }

    private boolean isPrimitiveOrWrapper(TypeMirror type) {
        return isInteger(type) || isLong(type) || isBoolean(type) || isFloat(type) || isDouble(type);
    }

    private void generateRegistry() throws IOException {
        String packageName = "dev.verrai.wire.generated";
        ClassName registryClass = ClassName.get(packageName, "WireCodecRegistryImpl");

        TypeSpec.Builder typeSpec = TypeSpec.classBuilder(registryClass)
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(CodecRegistry.class);

        typeSpec.addField(WireMode.class, "mode", Modifier.PRIVATE);

        TypeName mapType = ParameterizedTypeName.get(ClassName.get(Map.class),
                ParameterizedTypeName.get(ClassName.get(Class.class), WildcardTypeName.subtypeOf(Object.class)),
                ParameterizedTypeName.get(ClassName.get(Codec.class), WildcardTypeName.subtypeOf(Object.class)));

        typeSpec.addField(FieldSpec.builder(mapType, "jsonCodecs", Modifier.PRIVATE, Modifier.FINAL)
                .initializer("new $T<>()", HashMap.class).build());

        typeSpec.addField(FieldSpec.builder(mapType, "protoCodecs", Modifier.PRIVATE, Modifier.FINAL)
                .initializer("new $T<>()", HashMap.class).build());

        MethodSpec.Builder constructor = MethodSpec.constructorBuilder()
                .addModifiers(Modifier.PUBLIC);

        constructor.addStatement("this.mode = $T.JSON", WireMode.class);

        for (Map.Entry<ClassName, ClassName> entry : jsonCodecs.entrySet()) {
            constructor.addStatement("jsonCodecs.put($T.class, new $T(this))", entry.getKey(), entry.getValue());
        }
        for (Map.Entry<ClassName, ClassName> entry : protoCodecs.entrySet()) {
            constructor.addStatement("protoCodecs.put($T.class, new $T(this))", entry.getKey(), entry.getValue());
        }

        typeSpec.addMethod(constructor.build());

        typeSpec.addMethod(MethodSpec.methodBuilder("setMode")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .addParameter(WireMode.class, "mode")
                .addStatement("this.mode = mode")
                .build());

        MethodSpec getCodec = MethodSpec.methodBuilder("getCodec")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .addTypeVariable(TypeVariableName.get("T"))
                .returns(ParameterizedTypeName.get(ClassName.get(Codec.class), TypeVariableName.get("T")))
                .addParameter(ParameterizedTypeName.get(ClassName.get(Class.class), TypeVariableName.get("T")), "clazz")
                .beginControlFlow("if (mode == $T.JSON)", WireMode.class)
                .addStatement("return (Codec<T>) jsonCodecs.get(clazz)")
                .endControlFlow()
                .beginControlFlow("else")
                .addStatement("return (Codec<T>) protoCodecs.get(clazz)")
                .endControlFlow()
                .build();

        typeSpec.addMethod(getCodec);

        JavaFile.builder(packageName, typeSpec.build()).build().writeTo(filer);
    }
}
