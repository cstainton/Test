package dev.verrai.rpc.processor;

import com.squareup.javapoet.*;
import dev.verrai.rpc.common.codec.Codec;

import javax.lang.model.element.*;
import javax.lang.model.type.TypeMirror;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import okio.ByteString;

public class ServiceGenerator {

    private static final ClassName RPC_CLIENT = ClassName.get("uk.co.instanto.client.service", "RpcClient");
    private static final ClassName RPC_PACKET = ClassName.get("uk.co.instanto.client.service.proto", "RpcPacket");
    private static final ClassName SERVICE_DISPATCHER = ClassName.get("uk.co.instanto.client.service.transport",
            "ServiceDispatcher");
    private static final ClassName TRANSPORT = ClassName.get("dev.verrai.rpc.common.transport", "Transport");

    public List<JavaFile> generate(TypeElement typeElement) {
        List<JavaFile> files = new ArrayList<>();
        files.add(generateStub(typeElement));
        files.add(generateDispatcher(typeElement));
        files.add(generateFactory(typeElement));
        return files;
    }

    private JavaFile generateFactory(TypeElement typeElement) {
        String packageName = ((PackageElement) typeElement.getEnclosingElement()).getQualifiedName().toString();
        String simpleName = typeElement.getSimpleName().toString();
        String stubName = simpleName + "_Stub";
        String factoryName = simpleName + "_Factory";
        ClassName serviceType = ClassName.get(typeElement);
        ClassName stubType = ClassName.get(packageName, stubName);
        ClassName factoryInterface = ClassName.get("uk.co.instanto.client.service", "ServiceFactory");

        TypeSpec.Builder typeSpec = TypeSpec.classBuilder(factoryName)
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(ParameterizedTypeName.get(factoryInterface, serviceType));

        MethodSpec.Builder create = MethodSpec.methodBuilder("create")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .addParameter(RPC_CLIENT, "client")
                .returns(serviceType)
                .addStatement("return new $T(client)", stubType);

        typeSpec.addMethod(create.build());

        return JavaFile.builder(packageName, typeSpec.build()).build();
    }

