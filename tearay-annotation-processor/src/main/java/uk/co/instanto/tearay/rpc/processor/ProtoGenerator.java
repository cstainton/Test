package uk.co.instanto.tearay.rpc.processor;

import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.element.PackageElement;
import javax.lang.model.element.TypeElement;
import javax.lang.model.type.DeclaredType;
import javax.lang.model.type.TypeMirror;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ProtoGenerator {

    public String generate(TypeElement typeElement, String packageName) {
        StringBuilder sb = new StringBuilder();
        sb.append("syntax = \"proto3\";\n\n");
        sb.append("package ").append(packageName).append(";\n");
        sb.append("option java_package = \"").append(packageName).append("\";\n\n");

        // Imports
        Set<String> imports = discoverImports(typeElement);
        for (String imp : imports) {
            int lastDot = imp.lastIndexOf('.');
            String pkg = (lastDot > 0) ? imp.substring(0, lastDot) : "";
            String simple = (lastDot > 0) ? imp.substring(lastDot + 1) : imp;

            // Assume the proto is in {pkg}.proto package
            // This relies on the convention established in TearayProcessor
            String protoPkg = pkg + ".proto";
            String path = protoPkg.replace('.', '/') + "/" + simple + ".proto";

            sb.append("import \"").append(path).append("\";\n");
        }
        if (!imports.isEmpty()) {
            sb.append("\n");
        }

        sb.append("message ").append(typeElement.getSimpleName()).append(" {\n");

        // Check for inner enums first
        for (Element enclosed : typeElement.getEnclosedElements()) {
            if (enclosed.getKind() == ElementKind.ENUM) {
                generateEnum((TypeElement) enclosed, sb);
            }
        }

        int index = 1;
        for (Element enclosed : typeElement.getEnclosedElements()) {
            if (enclosed.getKind() == ElementKind.FIELD) {
                // Skip static fields
                if (enclosed.getModifiers().contains(javax.lang.model.element.Modifier.STATIC)) {
                    continue;
                }

                String fieldName = enclosed.getSimpleName().toString();
                TypeMirror typeMirror = enclosed.asType();
                String typeName = typeMirror.toString();

                String protoType = TypeUtils.getProtoType(typeName);

                if (protoType != null) {
                    sb.append("  ").append(protoType).append(" ").append(fieldName).append(" = ")
                            .append(index++)
                            .append(";\n");
                } else if (TypeUtils.isMap(typeName)) {
                    // Start of rudimentary map support - assuming <String, String> for now
                    // Maps cannot be optional
                    sb.append("  map<string, string> ").append(fieldName).append(" = ").append(index++).append(";\n");
                } else if (TypeUtils.isCollection(typeName)) {
                    String innerType = getInnerType(typeName);
                    String protoInner = TypeUtils.getProtoType(innerType);
                    if (protoInner == null) {
                        // It's a nested message
                        protoInner = getSimpleName(innerType);
                    }
                    sb.append("  repeated ").append(protoInner).append(" ").append(fieldName).append(" = ")
                            .append(index++).append(";\n");
                } else {
                    // Nested message or ENUM usage
                    String simpleName = getSimpleName(typeName);
                    // Check if it matches an inner enum
                    // For now, just rely on simple name match
                    sb.append("  ").append(simpleName).append(" ").append(fieldName).append(" = ")
                            .append(index++)
                            .append(";\n");
                }
            }
        }

        sb.append("}\n");
        return sb.toString();
    }

    private void generateEnum(TypeElement enumElement, StringBuilder sb) {
        sb.append("  enum ").append(enumElement.getSimpleName()).append(" {\n");
        int index = 0;
        for (Element enclosed : enumElement.getEnclosedElements()) {
            if (enclosed.getKind() == ElementKind.ENUM_CONSTANT) {
                sb.append("    ").append(enclosed.getSimpleName()).append(" = ").append(index++).append(";\n");
            }
        }
        sb.append("  }\n");
    }

    private Set<String> discoverImports(TypeElement typeElement) {
        Set<String> imports = new HashSet<>();
        for (Element enclosed : typeElement.getEnclosedElements()) {
            if (enclosed.getKind() == ElementKind.FIELD) {
                if (enclosed.getModifiers().contains(javax.lang.model.element.Modifier.STATIC))
                    continue;

                String typeName = enclosed.asType().toString();
                if (TypeUtils.isCollection(typeName)) {
                    String innerType = getInnerType(typeName);
                    if (TypeUtils.getProtoType(innerType) == null) {
                        // It's a message type, need import
                        // We need fully qualified name to construct import path
                        imports.add(innerType); // innerType is typically FQCN from TypeMirror.toString()??
                        // Wait, getInnerType returns string representation.
                        // If it's FQCN, we can use it.
                    }
                } else if (!TypeUtils.isMap(typeName) && TypeUtils.getProtoType(typeName) == null) {
                    // Check if inner type defined in this class
                    if (!typeName.startsWith(typeElement.getQualifiedName().toString())) {
                        imports.add(typeName);
                    }
                }
            }
        }
        return imports;
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

    // Simplistic getting of simple name from FQCN
    private String getSimpleName(String fqcn) {
        int lastDot = fqcn.lastIndexOf('.');
        if (lastDot > 0) {
            return fqcn.substring(lastDot + 1);
        }
        return fqcn;
    }
}
