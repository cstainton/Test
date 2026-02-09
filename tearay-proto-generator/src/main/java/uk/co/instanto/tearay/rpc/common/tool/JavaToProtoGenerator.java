package uk.co.instanto.tearay.rpc.common.tool;

import com.github.javaparser.StaticJavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.ImportDeclaration;
import com.github.javaparser.ast.body.ClassOrInterfaceDeclaration;
import com.github.javaparser.ast.body.FieldDeclaration;
import com.github.javaparser.ast.body.MethodDeclaration;
import com.github.javaparser.ast.body.Parameter;
import com.github.javaparser.ast.body.TypeDeclaration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

public class JavaToProtoGenerator {

    private static final Logger logger = LoggerFactory.getLogger(JavaToProtoGenerator.class);

    private final String protoOutputDir;
    private final String sourceRoot;
    private final String codecOutputDir;
    private final Set<String> processedClasses = new HashSet<>();
    private final Queue<String> classesToProcess = new LinkedList<>();

    public JavaToProtoGenerator(String protoOutputDir, String sourceRoot, String codecOutputDir) {
        this.protoOutputDir = protoOutputDir;
        this.sourceRoot = sourceRoot;
        this.codecOutputDir = codecOutputDir;
    }

    public static void main(String[] args) throws IOException {
        if (args.length < 2) {
            logger.error(
                    "Usage: JavaToProtoGenerator <protoOutputDir> <fullyQualifiedClassName> [sourceRoot] [codecOutputDir]");
            System.exit(1);
        }
        String protoOutputDir = args[0];
        String initialClassesInput = args[1];
        String sourceRoot = args.length > 2 ? args[2] : "src/main/java";
        String codecOutputDir = args.length > 3 ? args[3] : protoOutputDir;

        JavaToProtoGenerator generator = new JavaToProtoGenerator(protoOutputDir, sourceRoot, codecOutputDir);
        for (String className : initialClassesInput.split(",")) {
            generator.classesToProcess.add(className.trim());
        }
        generator.run();
    }

    public void run() throws IOException {
        while (!classesToProcess.isEmpty()) {
            String className = classesToProcess.poll();
            if (processedClasses.contains(className))
                continue;
            processClass(className);
            processedClasses.add(className);
        }
    }

