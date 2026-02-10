package dev.verrai.processor;

import dev.verrai.api.Bindable;
import dev.verrai.api.binding.BindableProxy;
import dev.verrai.api.binding.PropertyChangeHandler;
import com.squareup.javapoet.*;
import com.google.auto.service.AutoService;

import javax.annotation.processing.*;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.*;
import javax.lang.model.type.TypeKind;
import javax.lang.model.util.ElementFilter;
import javax.tools.Diagnostic;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@AutoService(Processor.class)
@SupportedAnnotationTypes("dev.verrai.api.Bindable")
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class BindableProcessor extends AbstractProcessor {

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        for (Element element : roundEnv.getElementsAnnotatedWith(Bindable.class)) {
            if (element.getKind() != ElementKind.CLASS) continue;
            try {
                processType((TypeElement) element);
            } catch (Exception e) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "Error processing @Bindable: " + e.getMessage(), element);
                e.printStackTrace();
            }
        }
        return true;
    }

    private void processType(TypeElement typeElement) throws IOException {
        String packageName = processingEnv.getElementUtils().getPackageOf(typeElement).getQualifiedName().toString();
        String proxyName = typeElement.getSimpleName() + "_BindableProxy";
        ClassName typeName = ClassName.get(typeElement);
        ClassName proxyClassName = ClassName.get(packageName, proxyName);
        ClassName handlerClass = ClassName.get(PropertyChangeHandler.class);
        ClassName listClass = ClassName.get(List.class);
        ClassName arrayListClass = ClassName.get(ArrayList.class);

        TypeSpec.Builder proxyBuilder = TypeSpec.classBuilder(proxyName)
                .addModifiers(Modifier.PUBLIC)
                .superclass(typeName)
                .addSuperinterface(BindableProxy.class);

        // Field: List<PropertyChangeHandler> handlers
        proxyBuilder.addField(FieldSpec.builder(ParameterizedTypeName.get(listClass, handlerClass), "handlers")
                .addModifiers(Modifier.PRIVATE, Modifier.FINAL)
                .initializer("new $T<>()", arrayListClass)
                .build());

        // Method: addPropertyChangeHandler
        proxyBuilder.addMethod(MethodSpec.methodBuilder("addPropertyChangeHandler")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .addParameter(handlerClass, "handler")
                .addStatement("this.handlers.add(handler)")
                .build());

        // Method: removePropertyChangeHandler
        proxyBuilder.addMethod(MethodSpec.methodBuilder("removePropertyChangeHandler")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .addParameter(handlerClass, "handler")
                .addStatement("this.handlers.remove(handler)")
                .build());

        // Method: firePropertyChange
        proxyBuilder.addMethod(MethodSpec.methodBuilder("firePropertyChange")
                .addModifiers(Modifier.PRIVATE)
                .addParameter(String.class, "property")
                .addParameter(Object.class, "value")
                .beginControlFlow("for ($T handler : handlers)", handlerClass)
                .addStatement("handler.onPropertyChange(property, value)")
                .endControlFlow()
                .build());

        // Override Setters
        for (ExecutableElement method : ElementFilter.methodsIn(processingEnv.getElementUtils().getAllMembers(typeElement))) {
             if (method.getSimpleName().toString().startsWith("set") &&
                 method.getParameters().size() == 1 &&
                 !method.getModifiers().contains(Modifier.STATIC) &&
                 !method.getModifiers().contains(Modifier.FINAL) &&
                 !method.getModifiers().contains(Modifier.PRIVATE)) {

                 String propertyName = method.getSimpleName().toString().substring(3);
                 if (propertyName.length() > 0) {
                     propertyName = propertyName.substring(0, 1).toLowerCase() + propertyName.substring(1);

                     MethodSpec.Builder override = MethodSpec.overriding(method);
                     override.addStatement("super.$L($L)", method.getSimpleName(), method.getParameters().get(0).getSimpleName());
                     override.addStatement("firePropertyChange($S, $L)", propertyName, method.getParameters().get(0).getSimpleName());
                     proxyBuilder.addMethod(override.build());
                 }
             }
        }

        JavaFile.builder(packageName, proxyBuilder.build())
                .build()
                .writeTo(processingEnv.getFiler());
    }
}
