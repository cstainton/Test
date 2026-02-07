package uk.co.instanto.tearay.processor.visitor;

import uk.co.instanto.tearay.processor.model.BeanDefinition;
import com.squareup.javapoet.*;

import javax.annotation.processing.Filer;
import javax.annotation.processing.ProcessingEnvironment;
import javax.lang.model.element.ExecutableElement;
import javax.lang.model.element.Modifier;
import javax.lang.model.element.TypeElement;
import javax.lang.model.element.VariableElement;
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
        for (VariableElement field : bean.getInjectionPoints()) {
            TypeMirror fieldType = field.asType();
            String fieldTypeName = fieldType.toString();
            if (fieldTypeName.contains("<")) {
                fieldTypeName = fieldTypeName.substring(0, fieldTypeName.indexOf("<"));
            }

            ClassName dependencyFactory;
            if (fieldTypeName.equals("uk.co.instanto.tearay.api.Navigation")) {
                dependencyFactory = ClassName.get("uk.co.instanto.tearay.impl", "NavigationImpl_Factory");
                createMethod.addStatement("bean.$L = $T.getInstance()", field.getSimpleName(), dependencyFactory);
            } else if (fieldTypeName.startsWith("uk.co.instanto.tearay.widgets.")) {
                // Direct instantiation for widgets
                createMethod.addStatement("bean.$L = new $T()", field.getSimpleName(), ClassName.bestGuess(fieldTypeName));
            } else if (resolutionMap.containsKey(fieldTypeName)) {
                // Found in resolution map - use the implementation's factory
                TypeElement implElement = resolutionMap.get(fieldTypeName);
                String implPackage = processingEnv.getElementUtils().getPackageOf(implElement).getQualifiedName().toString();
                dependencyFactory = ClassName.get(implPackage, implElement.getSimpleName() + "_Factory");
                createMethod.addStatement("bean.$L = $T.getInstance()", field.getSimpleName(), dependencyFactory);
            } else {
                dependencyFactory = ClassName.bestGuess(fieldTypeName + "_Factory");
                createMethod.addStatement("bean.$L = $T.getInstance()", field.getSimpleName(), dependencyFactory);
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