    private JavaFile generateStub(TypeElement typeElement) {
        String packageName = ((PackageElement) typeElement.getEnclosingElement()).getQualifiedName().toString();
        String simpleName = typeElement.getSimpleName().toString();
        String stubName = simpleName + "_Stub";
        ClassName serviceType = ClassName.get(typeElement);

        TypeSpec.Builder typeSpec = TypeSpec.classBuilder(stubName)
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(serviceType);

        // Field: RpcClient
        typeSpec.addField(RPC_CLIENT, "client", Modifier.PRIVATE, Modifier.FINAL);

        // Constructor
        MethodSpec.Builder ctor = MethodSpec.constructorBuilder()
                .addModifiers(Modifier.PUBLIC)
                .addParameter(RPC_CLIENT, "client")
                .addStatement("this.client = client");

        // Register codecs
        Set<String> referencedTypes = new HashSet<>();
        for (Element enclosed : typeElement.getEnclosedElements()) {
            if (enclosed.getKind() == ElementKind.METHOD) {
                ExecutableElement method = (ExecutableElement) enclosed;
                // Params
                for (VariableElement p : method.getParameters()) {
                    String typeName = p.asType().toString();
                    if (TypeUtils.getProtoType(typeName) == null) {
                        referencedTypes.add(typeName);
                    }
                }
                // Return type
                String retType = method.getReturnType().toString();
                if (!retType.equals("void")) {
                    if (retType.startsWith("uk.co.instanto.client.service.AsyncResult") ||
                            retType.startsWith("uk.co.instanto.client.service.AsyncStreamResult")) {
                        // Extract inner type
                        String inner = retType.substring(retType.indexOf('<') + 1, retType.lastIndexOf('>')).trim();
                        if (!inner.equals("java.lang.Void") && !inner.equals("Void")
                                && TypeUtils.getProtoType(inner) == null) {
                            referencedTypes.add(inner);
                        }
                    } else if (TypeUtils.getProtoType(retType) == null) {
                        referencedTypes.add(retType);
                    }
                }
            }
        }

        for (String type : referencedTypes) {
            ClassName typeName = ClassName.bestGuess(type);
            ClassName codecName = ClassName.bestGuess(type + "Codec");
            ctor.addStatement("client.registerCodec($T.class, new $T())", typeName, codecName);
        }
        typeSpec.addMethod(ctor.build());

        // Methods
        for (Element enclosed : typeElement.getEnclosedElements()) {
            if (enclosed.getKind() == ElementKind.METHOD) {
                ExecutableElement method = (ExecutableElement) enclosed;
                MethodSpec.Builder methodBuilder = MethodSpec.overriding(method);

                String methodName = method.getSimpleName().toString();

                StringBuilder args = new StringBuilder("new Object[]{");
                if (!method.getParameters().isEmpty()) {
                    args.append(method.getParameters().get(0).getSimpleName());
                }
                args.append("}");

                javax.lang.model.type.TypeMirror returnType = method.getReturnType();
                if (!returnType.toString().equals("void")) {
                    String retStr = returnType.toString();

                    if (retStr.startsWith("uk.co.instanto.client.service.AsyncStreamResult")) {
                        // Call invokeStreamStub
                        methodBuilder.addStatement("$T rawResult = ($T) client.invokeStreamStub($S, $S, $L)",
                                ParameterizedTypeName.get(
                                        ClassName.get("uk.co.instanto.client.service", "AsyncStreamResult"),
                                        ClassName.get(Object.class)),
                                ParameterizedTypeName.get(
                                        ClassName.get("uk.co.instanto.client.service", "AsyncStreamResult"),
                                        ClassName.get(Object.class)),
                                packageName + "." + simpleName, methodName, args.toString());

                        // Map logic
                        String innerType = retStr.substring(retStr.indexOf('<') + 1, retStr.lastIndexOf('>'));
                        String protoType = TypeUtils.getProtoType(innerType);

                        if (protoType != null) {
                            String adapterStr = TypeUtils.getAdapterType(innerType);
                            methodBuilder.addStatement(
                                    "return rawResult.map(bytes -> { try { return $L.ADAPTER.decode((byte[]) bytes); } catch(Exception e) { throw new RuntimeException(e); } })",
                                    adapterStr.substring(0, adapterStr.lastIndexOf('.')));
                        } else {
                            ClassName retClass = ClassName.bestGuess(innerType);
                            ClassName retCodec = ClassName.bestGuess(innerType + "Codec");
                            String typePackage = innerType.substring(0, innerType.lastIndexOf('.'));
                            ClassName wireType = ClassName.get(typePackage + ".proto", retClass.simpleName());

                            ParameterSpec codecVar = ParameterSpec.builder(
                                    ParameterizedTypeName.get(ClassName.get(Codec.class), retClass, wireType), "codec")
                                    .build();

                            methodBuilder.addStatement("$T codec = new $T()", codecVar.type, retCodec);
                            methodBuilder.addStatement(
                                    "return rawResult.map(bytes -> { try { return codec.fromWire(codec.getWireAdapter().decode((byte[]) bytes)); } catch(Exception e) { throw new RuntimeException(e); } })");
                        }

                    } else if (retStr.startsWith("uk.co.instanto.client.service.AsyncResult")) {
                        // Call invokeStub, which returns AsyncResult<Object>
                        methodBuilder.addStatement("$T rawResult = ($T) client.invokeStub($S, $S, $L)",
                                ParameterizedTypeName.get(ClassName.get("uk.co.instanto.client.service", "AsyncResult"),
                                        ClassName.get(Object.class)),
                                ParameterizedTypeName.get(ClassName.get("uk.co.instanto.client.service", "AsyncResult"),
                                        ClassName.get(Object.class)),
                                packageName + "." + simpleName, methodName, args.toString());

                        // Extract T from AsyncResult<T>
                        String innerType = retStr.substring(retStr.indexOf('<') + 1, retStr.lastIndexOf('>')).trim();

                        String protoType = TypeUtils.getProtoType(innerType);

                        if (protoType != null) {
                            String adapterStr = TypeUtils.getAdapterType(innerType);
                            methodBuilder.addStatement(
                                    "return rawResult.thenApply(bytes -> { try { return $L.ADAPTER.decode((byte[]) bytes); } catch(Exception e) { throw new RuntimeException(e); } })",
                                    adapterStr.substring(0, adapterStr.lastIndexOf('.')));
                        } else if (innerType.equals("java.lang.Void") || innerType.equals("Void")) {
                            methodBuilder.addStatement("return rawResult.thenApply(bytes -> null)");
                        } else {
                            ClassName retClass = ClassName.bestGuess(innerType);
                            ClassName retCodec = ClassName.bestGuess(innerType + "Codec");
                            String typePackage = innerType.substring(0, innerType.lastIndexOf('.'));
                            ClassName wireType = ClassName.get(typePackage + ".proto", retClass.simpleName());

                            ParameterSpec codecVar = ParameterSpec.builder(
                                    ParameterizedTypeName.get(ClassName.get(Codec.class), retClass, wireType), "codec")
                                    .build();

                            methodBuilder.addStatement("$T codec = new $T()", codecVar.type, retCodec);
                            methodBuilder.addStatement(
                                    "return rawResult.thenApply(bytes -> { try { return codec.fromWire(codec.getWireAdapter().decode((byte[]) bytes)); } catch(Exception e) { throw new RuntimeException(e); } })");
                        }
                    } else {
                        // Fallback for non-AsyncResult return types (legacy/blocking, not supported)
                        methodBuilder.addStatement(
                                "throw new UnsupportedOperationException(\"Sync methods not supported\")");
                    }
                }
                typeSpec.addMethod(methodBuilder.build());
            }
        }

        return JavaFile.builder(packageName, typeSpec.build()).build();
    }

