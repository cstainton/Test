package uk.co.instanto.tearay.rpc.processor;

import com.squareup.javapoet.*;
import uk.co.instanto.tearay.rpc.common.serialization.JsonCodec;

import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.element.Modifier;
import javax.lang.model.element.TypeElement;
import javax.lang.model.type.TypeMirror;
import java.util.List;

public class JsonCodecGenerator {

    public JavaFile generate(TypeElement typeElement) {
        String packageName = ((javax.lang.model.element.PackageElement) typeElement.getEnclosingElement())
                .getQualifiedName().toString();
        String className = typeElement.getSimpleName().toString();
        String codecClassName = className + "JsonCodec";

        ParameterizedTypeName codecInterface = ParameterizedTypeName.get(
                ClassName.get(JsonCodec.class),
                ClassName.get(typeElement));

        TypeSpec.Builder typeSpec = TypeSpec.classBuilder(codecClassName)
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(codecInterface);

        // toJson method
        MethodSpec.Builder toJson = MethodSpec.methodBuilder("toJson")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(String.class)
                .addParameter(ClassName.get(typeElement), "object");

        toJson.addStatement("$T sb = new $T()", StringBuilder.class, StringBuilder.class);
        toJson.addStatement("sb.append(\"{\")");

        List<? extends Element> fields = typeElement.getEnclosedElements();
        boolean first = true;
        for (Element field : fields) {
            if (field.getKind() == ElementKind.FIELD && !field.getModifiers().contains(Modifier.STATIC)) {
                if (!first) {
                    toJson.addStatement("sb.append(\",\")");
                }
                String fieldName = field.getSimpleName().toString();
                String getterName = "get" + Character.toUpperCase(fieldName.charAt(0)) + fieldName.substring(1);

                toJson.addStatement("sb.append(\"\\\"$L\\\":\")", fieldName);

                TypeMirror type = field.asType();
                if (type.toString().equals("java.lang.String")) {
                    toJson.addStatement("sb.append(\"\\\"\").append(object.$L()).append(\"\\\"\")", getterName);
                } else if (isPrimitiveOrWrapper(type)) {
                    toJson.addStatement("sb.append(object.$L())", getterName);
                } else if (isEnum(type)) {
                    toJson.addStatement("sb.append(\"\\\"\").append(object.$L().name()).append(\"\\\"\")", getterName);
                } else {
                    // Complex type or Collection
                    toJson.addStatement("sb.append(\"null\")"); // Skip serialization for MVP
                }
                first = false;
            }
        }
        toJson.addStatement("sb.append(\"}\")");
        toJson.addStatement("return sb.toString()");
        typeSpec.addMethod(toJson.build());

        // fromJson method
        MethodSpec.Builder fromJson = MethodSpec.methodBuilder("fromJson")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(ClassName.get(typeElement))
                .addParameter(String.class, "json");

        boolean hasBuilder = typeElement.getEnclosedElements().stream()
                .anyMatch(e -> e.getSimpleName().toString().equals("Builder"));

        if (hasBuilder) {
            fromJson.addStatement("$T.Builder builder = new $T.Builder()", ClassName.get(typeElement),
                    ClassName.get(typeElement));
        } else {
            fromJson.addStatement("$T object = new $T()", ClassName.get(typeElement), ClassName.get(typeElement));
        }

        fromJson.addStatement("json = json.trim()");
        fromJson.addStatement("if (json.startsWith(\"{\")) json = json.substring(1)");
        fromJson.addStatement("if (json.endsWith(\"}\")) json = json.substring(0, json.length() - 1)");

        fromJson.addStatement("String[] pairs = json.split(\",\")");
        fromJson.addStatement("for (String pair : pairs) {");
        fromJson.addStatement("  String[] parts = pair.split(\":\", 2)");
        fromJson.addStatement("  if (parts.length < 2) continue");
        fromJson.addStatement("  String key = parts[0].trim().replace(\"\\\"\", \"\")");
        fromJson.addStatement("  String value = parts[1].trim()");

        for (Element field : fields) {
            if (field.getKind() == ElementKind.FIELD && !field.getModifiers().contains(Modifier.STATIC)) {
                String fieldName = field.getSimpleName().toString();
                String setterName = fieldName;
                TypeMirror type = field.asType();

                fromJson.beginControlFlow("if (key.equals(\"$L\"))", fieldName);

                String valueParse = "null";
                boolean supported = true;

                if (type.toString().equals("java.lang.String")) {
                    valueParse = "value.replace(\"\\\"\", \"\")";
                } else if (type.toString().equals("int") || type.toString().equals("java.lang.Integer")) {
                    valueParse = "Integer.parseInt(value)";
                } else if (type.toString().equals("boolean") || type.toString().equals("java.lang.Boolean")) {
                    valueParse = "Boolean.parseBoolean(value)";
                } else if (type.toString().equals("long") || type.toString().equals("java.lang.Long")) {
                    valueParse = "Long.parseLong(value)";
                } else if (isEnum(type)) {
                    valueParse = ClassName.bestGuess(type.toString()) + ".valueOf(value.replace(\"\\\"\", \"\"))";
                } else {
                    supported = false;
                }

                if (supported) {
                    if (hasBuilder) {
                        fromJson.addStatement("builder.$L($L)", setterName, valueParse);
                    } else {
                        String setMethod = "set" + Character.toUpperCase(fieldName.charAt(0)) + fieldName.substring(1);
                        fromJson.addStatement("object.$L($L)", setMethod, valueParse);
                    }
                } else {
                    fromJson.addComment("Skipping complex type $L", fieldName);
                }
                fromJson.endControlFlow();
            }
        }

        fromJson.addStatement("}"); // end loop

        if (hasBuilder) {
            fromJson.addStatement("return builder.build()");
        } else {
            fromJson.addStatement("return object");
        }
        typeSpec.addMethod(fromJson.build());

        return JavaFile.builder(packageName, typeSpec.build()).build();
    }

    private boolean isPrimitiveOrWrapper(TypeMirror type) {
        String t = type.toString();
        return t.equals("int") || t.equals("java.lang.Integer") ||
                t.equals("long") || t.equals("java.lang.Long") ||
                t.equals("boolean") || t.equals("java.lang.Boolean") ||
                t.equals("double") || t.equals("java.lang.Double") ||
                t.equals("float") || t.equals("java.lang.Float");
    }

    private boolean isEnum(TypeMirror type) {
        if (type.getKind() == javax.lang.model.type.TypeKind.DECLARED) {
            javax.lang.model.element.Element element = ((javax.lang.model.type.DeclaredType) type).asElement();
            return element.getKind() == javax.lang.model.element.ElementKind.ENUM;
        }
        return false;
    }
}
