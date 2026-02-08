package uk.co.instanto.tearay.processor.visitor;

import uk.co.instanto.tearay.api.ApplicationScoped;
import uk.co.instanto.tearay.api.Observes;
import uk.co.instanto.tearay.processor.model.BeanDefinition;
import uk.co.instanto.tearay.processor.model.InjectionPoint;
import com.squareup.javapoet.*;

import javax.annotation.processing.Filer;
import javax.annotation.processing.ProcessingEnvironment;
import javax.lang.model.element.Element;
import javax.lang.model.element.ExecutableElement;
import javax.lang.model.element.Modifier;
import javax.lang.model.element.TypeElement;
import javax.lang.model.element.VariableElement;
import javax.lang.model.type.DeclaredType;
import javax.lang.model.type.TypeMirror;
import javax.tools.Diagnostic;
import java.io.IOException;
import java.util.Map;
import java.util.Set;
import java.util.List;
import java.util.TreeSet;

public class FactoryWriter implements BeanVisitor {

    private final ProcessingEnvironment processingEnv;

    public FactoryWriter(ProcessingEnvironment processingEnv) {
        this.processingEnv = processingEnv;
    }

    @Override
    public void visit(BeanDefinition bean) {
        writeBeanFactory(bean);
        writeProducerFactories(bean);
    }

    private void writeBeanFactory(BeanDefinition bean) {
        TypeElement typeElement = bean.getTypeElement();
        Map<String, String> resolutionMap = bean.getResolutionMap();
        String packageName = processingEnv.getElementUtils().getPackageOf(typeElement).getQualifiedName().toString();
        String factoryName = typeElement.getSimpleName() + "_Factory";
        ClassName typeName = ClassName.get(typeElement);

        TypeSpec.Builder factoryBuilder = TypeSpec.classBuilder(factoryName)
                .addModifiers(Modifier.PUBLIC);

        // Singleton Instance Holder
        if (bean.isSingleton()) {
            factoryBuilder.addField(FieldSpec.builder(typeName, "instance")
                    .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                    .build());
        }

        MethodSpec.Builder getMethod = MethodSpec.methodBuilder("getInstance")
                .addModifiers(Modifier.PUBLIC, Modifier.STATIC)
                .returns(typeName);

        if (bean.isSingleton()) {
            getMethod.beginControlFlow("if (instance == null)")
                    .addStatement("instance = createInstance()")
                    .endControlFlow()
                    .addStatement("return instance");
        } else {
            getMethod.addStatement("return createInstance()");
        }

        factoryBuilder.addMethod(getMethod.build());

        // createInstance method
        MethodSpec.Builder createMethod = MethodSpec.methodBuilder("createInstance")
                .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                .returns(typeName);

        createMethod.addStatement("$T bean = new $T()", typeName, typeName);

        // Injection
        for (InjectionPoint injectionPoint : bean.getInjectionPoints()) {
            VariableElement field = injectionPoint.getField();
            TypeMirror fieldType = injectionPoint.getType();
            Set<String> qualifiers = injectionPoint.getQualifiers();

            String fieldTypeName = fieldType.toString();
            String rawTypeName = fieldTypeName;
            if (rawTypeName.contains("<")) {
                rawTypeName = rawTypeName.substring(0, rawTypeName.indexOf("<"));
            }

            if (rawTypeName.equals("javax.inject.Provider")) {
                handleProviderInjection(createMethod, field, fieldType, resolutionMap, qualifiers);
            } else if (rawTypeName.equals("uk.co.instanto.tearay.api.Event")) {
                handleEventInjection(createMethod, field, fieldType);
            } else {
                handleRegularInjection(createMethod, field, rawTypeName, resolutionMap, qualifiers);
            }
        }

        // Templated Binding
        if (bean.isTemplated()) {
            ClassName binderClass = ClassName.get(packageName, typeElement.getSimpleName() + "_Binder");
            createMethod.addStatement("$T.bind(bean)", binderClass);
        }

        // PostConstruct
        for (ExecutableElement method : bean.getPostConstructMethods()) {
            createMethod.addStatement("bean.$L()", method.getSimpleName());
        }

        // Observes Registration
        for (ExecutableElement method : bean.getObservesMethods()) {
            // Find parameter with @Observes
            for (VariableElement param : method.getParameters()) {
                if (param.getAnnotation(Observes.class) != null) {
                    TypeMirror paramType = param.asType();
                    TypeName eventTypeName = TypeName.get(paramType);
                    createMethod.addStatement("$T.get().register($T.class, (e) -> bean.$L(e))",
                            ClassName.get("uk.co.instanto.tearay.api", "SimpleEventBus"),
                            eventTypeName,
                            method.getSimpleName());
                    break;
                }
            }
        }

        createMethod.addStatement("return bean");
        factoryBuilder.addMethod(createMethod.build());

        writeJavaFile(packageName, factoryBuilder.build(), typeElement);
    }