    private JavaFile generateDispatcher(TypeElement typeElement) {
        String packageName = ((PackageElement) typeElement.getEnclosingElement()).getQualifiedName().toString();
        String simpleName = typeElement.getSimpleName().toString();
        String dispatcherName = simpleName + "_Dispatcher";
        ClassName serviceType = ClassName.get(typeElement);

        TypeSpec.Builder typeSpec = TypeSpec.classBuilder(dispatcherName)
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(SERVICE_DISPATCHER);

        MethodSpec.Builder dispatch = MethodSpec.methodBuilder("dispatch")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .addParameter(RPC_PACKET, "packet")
                .addParameter(Object.class, "implementation")
                .addParameter(TRANSPORT, "transport");

        dispatch.addStatement("$T service = ($T) implementation", serviceType, serviceType);
        dispatch.addStatement("String methodName = packet.methodName");

        boolean first = true;
        for (Element enclosed : typeElement.getEnclosedElements()) {
            if (enclosed.getKind() == ElementKind.METHOD) {
                ExecutableElement method = (ExecutableElement) enclosed;
                String methodName = method.getSimpleName().toString();

                if (first) {
                    dispatch.beginControlFlow("if ($S.equals(methodName))", methodName);
                } else {
                    dispatch.nextControlFlow("else if ($S.equals(methodName))", methodName);
                }
                first = false;

                // Decode arg
                String invokeArgs = "";
                if (!method.getParameters().isEmpty()) {
                    VariableElement p = method.getParameters().get(0);
                    String paramType = p.asType().toString();
                    String protoType = TypeUtils.getProtoType(paramType);

                    dispatch.beginControlFlow("try");
                    if (protoType != null) {
                        String adapterStr = TypeUtils.getAdapterType(paramType);
                        dispatch.addStatement("service.$L($L.ADAPTER.decode(packet.payload))", methodName,
                                adapterStr.substring(0, adapterStr.lastIndexOf('.')));
                    } else {
                        ClassName paramClass = ClassName.bestGuess(paramType);
                        ClassName paramCodec = ClassName.bestGuess(paramType + "Codec");
                        String typePackage = paramType.substring(0, paramType.lastIndexOf('.'));
                        ClassName wireType = ClassName.get(typePackage + ".proto", paramClass.simpleName());

                        ParameterSpec codecVar = ParameterSpec.builder(
                                ParameterizedTypeName.get(ClassName.get(Codec.class), paramClass, wireType), "codec")
                                .build();

                        dispatch.addStatement("$T codec = new $T()", codecVar.type, paramCodec);
                        dispatch.addStatement("$T wireMsg = codec.getWireAdapter().decode(packet.payload)", wireType);

                        if (method.getReturnType().toString().equals("void")) {
                            dispatch.addStatement("service.$L(codec.fromWire(wireMsg))", methodName);
                            dispatch.beginControlFlow("if (packet.replyTo != null)");
                            dispatch.addStatement(
                                    "$T response = new $T.Builder().type($T.Type.RESPONSE).requestId(packet.requestId).payload($T.EMPTY).build()",
                                    RPC_PACKET, RPC_PACKET, RPC_PACKET, ByteString.class);
                            dispatch.addStatement("transport.send($T.ADAPTER.encode(response))", RPC_PACKET);
                            dispatch.endControlFlow();
                        } else {
                            String retType = method.getReturnType().toString();
                            boolean isAsync = retType.startsWith("uk.co.instanto.client.service.AsyncResult");
                            boolean isStream = retType.startsWith("uk.co.instanto.client.service.AsyncStreamResult");

                            String actualRetType = (isAsync || isStream)
                                    ? retType.substring(retType.indexOf('<') + 1, retType.lastIndexOf('>'))
                                    : retType;

                            if (isStream) {
                                TypeName streamReturnType = ParameterizedTypeName.get(
                                        ClassName.get("uk.co.instanto.client.service", "AsyncStreamResult"),
                                        ClassName.bestGuess(actualRetType));

                                dispatch.addStatement("$T streamResult = service.$L(codec.fromWire(wireMsg))",
                                        streamReturnType, methodName);

                                dispatch.beginControlFlow("if (packet.replyTo != null)");

                                // Subscribe
                                dispatch.addCode("streamResult.subscribe(val -> {\n");
                                dispatch.beginControlFlow("try");
                                dispatch.addStatement("Codec retCodec = new $T()",
                                        ClassName.bestGuess(actualRetType + "Codec"));
                                dispatch.addStatement("transport.send($T.ADAPTER.encode(" +
                                        "new $T.Builder().type($T.Type.STREAM_DATA).requestId(packet.requestId)" +
                                        ".payload($T.of(((com.squareup.wire.Message)retCodec.toWire(val)).encode())).build()))",
                                        RPC_PACKET, RPC_PACKET, RPC_PACKET, ByteString.class);
                                dispatch.nextControlFlow("catch (Exception e)");
                                dispatch.addStatement("e.printStackTrace()");
                                dispatch.endControlFlow();

                                // OnError
                                dispatch.addCode("}, ex -> {\n");
                                dispatch.addStatement("ex.printStackTrace()");
                                dispatch.addStatement("transport.send($T.ADAPTER.encode(" +
                                        "new $T.Builder().type($T.Type.STREAM_ERROR).requestId(packet.requestId).build()))",
                                        RPC_PACKET, RPC_PACKET, RPC_PACKET);

                                // OnComplete
                                dispatch.addCode("}, () -> {\n");
                                dispatch.addStatement("transport.send($T.ADAPTER.encode(" +
                                        "new $T.Builder().type($T.Type.STREAM_COMPLETE).requestId(packet.requestId).build()))",
                                        RPC_PACKET, RPC_PACKET, RPC_PACKET);

                                dispatch.addCode("});\n");

                                dispatch.endControlFlow();

                            } else if (isAsync) {
                                TypeName asyncReturnType = ParameterizedTypeName.get(
                                        ClassName.get("uk.co.instanto.client.service", "AsyncResult"),
                                        ClassName.bestGuess(actualRetType));

                                dispatch.addStatement("$T asyncResult = service.$L(codec.fromWire(wireMsg))",
                                        asyncReturnType, methodName);

                                dispatch.beginControlFlow("if (packet.replyTo != null)");

                                // Success Callback
                                dispatch.addCode("asyncResult.thenAccept(val -> {\n");
                                dispatch.beginControlFlow("try");

                                if (actualRetType.equals("java.lang.Void") || actualRetType.equals("Void")) {
                                    dispatch.addStatement("transport.send($T.ADAPTER.encode(" +
                                            "new $T.Builder().type($T.Type.RESPONSE).requestId(packet.requestId)" +
                                            ".payload($T.EMPTY).build()))",
                                            RPC_PACKET, RPC_PACKET, RPC_PACKET, ByteString.class);
                                } else {
                                    dispatch.addStatement("Codec retCodec = new $T()",
                                            ClassName.bestGuess(actualRetType + "Codec"));
                                    dispatch.addStatement("transport.send($T.ADAPTER.encode(" +
                                            "new $T.Builder().type($T.Type.RESPONSE).requestId(packet.requestId)" +
                                            ".payload($T.of(((com.squareup.wire.Message)retCodec.toWire(val)).encode())).build()))",
                                            RPC_PACKET, RPC_PACKET, RPC_PACKET, ByteString.class);
                                }
                                dispatch.nextControlFlow("catch (Exception e)");
                                dispatch.addStatement("e.printStackTrace()");
                                dispatch.endControlFlow();
                                dispatch.addCode("});\n"); // Closing brace fixed

                                // Error Callback
                                dispatch.addCode("asyncResult.exceptionally(ex -> {\n");
                                dispatch.addStatement("ex.printStackTrace()");
                                dispatch.addStatement("transport.send($T.ADAPTER.encode(" +
                                        "new $T.Builder().type($T.Type.ERROR).requestId(packet.requestId)" +
                                        ".payload($T.encodeUtf8(ex.getMessage() != null ? ex.getMessage() : ex.toString())).build()))",
                                        RPC_PACKET, RPC_PACKET, RPC_PACKET, ByteString.class);
                                dispatch.addStatement("return null");
                                dispatch.addStatement("});");

                                dispatch.endControlFlow();

                            } else {
                                // Sync fallback
                                dispatch.addStatement("$T result = service.$L(codec.fromWire(wireMsg))",
                                        ClassName.bestGuess(retType), methodName);

                                dispatch.beginControlFlow("if (packet.replyTo != null)");
                                dispatch.addStatement("Codec retCodec = new $T()",
                                        ClassName.bestGuess(retType + "Codec"));
                                dispatch.addStatement("transport.send($T.ADAPTER.encode(" +
                                        "new $T.Builder().type($T.Type.RESPONSE).requestId(packet.requestId)" +
                                        ".payload($T.of(((com.squareup.wire.Message)retCodec.toWire(result)).encode())).build()))",
                                        RPC_PACKET, RPC_PACKET, RPC_PACKET, ByteString.class);
                                dispatch.endControlFlow();
                            }
                        }
                    }
                    dispatch.nextControlFlow("catch (Exception e)");
                    dispatch.addStatement("e.printStackTrace()");
                    dispatch.endControlFlow();
                } else {
                    dispatch.addStatement("service.$L()", methodName);
                }
            }
        }
        if (!first) {
            dispatch.endControlFlow();
        }

        typeSpec.addMethod(dispatch.build());
        return JavaFile.builder(packageName, typeSpec.build()).build();
    }
}