    private void processClass(String className) throws IOException {
        try {
            logger.info("Processing class: {}", className);
            String relativePath = className.replace('.', '/') + ".java";
            Path sourcePath = Paths.get(sourceRoot, relativePath);

            if (!Files.exists(sourcePath)) {
                logger.warn("Source file not found: {}", sourcePath);
                return;
            }

            CompilationUnit cu = StaticJavaParser.parse(sourcePath);
            String simpleName = className.substring(className.lastIndexOf('.') + 1);

            Optional<ClassOrInterfaceDeclaration> classDecl = Optional.empty();
            for (TypeDeclaration<?> type : cu.getTypes()) {
                if (type instanceof ClassOrInterfaceDeclaration && type.getNameAsString().equals(simpleName)) {
                    classDecl = Optional.of((ClassOrInterfaceDeclaration) type);
                    break;
                }
            }

            if (classDecl.isPresent()) {
                ClassOrInterfaceDeclaration clazz = classDecl.get();
                String packageName = cu.getPackageDeclaration().map(pd -> pd.getNameAsString()).orElse("");

                if (clazz.isInterface()) {
                    if (clazz.getAnnotationByName("Service").isPresent()) {
                        generateStub(cu, clazz);
                        generateDispatcher(cu, clazz);
                        // Interfaces might reference Portable types in their methods
                        for (MethodDeclaration m : clazz.getMethods()) {
                            discoverTypes(cu, m.getType().asString(), packageName);
                            for (Parameter p : m.getParameters()) {
                                discoverTypes(cu, p.getType().asString(), packageName);
                            }
                        }
                    }
                } else {
                    // Check if this is an @Event or @DTO annotated class
                    boolean isEvent = clazz.getAnnotationByName("Event").isPresent();
                    boolean isPortable = clazz.getAnnotationByName("Portable").isPresent();

                    // Only process classes with @Event or @DTO annotations
                    if (!isEvent && !isPortable) {
                        logger.debug("Skipping class (no @Event or @DTO annotation): {}", className);
                        return;
                    }

                    // 1. Generate Proto
                    String protoContent = generateProto(cu, clazz);

                    File dir = new File(protoOutputDir);
                    if (!dir.exists() && !dir.mkdirs()) {
                    }

                    File protoFile = new File(dir, simpleName + ".proto");
                    try (FileWriter writer = new FileWriter(protoFile)) {
                        writer.write(protoContent);
                    }
                    logger.info(
                            "Generated proto file" + (isEvent ? " (Event)" : isPortable ? " (DTO)" : "") + ": "
                                    + protoFile.getAbsolutePath());

                    // 2. Generate Codec
                    String codecContent = generateCodec(cu, clazz);
                    File codecDir = new File(codecOutputDir, packageName.replace('.', '/'));
                    if (!codecDir.exists() && !codecDir.mkdirs()) {
                    }

                    File codecFile = new File(codecDir, simpleName + "Codec.java");
                    try (FileWriter writer = new FileWriter(codecFile)) {
                        writer.write(codecContent);
                    }
                    logger.info(
                            "Generated codec file" + (isEvent ? " (Event)" : isPortable ? " (DTO)" : "") + ": "
                                    + codecFile.getAbsolutePath());

                    // Discover nested POJOs in fields
                    for (FieldDeclaration field : clazz.getFields()) {
                        if (field.isStatic())
                            continue;
                        discoverTypes(cu, field.getElementType().asString(), packageName);
                    }
                }
            }
        } catch (Exception e) {
            logger.error("Error processing class: {}", className, e);
        }
    }

    private void discoverTypes(CompilationUnit cu, String typeName, String currentPackage) {
        if (typeName.startsWith("List<") || typeName.startsWith("Set<")) {
            String innerType = typeName.substring(typeName.indexOf('<') + 1, typeName.lastIndexOf('>'));
            discoverTypes(cu, innerType, currentPackage);
            return;
        }
        if (typeName.endsWith("[]")) {
            String innerType = typeName.substring(0, typeName.length() - 2);
            discoverTypes(cu, innerType, currentPackage);
            return;
        }
        if (getProtoType(typeName) == null && !typeName.startsWith("Map<") && !typeName.equals("void")) {
            // Resolve type name using imports
            String fqcn = resolveTypeName(cu, typeName, currentPackage);
            if (!processedClasses.contains(fqcn)) {
                classesToProcess.add(fqcn);
            }
        }
    }

    private String resolveTypeName(CompilationUnit cu, String typeName, String currentPackage) {
        // If already fully qualified, use as-is
        if (typeName.indexOf('.') > 0) {
            return typeName;
        }
        // Check imports for matching type
        for (ImportDeclaration imp : cu.getImports()) {
            if (imp.isAsterisk()) {
                // Wildcard import like "import pkg.dto.*"
                String importPackage = imp.getNameAsString();
                String candidate = importPackage + "." + typeName;
                String relativePath = candidate.replace('.', '/') + ".java";
                Path sourcePath = Paths.get(sourceRoot, relativePath);
                if (Files.exists(sourcePath)) {
                    return candidate;
                }
            } else {
                // Specific import like "import pkg.dto.MyType"
                String importName = imp.getNameAsString();
                if (importName.endsWith("." + typeName)) {
                    return importName;
                }
            }
        }
        // Fall back to current package
        return currentPackage + "." + typeName;
    }