    private void writeProducerFactories(BeanDefinition bean) {
        TypeElement typeElement = bean.getTypeElement();
        String packageName = processingEnv.getElementUtils().getPackageOf(typeElement).getQualifiedName().toString();

        for (ExecutableElement producerMethod : bean.getProducerMethods()) {
             String factoryName = typeElement.getSimpleName() + "_" + producerMethod.getSimpleName() + "_Factory";
             TypeMirror returnType = producerMethod.getReturnType();
             TypeName returnTypeName = TypeName.get(returnType);

             // Check scope
             boolean isSingleton = producerMethod.getAnnotation(ApplicationScoped.class) != null;

             TypeSpec.Builder factoryBuilder = TypeSpec.classBuilder(factoryName)
                .addModifiers(Modifier.PUBLIC);

             if (isSingleton) {
                factoryBuilder.addField(FieldSpec.builder(returnTypeName, "instance")
                        .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                        .build());
             }

            MethodSpec.Builder getMethod = MethodSpec.methodBuilder("getInstance")
                    .addModifiers(Modifier.PUBLIC, Modifier.STATIC)
                    .returns(returnTypeName);

            if (isSingleton) {
                getMethod.beginControlFlow("if (instance == null)")
                        .addStatement("instance = createInstance()")
                        .endControlFlow()
                        .addStatement("return instance");
            } else {
                getMethod.addStatement("return createInstance()");
            }
            factoryBuilder.addMethod(getMethod.build());

            MethodSpec.Builder createMethod = MethodSpec.methodBuilder("createInstance")
                    .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                    .returns(returnTypeName);

            // Get declaring bean
            ClassName beanFactory = ClassName.get(packageName, typeElement.getSimpleName() + "_Factory");
            createMethod.addStatement("$T bean = $T.getInstance()", ClassName.get(typeElement), beanFactory);
            createMethod.addStatement("return bean.$L()", producerMethod.getSimpleName());

            factoryBuilder.addMethod(createMethod.build());

            writeJavaFile(packageName, factoryBuilder.build(), typeElement);
        }
    }

