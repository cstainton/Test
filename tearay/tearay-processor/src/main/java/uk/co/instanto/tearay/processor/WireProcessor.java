package uk.co.instanto.tearay.processor;

import com.squareup.javapoet.*;
import uk.co.instanto.tearay.api.wire.*;
import com.squareup.wire.ProtoWriter;
import com.squareup.wire.ProtoReader;
import com.squareup.wire.FieldEncoding;
import java.io.IOException;

import javax.annotation.processing.*;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.*;
import javax.lang.model.type.*;
import javax.lang.model.util.*;
import javax.tools.Diagnostic;
import java.util.*;

@SupportedAnnotationTypes("uk.co.instanto.tearay.api.wire.Proto")
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
             addEncodeStatement(encodeFields, field.asType(), "value." + fieldName);
        }
        typeSpec.addMethod(encodeFields.build());

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
                addDecodeStatement(decodeFields, field.asType(), "value." + fieldName);
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
             if (type.getKind() == TypeKind.INT) {
                 encodeProto.addStatement("writer.writeVarint32($L, $L)", id, "value." + field.getSimpleName());
             } else if (type.getKind() == TypeKind.BOOLEAN) {
                 encodeProto.addStatement("writer.writeVarint32($L, value.$L ? 1 : 0)", id, field.getSimpleName());
             } else if (isString(type)) {
                 encodeProto.addStatement("writer.writeString($L, value.$L)", id, field.getSimpleName());
             } else if (isList(type)) {
                 encodeProto.beginControlFlow("if (value.$L != null)", field.getSimpleName());
                 encodeProto.beginControlFlow("for (String item : value.$L)", field.getSimpleName());
                 encodeProto.addStatement("writer.writeString($L, item)", id);
                 encodeProto.endControlFlow();
                 encodeProto.endControlFlow();
             }
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
            decodeProto.addStatement("long token = reader.beginMessage()");
            decodeProto.beginControlFlow("for (int tag; (tag = reader.nextTag()) != -1; )");
            decodeProto.beginControlFlow("switch (tag)");

            for (VariableElement field : allFields) {
                 ProtoField protoField = field.getAnnotation(ProtoField.class);
                 if (protoField == null || protoField.id() == 0) continue;

                 decodeProto.addCode("case $L: ", protoField.id());
                 TypeMirror type = field.asType();
                 if (type.getKind() == TypeKind.INT) {
                     decodeProto.addStatement("value.$L = reader.readVarint32()", field.getSimpleName());
                 } else if (type.getKind() == TypeKind.BOOLEAN) {
                     decodeProto.addStatement("value.$L = reader.readVarint32() != 0", field.getSimpleName());
                 } else if (isString(type)) {
                     decodeProto.addStatement("value.$L = reader.readString()", field.getSimpleName());
                 } else if (isList(type)) {
                     decodeProto.beginControlFlow("if (value.$L == null) value.$L = new $T<>()", field.getSimpleName(), field.getSimpleName(), ArrayList.class);
                     decodeProto.addStatement("value.$L.add(reader.readString())", field.getSimpleName());
                     decodeProto.endControlFlow();
                 }
                 decodeProto.addStatement("break");
            }

            decodeProto.addCode("default: ");
            decodeProto.addStatement("$T encoding = reader.peekFieldEncoding()", FieldEncoding.class);
            decodeProto.addStatement("encoding.rawProtoAdapter().decode(reader)"); // Just consume/skip, don't store unknown fields for now
            decodeProto.addStatement("break");

            decodeProto.endControlFlow(); // switch
            decodeProto.endControlFlow(); // for
            decodeProto.addStatement("reader.endMessage(token)");
            decodeProto.addStatement("return value");
        }

        typeSpec.addMethod(decodeProto.build());

        JavaFile.builder(packageName, typeSpec.build()).build().writeTo(filer);
    }

    // ... rest of the file
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

    private void addEncodeStatement(MethodSpec.Builder builder, TypeMirror type, String accessor) {
        if (type.getKind().isPrimitive()) {
            builder.addStatement("writer.value($L)", accessor);
        } else if (isString(type)) {
            builder.addStatement("writer.value($L)", accessor);
        } else if (isList(type)) {
             DeclaredType declaredType = (DeclaredType) type;
             TypeMirror elementType = declaredType.getTypeArguments().get(0);
             builder.addStatement("writer.beginArray()");
             builder.beginControlFlow("for ($T item : $L)", elementType, accessor);
             addEncodeStatement(builder, elementType, "item");
             builder.endControlFlow();
             builder.addStatement("writer.endArray()");
        } else {
             builder.addStatement("registry.getCodec($T.class).encode($L, writer)", TypeName.get(type), accessor);
        }
    }

    private void addDecodeStatement(MethodSpec.Builder builder, TypeMirror type, String accessor) {
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
             addDecodeStatement(builder, elementType, "item");
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

    private void generateRegistry() throws IOException {
        String packageName = "uk.co.instanto.tearay.wire.generated";
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