    private void generateStub(CompilationUnit cu, ClassOrInterfaceDeclaration clazz) throws IOException {
        String simpleName = clazz.getNameAsString();
        String stubName = simpleName + "_Stub";
        String packageName = cu.getPackageDeclaration().map(pd -> pd.getNameAsString()).orElse("default");

        StringBuilder sb = new StringBuilder();
        sb.append("package ").append(packageName).append(";\n\n");
        sb.append("import uk.co.instanto.client.service.RpcClient;\n");
        sb.append("import uk.co.instanto.tearay.rpc.common.codec.Codec;\n");
        sb.append("import java.util.HashMap;\n");
        // Add wildcard import for .dto package if it exists
        sb.append("import ").append(packageName).append(".dto.*;\n\n");

        sb.append("public class ").append(stubName).append(" implements ").append(simpleName).append(" {\n");
        sb.append("    private final RpcClient client;\n\n");
        sb.append("    public ").append(stubName).append("(RpcClient client) {\n");
        sb.append("        this.client = client;\n");

        Set<String> referencedTypes = new HashSet<>();
        for (MethodDeclaration m : clazz.getMethods()) {
            for (Parameter p : m.getParameters()) {
                String typeName = p.getType().asString();
                if (getProtoType(typeName) == null) {
                    referencedTypes.add(typeName);
                }
            }
            String retType = m.getType().asString();
            if (getProtoType(retType) == null && !retType.equals("void")) {
                referencedTypes.add(retType);
            }
        }

        for (String type : referencedTypes) {
            sb.append("        client.registerCodec(").append(type).append(".class, new ").append(type)
                    .append("Codec());\n");
        }

        sb.append("    }\n\n");

        for (MethodDeclaration m : clazz.getMethods()) {
            sb.append("    @Override\n");
            sb.append("    public ").append(m.getType().asString()).append(" ").append(m.getNameAsString()).append("(");
            if (!m.getParameters().isEmpty()) {
                Parameter p = m.getParameter(0);
                sb.append(p.getType().asString()).append(" ").append(p.getNameAsString());
            }
            sb.append(") {\n");
            sb.append("        Object result = client.invokeStub(\"").append(packageName).append(".").append(simpleName)
                    .append("\", \"")
                    .append(m.getNameAsString()).append("\", new Object[]{");
            if (!m.getParameters().isEmpty()) {
                sb.append(m.getParameter(0).getNameAsString());
            }
            sb.append("});\n");
            if (!m.getType().isVoidType()) {
                String typeName = m.getType().asString();
                String protoType = getProtoType(typeName);
                if (protoType != null) {
                    String adapterType = getAdapterType(typeName);
                    sb.append("        try {\n");
                    sb.append("            return ").append(adapterType).append(".ADAPTER.decode((byte[]) result);\n");
                    sb.append("        } catch (Exception e) { throw new RuntimeException(e); }\n");
                } else {
                    // Resolve the actual package of the type using imports
                    String resolvedFqcn = resolveTypeName(cu, typeName, packageName);
                    String typePackage = resolvedFqcn.substring(0, resolvedFqcn.lastIndexOf('.'));
                    sb.append("        try {\n");
                    sb.append("            Codec<").append(typeName).append(", ").append(typePackage).append(".proto.")
                            .append(typeName).append("> codec = new ").append(typeName).append("Codec();\n");
                    sb.append("            return codec.fromWire(codec.getWireAdapter().decode((byte[]) result));\n");
                    sb.append("        } catch (Exception e) { throw new RuntimeException(e); }\n");
                }
            }
            sb.append("    }\n\n");
        }

        sb.append("}\n");

        File dir = new File(codecOutputDir, packageName.replace('.', '/'));
        if (!dir.exists() && !dir.mkdirs()) {
        }
        File stubFile = new File(dir, stubName + ".java");
        try (FileWriter writer = new FileWriter(stubFile)) {
            writer.write(sb.toString());
        }
    }

