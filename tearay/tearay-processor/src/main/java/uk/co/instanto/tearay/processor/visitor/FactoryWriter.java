package uk.co.instanto.tearay.processor.visitor;

import uk.co.instanto.tearay.processor.model.BeanDefinition;
import uk.co.instanto.tearay.processor.model.InjectionPoint;
import com.squareup.javapoet.*;

import javax.annotation.processing.Filer;
import javax.annotation.processing.ProcessingEnvironment;
import javax.lang.model.element.ExecutableElement;
import javax.lang.model.element.Modifier;
import javax.lang.model.element.TypeElement;
import javax.lang.model.element.VariableElement;
import javax.lang.model.type.DeclaredType;
import javax.lang.model.type.TypeMirror;
import javax.tools.Diagnostic;
import java.io.IOException;
import java.util.Map;

public class FactoryWriter implements BeanVisitor {

    private final ProcessingEnvironment processingEnv;

    public FactoryWriter(ProcessingEnvironment processingEnv) {
        this.processingEnv = processingEnv;
    }

    @Override
    public void visit(BeanDefinition bean) {
        TypeElement typeElement = bean.getTypeElement();
        Map<String, TypeElement> resolutionMap = bean.getResolutionMap();
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
            String fieldTypeName = fieldType.toString();
            // Handle generics (strip them for class lookup, unless it's Provider)
            String rawTypeName = fieldTypeName;
            if (rawTypeName.contains("<")) {
                rawTypeName = rawTypeName.substring(0, rawTypeName.indexOf("<"));
            }

            if (rawTypeName.equals("javax.inject.Provider")) {
                // Handle Provider<T> injection
                if (fieldType instanceof DeclaredType) {
                    DeclaredType declaredType = (DeclaredType) fieldType;
                    if (!declaredType.getTypeArguments().isEmpty()) {
                        TypeMirror typeArg = declaredType.getTypeArguments().get(0);
                        String typeArgName = typeArg.toString();
                        if (typeArgName.contains("<")) {
                            typeArgName = typeArgName.substring(0, typeArgName.indexOf("<"));
                        }

                        String key = typeArgName;
                        if (injectionPoint.getQualifier() != null) {
                            key += ":" + injectionPoint.getQualifier();
                        }

                        // We need the factory for the type argument
                        ClassName dependencyFactory;
                        if (resolutionMap.containsKey(key)) {
                             // Found in resolution map - use the implementation's factory
                             TypeElement implElement = resolutionMap.get(key);
                             String implPackage = processingEnv.getElementUtils().getPackageOf(implElement).getQualifiedName().toString();
                             dependencyFactory = ClassName.get(implPackage, implElement.getSimpleName() + "_Factory");
                             createMethod.addStatement("bean.$L = () -> $T.getInstance()", field.getSimpleName(), dependencyFactory);
                        } else if (typeArgName.startsWith("uk.co.instanto.tearay.widgets.")) {
                           // Provider of widget? Maybe rare but possible. Widgets are usually new'd.
                           // But usually widgets are dependent scoped so maybe new'd is correct.
                           // If it's a widget, we probably just return () -> new Widget().
                           createMethod.addStatement("bean.$L = () -> new $T()", field.getSimpleName(), ClassName.bestGuess(typeArgName));
                        } else {
                             // Regular bean provider
                             dependencyFactory = ClassName.bestGuess(typeArgName + "_Factory");
                             createMethod.addStatement("bean.$L = () -> $T.getInstance()", field.getSimpleName(), dependencyFactory);
                        }
                    } else {
                        // Raw Provider type - log error
                        processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "Provider injection requires a type argument: " + field.getSimpleName(), field);
                    }
                }
            } else if (rawTypeName.equals("uk.co.instanto.tearay.api.Event")) {
                // Handle Event<T> injection
                createMethod.addStatement("bean.$L = e -> $T.fire(e)", field.getSimpleName(), ClassName.get("uk.co.instanto.tearay.impl", "EventBus"));
            } else {
                // Regular Injection
                ClassName dependencyFactory;
                String key = rawTypeName;
                if (injectionPoint.getQualifier() != null) {
                    key += ":" + injectionPoint.getQualifier();
                }

                if (rawTypeName.equals("uk.co.instanto.tearay.api.Navigation")) {
                    dependencyFactory = ClassName.get("uk.co.instanto.tearay.impl", "NavigationImpl_Factory");
                    createMethod.addStatement("bean.$L = $T.getInstance()", field.getSimpleName(), dependencyFactory);
                } else if (rawTypeName.startsWith("uk.co.instanto.tearay.widgets.")) {
                    // Direct instantiation for widgets
                    createMethod.addStatement("bean.$L = new $T()", field.getSimpleName(), ClassName.bestGuess(rawTypeName));
                } else if (resolutionMap.containsKey(key)) {
                    // Found in resolution map - use the implementation's factory
                    TypeElement implElement = resolutionMap.get(key);
                    String implPackage = processingEnv.getElementUtils().getPackageOf(implElement).getQualifiedName().toString();
                    dependencyFactory = ClassName.get(implPackage, implElement.getSimpleName() + "_Factory");
                    createMethod.addStatement("bean.$L = $T.getInstance()", field.getSimpleName(), dependencyFactory);
                } else {
                    dependencyFactory = ClassName.bestGuess(rawTypeName + "_Factory");
                    createMethod.addStatement("bean.$L = $T.getInstance()", field.getSimpleName(), dependencyFactory);
                }
            }
        }

        // Templated Binding
        if (bean.isTemplated()) {
            ClassName binderClass = ClassName.get(packageName, typeElement.getSimpleName() + "_Binder");
            createMethod.addStatement("$T.bind(bean)", binderClass);
        }

        // Event Observer Registration
        if (!bean.getObserverMethods().isEmpty()) {
            ClassName eventBusClass = ClassName.get("uk.co.instanto.tearay.impl", "EventBus");
            for (ExecutableElement method : bean.getObserverMethods()) {
                // Find parameter annotated with @Observes
                for (VariableElement param : method.getParameters()) {
                    if (param.getAnnotation(uk.co.instanto.tearay.api.Observes.class) != null) {
                        TypeMirror eventType = param.asType();
                        // Register: EventBus.register(EventType.class, e -> bean.method(e))
                        createMethod.addStatement("$T.register($T.class, e -> bean.$L(($T) e))",
                            eventBusClass, ClassName.bestGuess(eventType.toString()), method.getSimpleName(), ClassName.bestGuess(eventType.toString()));
                        break;
                    }
                }
            }
        }

        // PostConstruct
        for (ExecutableElement method : bean.getPostConstructMethods()) {
            createMethod.addStatement("bean.$L()", method.getSimpleName());
        }

        createMethod.addStatement("return bean");
        factoryBuilder.addMethod(createMethod.build());

        try {
            JavaFile.builder(packageName, factoryBuilder.build())
                    .build()
                    .writeTo(processingEnv.getFiler());
        } catch (IOException e) {
            processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "Error generating factory for " + typeElement + ": " + e.getMessage(), typeElement);
            e.printStackTrace();
        }
    }
}
