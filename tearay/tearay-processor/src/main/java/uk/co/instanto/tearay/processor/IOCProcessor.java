package uk.co.instanto.tearay.processor;

import uk.co.instanto.tearay.api.ApplicationScoped;
import uk.co.instanto.tearay.api.EntryPoint;
import uk.co.instanto.tearay.api.PostConstruct;
import uk.co.instanto.tearay.api.Templated;
import uk.co.instanto.tearay.api.Page;
import com.squareup.javapoet.*;
import com.google.auto.service.AutoService;

import javax.annotation.processing.*;
import javax.inject.Inject;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.*;
import javax.lang.model.type.TypeMirror;
import javax.lang.model.util.ElementFilter;
import javax.tools.Diagnostic;
import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

@AutoService(Processor.class)
@SupportedAnnotationTypes({
    "uk.co.instanto.tearay.api.ApplicationScoped",
    "uk.co.instanto.tearay.api.EntryPoint",
    "uk.co.instanto.tearay.api.Templated",
    "uk.co.instanto.tearay.api.Page"
})
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class IOCProcessor extends AbstractProcessor {

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        // Collect all beans: @ApplicationScoped, @EntryPoint, @Templated, and @Page (which implies bean)
        Set<Element> beans = roundEnv.getElementsAnnotatedWith(ApplicationScoped.class).stream().collect(Collectors.toSet());
        beans.addAll(roundEnv.getElementsAnnotatedWith(EntryPoint.class));
        beans.addAll(roundEnv.getElementsAnnotatedWith(Templated.class));
        beans.addAll(roundEnv.getElementsAnnotatedWith(Page.class));

        for (Element element : beans) {
            if (element.getKind() != ElementKind.CLASS) continue;
            try {
                processBean((TypeElement) element);
            } catch (Exception e) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "Error processing bean " + element + ": " + e.getMessage(), element);
                e.printStackTrace();
            }
        }

        // Handle Bootstrapper generation if EntryPoint is present
        Set<? extends Element> entryPoints = roundEnv.getElementsAnnotatedWith(EntryPoint.class);
        if (!entryPoints.isEmpty()) {
            try {
                generateBootstrapper((TypeElement) entryPoints.iterator().next());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return false;
    }

    private void processBean(TypeElement typeElement) throws IOException {
        String packageName = processingEnv.getElementUtils().getPackageOf(typeElement).getQualifiedName().toString();
        String factoryName = typeElement.getSimpleName() + "_Factory";
        ClassName typeName = ClassName.get(typeElement);
        ClassName factoryClassName = ClassName.get(packageName, factoryName);

        boolean isSingleton = typeElement.getAnnotation(ApplicationScoped.class) != null ||
                              typeElement.getAnnotation(EntryPoint.class) != null;
        boolean isTemplated = typeElement.getAnnotation(Templated.class) != null;

        TypeSpec.Builder factoryBuilder = TypeSpec.classBuilder(factoryName)
                .addModifiers(Modifier.PUBLIC);

        // Singleton Instance Holder
        if (isSingleton) {
            factoryBuilder.addField(FieldSpec.builder(typeName, "instance")
                    .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                    .build());
        }

        MethodSpec.Builder getMethod = MethodSpec.methodBuilder("getInstance")
                .addModifiers(Modifier.PUBLIC, Modifier.STATIC)
                .returns(typeName);

        if (isSingleton) {
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
        for (VariableElement field : ElementFilter.fieldsIn(typeElement.getEnclosedElements())) {
            if (field.getAnnotation(Inject.class) != null) {
                TypeMirror fieldType = field.asType();
                // Assumes fieldType is a class that has a generated factory.
                // For interfaces, this simple PoC fails (would need a resolution map).
                // We assume concrete classes for now.
                ClassName dependencyFactory;
                if (fieldType.toString().equals("uk.co.instanto.tearay.api.Navigation")) {
                    dependencyFactory = ClassName.get("uk.co.instanto.tearay.impl", "NavigationImpl_Factory");
                    createMethod.addStatement("bean.$L = $T.getInstance()", field.getSimpleName(), dependencyFactory);
                } else if (fieldType.toString().startsWith("uk.co.instanto.tearay.widgets.")) {
                    // Direct instantiation for widgets
                    createMethod.addStatement("bean.$L = new $T()", field.getSimpleName(), ClassName.bestGuess(fieldType.toString()));
                } else {
                    dependencyFactory = ClassName.bestGuess(fieldType.toString() + "_Factory");
                    createMethod.addStatement("bean.$L = $T.getInstance()", field.getSimpleName(), dependencyFactory);
                }
            }
        }

        // Templated Binding
        if (isTemplated) {
            ClassName binderClass = ClassName.get(packageName, typeElement.getSimpleName() + "_Binder");
            createMethod.addStatement("$T.bind(bean)", binderClass);
        }

        // PostConstruct
        for (ExecutableElement method : ElementFilter.methodsIn(typeElement.getEnclosedElements())) {
            if (method.getAnnotation(PostConstruct.class) != null) {
                createMethod.addStatement("bean.$L()", method.getSimpleName());
            }
        }

        createMethod.addStatement("return bean");
        factoryBuilder.addMethod(createMethod.build());

        JavaFile.builder(packageName, factoryBuilder.build())
                .build()
                .writeTo(processingEnv.getFiler());
    }

    private void generateBootstrapper(TypeElement entryPoint) throws IOException {
        String packageName = processingEnv.getElementUtils().getPackageOf(entryPoint).getQualifiedName().toString();
        ClassName entryPointFactory = ClassName.get(packageName, entryPoint.getSimpleName() + "_Factory");

        TypeSpec bootstrapper = TypeSpec.classBuilder("BootstrapperImpl")
                .addModifiers(Modifier.PUBLIC)
                .addMethod(MethodSpec.methodBuilder("run")
                        .addModifiers(Modifier.PUBLIC)
                        .addStatement("$T instance = $T.getInstance()", ClassName.get(entryPoint), entryPointFactory)
                        .addStatement("instance.onModuleLoad()")
                        .build())
                .build();

        JavaFile.builder(packageName, bootstrapper)
                .build()
                .writeTo(processingEnv.getFiler());
    }
}