    private void generateDispatcher(CompilationUnit cu, ClassOrInterfaceDeclaration clazz) throws IOException {
        String simpleName = clazz.getNameAsString();
        String dispatcherName = simpleName + "_Dispatcher";
        String packageName = cu.getPackageDeclaration().map(pd -> pd.getNameAsString()).orElse("default");

        StringBuilder sb = new StringBuilder();
        sb.append("package ").append(packageName).append(";\n\n");
        sb.append("import uk.co.instanto.client.service.RpcServer;\n");
        sb.append("import uk.co.instanto.client.service.proto.RpcPacket;\n");
        sb.append("import uk.co.instanto.tearay.rpc.common.transport.ServiceDispatcher;\n");
        sb.append("import uk.co.instanto.tearay.rpc.common.codec.Codec;\n");
        sb.append("import com.squareup.wire.Message;\n");
        sb.append("import com.squareup.wire.ProtoAdapter;\n");
        sb.append("import okio.ByteString;\n");
        sb.append("import uk.co.instanto.tearay.rpc.common.transport.Transport;\n");
        // Add wildcard import for .dto package if it exists
        sb.append("import ").append(packageName).append(".dto.*;\n\n");

        sb.append("public class ").append(dispatcherName).append(" implements ServiceDispatcher {\n\n");

        sb.append("    @Override\n");
        sb.append("    public void dispatch(RpcPacket packet, Object implementation, Transport transport) {\n");
        sb.append("        ").append(simpleName).append(" service = (").append(simpleName)
                .append(") implementation;\n");
        sb.append("        String methodName = packet.methodName;\n\n");

        boolean first = true;
        for (MethodDeclaration m : clazz.getMethods()) {
            if (!first)
                sb.append(" else ");
            first = false;

            sb.append("        if (\"").append(m.getNameAsString()).append("\".equals(methodName)) {\n");
            if (m.getParameters().isEmpty()) {
                sb.append("            service.").append(m.getNameAsString()).append("();\n");
            } else {
                Parameter p = m.getParameter(0);
                String typeName = p.getType().asString();
                String protoType = getProtoType(typeName);

                if (protoType != null) {
                    String adapterType = getAdapterType(typeName);
                    sb.append("            try {\n");
                    sb.append("                service.").append(m.getNameAsString()).append("(")
                            .append(adapterType).append(".ADAPTER.decode(packet.payload));\n");
                    sb.append("            } catch (Exception e) { e.printStackTrace(); }\n");
                } else {
                    // Resolve the actual package of the type using imports
                    String resolvedFqcn = resolveTypeName(cu, typeName, packageName);
                    String typePackage = resolvedFqcn.substring(0, resolvedFqcn.lastIndexOf('.'));
                    String wireType = typePackage + ".proto." + typeName;
                    sb.append("            try {\n");
                    sb.append("                Codec<").append(typeName).append(", ").append(wireType)
                            .append("> codec = new ").append(typeName).append("Codec();\n");
                    sb.append("                ").append(wireType)
                            .append(" wireMsg = codec.getWireAdapter().decode(packet.payload);\n");

                    if (m.getType().isVoidType()) {
                        sb.append("                service.").append(m.getNameAsString())
                                .append("(codec.fromWire(wireMsg));\n");
                        sb.append("                if (packet.replyTo != null) {\n");
                        sb.append("                    RpcPacket response = new RpcPacket.Builder()\n");
                        sb.append("                        .type(RpcPacket.Type.RESPONSE)\n");
                        sb.append("                        .requestId(packet.requestId)\n");
                        sb.append("                        .payload(ByteString.EMPTY)\n");
                        sb.append("                        .build();\n");
                        sb.append("                    transport.send(RpcPacket.ADAPTER.encode(response));\n");
                        sb.append("                }\n");
                    } else {
                        String retType = m.getType().asString();
                        sb.append("                ").append(retType).append(" result = service.")
                                .append(m.getNameAsString()).append("(codec.fromWire(wireMsg));\n");
                        sb.append("                if (packet.replyTo != null) {\n");
                        sb.append("                    Codec retCodec = new ").append(retType).append("Codec();\n");
                        sb.append("                    RpcPacket response = new RpcPacket.Builder()\n");
                        sb.append("                        .type(RpcPacket.Type.RESPONSE)\n");
                        sb.append("                        .requestId(packet.requestId)\n");
                        sb.append(
                                "                        .payload(ByteString.of(retCodec.getWireAdapter().encode((Message)retCodec.toWire(result))))\n");
                        sb.append("                        .build();\n");
                        sb.append("                    transport.send(RpcPacket.ADAPTER.encode(response));\n");
                        sb.append("                }\n");
                    }
                    sb.append("            } catch (Exception e) { e.printStackTrace(); }\n");
                }
            }
            sb.append("        }");
        }
        sb.append("\n    }\n");
        sb.append("}\n");

        File dir = new File(codecOutputDir, packageName.replace('.', '/'));
        if (!dir.exists() && !dir.mkdirs()) {
        }
        File dispatcherFile = new File(dir, dispatcherName + ".java");
        try (FileWriter writer = new FileWriter(dispatcherFile)) {
            writer.write(sb.toString());
        }
    }

