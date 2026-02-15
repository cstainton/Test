package dev.verrai.rpc.processor;

import com.squareup.javapoet.*;
import dev.verrai.rpc.common.serialization.JsonCodec;

import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.element.Modifier;
import javax.lang.model.element.TypeElement;
import javax.lang.model.type.TypeMirror;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

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
                } else if (type.toString().contains("java.util.Map") && type.toString().replace(" ", "").contains("<java.lang.String,java.lang.String>")) {
                     // Map<String, String> support only for MVP
                    toJson.addStatement("sb.append(\"{\")");
                    toJson.addStatement("boolean firstMap = true");
                    toJson.addStatement("if (object.$L() != null) {", getterName);
                    ParameterizedTypeName entryType = ParameterizedTypeName.get(Map.Entry.class, String.class, String.class);
                    toJson.addStatement("  for ($T entry : object.$L().entrySet()) {", entryType, getterName);
                    toJson.addStatement("    if (!firstMap) sb.append(\",\")");
                    toJson.addStatement("    sb.append(\"\\\"\").append(entry.getKey()).append(\"\\\":\")");
                    // Escape quotes in value
                    toJson.addStatement("    sb.append(\"\\\"\").append(entry.getValue().replace(\"\\\"\", \"\\\\\\\"\")).append(\"\\\"\")");
                    toJson.addStatement("    firstMap = false");
                    toJson.addStatement("  }");
                    toJson.addStatement("}");
                    toJson.addStatement("sb.append(\"}\")");
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

        // Use splitJson instead of split(",")
        fromJson.addStatement("$T<$T> pairs = splitJson(json)", List.class, String.class);
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
                boolean isMap = false;

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
                } else if (type.toString().contains("java.util.Map") && type.toString().replace(" ", "").contains("<java.lang.String,java.lang.String>")) {
                    isMap = true;
                    fromJson.addStatement("value = value.trim()");
                     fromJson.addStatement("if (value.startsWith(\"{\")) value = value.substring(1)");
                     fromJson.addStatement("if (value.endsWith(\"}\")) value = value.substring(0, value.length() - 1)");

                     fromJson.addStatement("$T<$T, $T> map = new $T<>()", Map.class, String.class, String.class, HashMap.class);
                     fromJson.addStatement("$T<$T> entries = splitJson(value)", List.class, String.class);
                     fromJson.addCode("for (String entry : entries) {\n");
                     fromJson.addStatement("  String[] kv = entry.split(\":\", 2)");
                     fromJson.addStatement("  if (kv.length < 2) continue");
                     fromJson.addStatement("  String k = kv[0].trim().replace(\"\\\"\", \"\")");
                     fromJson.addStatement("  String v = kv[1].trim().replace(\"\\\"\", \"\")");
                     fromJson.addStatement("  map.put(k, v)");
                     fromJson.addCode("}\n");

                     if (hasBuilder) {
                        fromJson.addStatement("builder.$L(map)", setterName);
                     } else {
                        String setMethod = "set" + Character.toUpperCase(fieldName.charAt(0)) + fieldName.substring(1);
                        fromJson.addStatement("object.$L(map)", setMethod);
                     }
                } else {
                    supported = false;
                }

                if (supported && !isMap) {
                    if (hasBuilder) {
                        fromJson.addStatement("builder.$L($L)", setterName, valueParse);
                    } else {
                        String setMethod = "set" + Character.toUpperCase(fieldName.charAt(0)) + fieldName.substring(1);
                        fromJson.addStatement("object.$L($L)", setMethod, valueParse);
                    }
                } else if (!supported) {
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

        typeSpec.addMethod(generateSplitJsonMethod());

        return JavaFile.builder(packageName, typeSpec.build()).build();
    }

    private MethodSpec generateSplitJsonMethod() {
        MethodSpec.Builder splitJson = MethodSpec.methodBuilder("splitJson")
                .addModifiers(Modifier.PRIVATE)
                .returns(ParameterizedTypeName.get(List.class, String.class))
                .addParameter(String.class, "json");

        splitJson.addStatement("$T<$T> result = new $T<>()", List.class, String.class, java.util.ArrayList.class);
        splitJson.addStatement("int braceCount = 0");
        splitJson.addStatement("boolean inQuote = false");
        splitJson.addStatement("$T current = new $T()", StringBuilder.class, StringBuilder.class);

        splitJson.addCode("boolean escaped = false;\n");
        splitJson.addCode("for (char c : json.toCharArray()) {\n");
        splitJson.addCode("    if (escaped) {\n");
        splitJson.addCode("        escaped = false;\n");
        splitJson.addCode("        current.append(c);\n");
        splitJson.addCode("        continue;\n");
        splitJson.addCode("    }\n");
        splitJson.addCode("    if (c == '\\\\') {\n");
        splitJson.addCode("        escaped = true;\n");
        splitJson.addCode("        current.append(c);\n");
        splitJson.addCode("        continue;\n");
        splitJson.addCode("    }\n");
        splitJson.addCode("    if (c == '\"') inQuote = !inQuote;\n");
        splitJson.addCode("    if (!inQuote) {\n");
        splitJson.addCode("        if (c == '{' || c == '[') braceCount++;\n");
        splitJson.addCode("        if (c == '}' || c == ']') braceCount--;\n");
        splitJson.addCode("    }\n");
        splitJson.addCode("    if (c == ',' && braceCount == 0 && !inQuote) {\n");
        splitJson.addCode("        result.add(current.toString());\n");
        splitJson.addCode("        current.setLength(0);\n");
        splitJson.addCode("    } else {\n");
        splitJson.addCode("        current.append(c);\n");
        splitJson.addCode("    }\n");
        splitJson.addCode("}\n");
        splitJson.addStatement("result.add(current.toString())");
        splitJson.addStatement("return result");

        return splitJson.build();
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