    private void handleProviderInjection(MethodSpec.Builder createMethod, VariableElement field, TypeMirror fieldType, Map<String, String> resolutionMap, Set<String> qualifiers) {
         if (fieldType instanceof DeclaredType) {
            DeclaredType declaredType = (DeclaredType) fieldType;
            if (!declaredType.getTypeArguments().isEmpty()) {
                TypeMirror typeArg = declaredType.getTypeArguments().get(0);
                String typeArgName = typeArg.toString();
                String rawArgName = typeArgName;
                if (rawArgName.contains("<")) {
                    rawArgName = rawArgName.substring(0, rawArgName.indexOf("<"));
                }

                String key = getKey(rawArgName, qualifiers);
                if (resolutionMap.containsKey(key)) {
                     ClassName dependencyFactory = ClassName.bestGuess(resolutionMap.get(key));
                     createMethod.addStatement("bean.$L = () -> $T.getInstance()", field.getSimpleName(), dependencyFactory);
                } else if (rawArgName.startsWith("uk.co.instanto.tearay.widgets.")) {
                     createMethod.addStatement("bean.$L = () -> new $T()", field.getSimpleName(), ClassName.bestGuess(rawArgName));
                } else {
                     // Fallback
                     ClassName dependencyFactory = ClassName.bestGuess(rawArgName + "_Factory");
                     createMethod.addStatement("bean.$L = () -> $T.getInstance()", field.getSimpleName(), dependencyFactory);
                }
            } else {
                 processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "Provider injection requires a type argument: " + field.getSimpleName(), field);
            }
        }
    }

    private void handleEventInjection(MethodSpec.Builder createMethod, VariableElement field, TypeMirror fieldType) {
         if (fieldType instanceof DeclaredType) {
            DeclaredType declaredType = (DeclaredType) fieldType;
             if (!declaredType.getTypeArguments().isEmpty()) {
                TypeMirror typeArg = declaredType.getTypeArguments().get(0);
                TypeName eventTypeName = TypeName.get(typeArg);

                TypeSpec eventImpl = TypeSpec.anonymousClassBuilder("")
                    .addSuperinterface(TypeName.get(fieldType))
                    .addMethod(MethodSpec.methodBuilder("fire")
                        .addAnnotation(Override.class)
                        .addModifiers(Modifier.PUBLIC)
                        .addParameter(eventTypeName, "event")
                        .addStatement("$T.get().fire(event)", ClassName.get("uk.co.instanto.tearay.api", "SimpleEventBus"))
                        .build())
                    .build();

                createMethod.addStatement("bean.$L = $L", field.getSimpleName(), eventImpl);
             }
         }
    }

    private void handleRegularInjection(MethodSpec.Builder createMethod, VariableElement field, String rawTypeName, Map<String, String> resolutionMap, Set<String> qualifiers) {
        ClassName dependencyFactory;
        String key = getKey(rawTypeName, qualifiers);

        if (rawTypeName.equals("uk.co.instanto.tearay.api.Navigation")) {
            dependencyFactory = ClassName.get("uk.co.instanto.tearay.impl", "NavigationImpl_Factory");
            createMethod.addStatement("bean.$L = $T.getInstance()", field.getSimpleName(), dependencyFactory);
        } else if (rawTypeName.startsWith("uk.co.instanto.tearay.widgets.")) {
            createMethod.addStatement("bean.$L = new $T()", field.getSimpleName(), ClassName.bestGuess(rawTypeName));
        } else if (resolutionMap.containsKey(key)) {
            dependencyFactory = ClassName.bestGuess(resolutionMap.get(key));
            createMethod.addStatement("bean.$L = $T.getInstance()", field.getSimpleName(), dependencyFactory);
        } else {
            dependencyFactory = ClassName.bestGuess(rawTypeName + "_Factory");
            createMethod.addStatement("bean.$L = $T.getInstance()", field.getSimpleName(), dependencyFactory);
        }
    }

    private String getKey(String typeName, Set<String> qualifiers) {
        if (qualifiers == null || qualifiers.isEmpty()) return typeName;
        // Ensure sorting logic matches IOCProcessor
        Set<String> sorted = new TreeSet<>(qualifiers);
        return typeName + "|" + String.join("|", sorted);
    }

    private void writeJavaFile(String packageName, TypeSpec typeSpec, Element originatingElement) {
        try {
            JavaFile.builder(packageName, typeSpec)
                    .build()
                    .writeTo(processingEnv.getFiler());
        } catch (IOException e) {
            processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "Error generating factory for " + originatingElement + ": " + e.getMessage(), originatingElement);
            e.printStackTrace();
        }
    }
}