    private String generateCodec(CompilationUnit cu, ClassOrInterfaceDeclaration clazz) {
        StringBuilder sb = new StringBuilder();
        String packageName = cu.getPackageDeclaration().map(pd -> pd.getNameAsString()).orElse("default");
        String protoPackage = packageName + ".proto";
        String simpleName = clazz.getNameAsString();
        String wireClassName = protoPackage + "." + simpleName;

        sb.append("package ").append(packageName).append(";\n\n");
        sb.append("import uk.co.instanto.tearay.rpc.common.codec.Codec;\n");
        sb.append("import com.squareup.wire.ProtoAdapter;\n");

        // If this is in a .dto package, we need to import the POJO class
        if (packageName.endsWith(".dto")) {
            // The codec is generated in the parent package, so import from .dto
            sb.append("import ").append(packageName).append(".").append(simpleName).append(";\n");
        }
        sb.append("\n");

        sb.append("public class ").append(simpleName).append("Codec implements Codec<").append(simpleName).append(", ")
                .append(wireClassName).append("> {\n\n");

        sb.append("    @Override\n");
        sb.append("    public ").append(wireClassName).append(" toWire(").append(simpleName).append(" pojo) {\n");
        sb.append("        if (pojo == null) return null;\n");
        sb.append("        return new ").append(wireClassName).append(".Builder()\n");
        for (FieldDeclaration field : clazz.getFields()) {
            if (field.isStatic())
                continue;
            String name = field.getVariable(0).getNameAsString();
            String capName = name.substring(0, 1).toUpperCase() + name.substring(1);
            String rawType = field.getVariable(0).getType().asString();
            String getterPrefix = (rawType.equalsIgnoreCase("boolean")) ? "is" : "get";

            if (getProtoType(rawType) != null || rawType.startsWith("Map<")) {
                sb.append("            .").append(name).append("(pojo.").append(getterPrefix).append(capName)
                        .append("())\n");
            } else if (rawType.startsWith("List<") || rawType.startsWith("Set<") || rawType.endsWith("[]")) {
                String innerType;
                if (rawType.endsWith("[]")) {
                    innerType = rawType.substring(0, rawType.length() - 2);
                } else {
                    innerType = rawType.substring(rawType.indexOf('<') + 1, rawType.lastIndexOf('>'));
                }

                if (getProtoType(innerType) != null) {
                    if (rawType.endsWith("[]")) {
                        sb.append("            .").append(name).append("(java.util.Arrays.asList(pojo.")
                                .append(getterPrefix).append(capName)
                                .append("()))\n");
                    } else {
                        sb.append("            .").append(name).append("(pojo.").append(getterPrefix).append(capName)
                                .append("())\n");
                    }
                } else {
                    if (rawType.endsWith("[]")) {
                        sb.append("            .").append(name).append("(java.util.Arrays.stream(pojo.")
                                .append(getterPrefix).append(capName)
                                .append("()).map(item -> new ").append(innerType)
                                .append("Codec().toWire(item)).collect(java.util.stream.Collectors.toList()))\n");
                    } else {
                        sb.append("            .").append(name).append("(pojo.").append(getterPrefix).append(capName)
                                .append("().stream().map(item -> new ").append(innerType)
                                .append("Codec().toWire(item)).collect(java.util.stream.Collectors.toList()))\n");
                    }
                }
            } else {
                // Nested POJO
                sb.append("            .").append(name).append("(new ").append(rawType).append("Codec().toWire(pojo.")
                        .append(getterPrefix).append(capName).append("()))\n");
            }
        }
        sb.append("            .build();\n");
        sb.append("    }\n\n");

        sb.append("    @Override\n");
        sb.append("    public ").append(simpleName).append(" fromWire(").append(wireClassName).append(" wire) {\n");
        sb.append("        if (wire == null) return null;\n");
        sb.append("        ").append(simpleName).append(" pojo = new ").append(simpleName).append("();\n");
        for (FieldDeclaration field : clazz.getFields()) {
            if (field.isStatic())
                continue;
            String name = field.getVariable(0).getNameAsString();
            String capName = name.substring(0, 1).toUpperCase() + name.substring(1);
            String rawType = field.getVariable(0).getType().asString();

            if (getProtoType(rawType) != null || rawType.startsWith("Map<")) {
                sb.append("        pojo.set").append(capName).append("(wire.").append(name).append(");\n");
            } else if (rawType.startsWith("List<") || rawType.startsWith("Set<") || rawType.endsWith("[]")) {
                String innerType;
                if (rawType.endsWith("[]")) {
                    innerType = rawType.substring(0, rawType.length() - 2);
                } else {
                    innerType = rawType.substring(rawType.indexOf('<') + 1, rawType.lastIndexOf('>'));
                }

                if (getProtoType(innerType) != null) {
                    if (rawType.endsWith("[]")) {
                        sb.append("        pojo.set").append(capName).append("(wire.").append(name)
                                .append(".toArray(new ").append(innerType).append("[0]));\n");
                    } else if (rawType.startsWith("Set<")) {
                        sb.append("        pojo.set").append(capName).append("(new java.util.HashSet<>(wire.")
                                .append(name).append("));\n");
                    } else {
                        sb.append("        pojo.set").append(capName).append("(wire.").append(name).append(");\n");
                    }
                } else {
                    if (rawType.endsWith("[]")) {
                        sb.append("        pojo.set").append(capName).append("(wire.").append(name)
                                .append(".stream().map(item -> new ").append(innerType)
                                .append("Codec().fromWire(item)).toArray(").append(innerType).append("[]::new));\n");
                    } else if (rawType.startsWith("Set<")) {
                        sb.append("        pojo.set").append(capName).append("(wire.").append(name)
                                .append(".stream().map(item -> new ").append(innerType)
                                .append("Codec().fromWire(item)).collect(java.util.stream.Collectors.toSet()));\n");
                    } else {
                        sb.append("        pojo.set").append(capName).append("(wire.").append(name)
                                .append(".stream().map(item -> new ").append(innerType)
                                .append("Codec().fromWire(item)).collect(java.util.stream.Collectors.toList()));\n");
                    }
                }
            } else {
                // Nested POJO
                sb.append("        pojo.set").append(capName).append("(new ").append(rawType)
                        .append("Codec().fromWire(wire.").append(name).append("));\n");
            }
        }
        sb.append("        return pojo;\n");
        sb.append("    }\n\n");

        sb.append("    @Override\n");
        sb.append("    public ProtoAdapter<").append(wireClassName).append("> getWireAdapter() {\n");
        sb.append("        return ").append(wireClassName).append(".ADAPTER;\n");
        sb.append("    }\n");

        sb.append("}\n");
        return sb.toString();
    }

