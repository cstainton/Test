package dev.verrai.processor;

import dev.verrai.api.i18n.Bundle;
import dev.verrai.api.i18n.TranslationKey;
import dev.verrai.api.ApplicationScoped;
import com.squareup.javapoet.*;
import com.google.auto.service.AutoService;

import javax.annotation.processing.*;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.*;
import javax.tools.FileObject;
import javax.tools.StandardLocation;
import javax.tools.Diagnostic;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Properties;
import java.util.Set;

@AutoService(Processor.class)
@SupportedAnnotationTypes("dev.verrai.api.i18n.Bundle")
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class I18nProcessor extends AbstractProcessor {

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        for (Element element : roundEnv.getElementsAnnotatedWith(Bundle.class)) {
            if (element.getKind() != ElementKind.INTERFACE) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "@Bundle must be on an interface", element);
                continue;
            }
            try {
                processBundle((TypeElement) element);
            } catch (Exception e) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "Error processing bundle " + element + ": " + e.getMessage(), element);
                e.printStackTrace();
            }
        }
        return true;
    }

    private void processBundle(TypeElement typeElement) throws IOException {
        Bundle bundle = typeElement.getAnnotation(Bundle.class);
        String bundleName = bundle.value();
        if (bundleName.isEmpty()) {
            bundleName = typeElement.getSimpleName().toString();
        }

        Properties properties = new Properties();
        String packageName = processingEnv.getElementUtils().getPackageOf(typeElement).getQualifiedName().toString();

        // Try multiple locations
        FileObject resource = null;
        try {
            resource = processingEnv.getFiler().getResource(StandardLocation.CLASS_PATH, packageName, bundleName + ".properties");
        } catch (Exception e) {
            // ignore
        }

        if (resource == null) {
            try {
                resource = processingEnv.getFiler().getResource(StandardLocation.CLASS_OUTPUT, packageName, bundleName + ".properties");
            } catch (Exception e) {
                // ignore
            }
        }

        if (resource == null) {
             try {
                resource = processingEnv.getFiler().getResource(StandardLocation.SOURCE_PATH, packageName, bundleName + ".properties");
            } catch (Exception e) {
                // ignore
            }
        }

        if (resource != null) {
            try (InputStreamReader reader = new InputStreamReader(resource.openInputStream(), StandardCharsets.UTF_8)) {
                properties.load(reader);
            } catch (Exception e) {
                 processingEnv.getMessager().printMessage(Diagnostic.Kind.WARNING, "Could not load properties file " + bundleName + ".properties: " + e.getMessage(), typeElement);
            }
        } else {
             processingEnv.getMessager().printMessage(Diagnostic.Kind.WARNING, "Properties file " + bundleName + ".properties not found in package " + packageName, typeElement);
        }

        // Generate implementation
        String implName = typeElement.getSimpleName() + "Impl";
        TypeSpec.Builder typeBuilder = TypeSpec.classBuilder(implName)
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(ClassName.get(typeElement))
                .addAnnotation(ApplicationScoped.class);

        for (Element member : typeElement.getEnclosedElements()) {
            if (member.getKind() == ElementKind.METHOD) {
                ExecutableElement method = (ExecutableElement) member;
                String key = method.getSimpleName().toString();
                TranslationKey translationKey = method.getAnnotation(TranslationKey.class);
                if (translationKey != null) {
                    key = translationKey.value();
                }

                String message = properties.getProperty(key);
                if (message == null) {
                    message = "???" + key + "???"; // Default missing
                }

                MethodSpec.Builder methodBuilder = MethodSpec.overriding(method);

                if (method.getParameters().isEmpty()) {
                    methodBuilder.addStatement("return $S", message);
                } else {
                    // Call I18nHelper.format
                    methodBuilder.addCode("return $T.format($S", ClassName.get("dev.verrai.api.i18n", "I18nHelper"), message);
                    for (VariableElement param : method.getParameters()) {
                        methodBuilder.addCode(", $L", param.getSimpleName());
                    }
                    methodBuilder.addCode(");\n");
                }

                typeBuilder.addMethod(methodBuilder.build());
            }
        }

        JavaFile.builder(packageName, typeBuilder.build())
                .build()
                .writeTo(processingEnv.getFiler());
    }
}