    private String generateProto(CompilationUnit cu, ClassOrInterfaceDeclaration clazz) {
        StringBuilder sb = new StringBuilder();
        sb.append("syntax = \"proto3\";\n\n");
        String packageName = cu.getPackageDeclaration().map(pd -> pd.getNameAsString()).orElse("default");
        String protoPackage = packageName + ".proto";
        sb.append("package ").append(protoPackage).append(";\n");
        sb.append("option java_package = \"").append(protoPackage).append("\";\n\n");

        // Add imports for nested POJOs
        Set<String> nestedTypes = new HashSet<>();
        for (FieldDeclaration field : clazz.getFields()) {
            if (field.isStatic())
                continue;
            String rawType = field.getVariable(0).getType().asString();
            if (rawType.startsWith("List<") || rawType.startsWith("Set<") || rawType.endsWith("[]")) {
                String innerType;
                if (rawType.endsWith("[]")) {
                    innerType = rawType.substring(0, rawType.length() - 2);
                } else {
                    innerType = rawType.substring(rawType.indexOf('<') + 1, rawType.lastIndexOf('>'));
                }
                if (getProtoType(innerType) == null) {
                    nestedTypes.add(innerType);
                }
            } else if (getProtoType(rawType) == null && !rawType.startsWith("Map<")) {
                nestedTypes.add(rawType);
            }
        }
        for (String nestedType : nestedTypes) {
            sb.append("import \"").append(nestedType).append(".proto\";\n");
        }
        if (!nestedTypes.isEmpty()) {
            sb.append("\n");
        }

        sb.append("message ").append(clazz.getNameAsString()).append(" {\n");

        int index = 1;
        for (FieldDeclaration field : clazz.getFields()) {
            if (field.isStatic())
                continue;
            String rawType = field.getVariable(0).getType().asString();
            String type = getProtoType(rawType);
            String name = field.getVariable(0).getNameAsString();
            if (type != null) {
                sb.append("  ").append(type).append(" ").append(name).append(" = ").append(index++).append(";\n");
            } else if (rawType.startsWith("Map<")) {
                sb.append("  map<string, string> ").append(name).append(" = ").append(index++).append(";\n");
            } else if (rawType.startsWith("List<") || rawType.startsWith("Set<") || rawType.endsWith("[]")) {
                String innerType;
                if (rawType.endsWith("[]")) {
                    innerType = rawType.substring(0, rawType.length() - 2);
                } else {
                    innerType = rawType.substring(rawType.indexOf('<') + 1, rawType.lastIndexOf('>'));
                }
                String protoInnerType = getProtoType(innerType);
                if (protoInnerType == null)
                    protoInnerType = innerType;
                sb.append("  repeated ").append(protoInnerType).append(" ").append(name).append(" = ").append(index++)
                        .append(";\n");
            } else {
                // Nested POJO
                sb.append("  ").append(rawType).append(" ").append(name).append(" = ").append(index++).append(";\n");
            }
        }
        sb.append("}\n");
        return sb.toString();
    }

    private static String getProtoType(String type) {
        switch (type) {
            case "String":
                return "string";
            case "int":
            case "Integer":
                return "int32";
            case "long":
            case "Long":
                return "int64";
            case "boolean":
            case "Boolean":
                return "bool";
            case "double":
            case "Double":
                return "double";
            case "float":
            case "Float":
                return "float";
        }
        return null;
    }

    private static String getAdapterType(String type) {
        switch (type) {
            case "String":
                return "ProtoAdapter.STRING";
            case "int":
            case "Integer":
                return "ProtoAdapter.INT32";
            case "long":
            case "Long":
                return "ProtoAdapter.INT64";
            case "boolean":
            case "Boolean":
                return "ProtoAdapter.BOOL";
            case "double":
            case "Double":
                return "ProtoAdapter.DOUBLE";
            case "float":
            case "Float":
                return "ProtoAdapter.FLOAT";
        }
        return null;
    }
}
