package com.example.errai.processor;

import com.example.errai.api.Page;
import com.example.errai.api.PageShowing;
import com.example.errai.api.PageHidden;
import com.squareup.javapoet.*;
import com.google.auto.service.AutoService;

import javax.annotation.processing.*;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.*;
import javax.lang.model.util.ElementFilter;
import javax.tools.Diagnostic;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@AutoService(Processor.class)
@SupportedAnnotationTypes("com.example.errai.api.Page")
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class NavigationProcessor extends AbstractProcessor {

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        Set<? extends Element> pages = roundEnv.getElementsAnnotatedWith(Page.class);
        if (pages.isEmpty()) return false;

        // Only generate once
        if (processingEnv.getElementUtils().getTypeElement("com.example.errai.impl.NavigationImpl") != null) {
            return false;
        }

        try {
            generateNavigationImpl(pages);
        } catch (IOException e) {
            e.printStackTrace();
            processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "Error generating NavigationImpl: " + e.getMessage());
        }

        return false;
    }

    private void generateNavigationImpl(Set<? extends Element> pages) throws IOException {
        ClassName navigationInterface = ClassName.get("com.example.errai.api", "Navigation");
        ClassName htmlElementClass = ClassName.get("org.teavm.jso.dom.html", "HTMLElement");
        ClassName windowClass = ClassName.get("org.teavm.jso.browser", "Window");

        TypeSpec.Builder navBuilder = TypeSpec.classBuilder("NavigationImpl")
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(navigationInterface);

        // Singleton instance for the factory to use
        navBuilder.addField(FieldSpec.builder(ClassName.bestGuess("com.example.errai.impl.NavigationImpl"), "instance")
                .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                .build());

        // Current page reference
        navBuilder.addField(FieldSpec.builder(Object.class, "currentPage")
                .addModifiers(Modifier.PRIVATE)
                .build());

        MethodSpec.Builder goToMethod = MethodSpec.methodBuilder("goTo")
                .addModifiers(Modifier.PUBLIC)
                .addParameter(String.class, "role")
                .addAnnotation(Override.class);

        goToMethod.addStatement("$T body = $T.current().getDocument().getBody()", htmlElementClass, windowClass);
        goToMethod.addStatement("body.setInnerHTML(\"\")"); // Clear body

        goToMethod.beginControlFlow("switch (role)");

        for (Element element : pages) {
            TypeElement typeElement = (TypeElement) element;
            Page pageAnno = typeElement.getAnnotation(Page.class);
            String role = pageAnno.role();
            if (role.isEmpty()) role = typeElement.getSimpleName().toString();

            goToMethod.addCode("case $S:\n", role);

            // Instantiate
            ClassName factoryClass = ClassName.bestGuess(typeElement.getQualifiedName().toString() + "_Factory");
            ClassName pageClass = ClassName.get(typeElement);
            goToMethod.addStatement("  $T page_$L = $T.getInstance()", pageClass, role, factoryClass);

            // Check for @PageShowing
            for (ExecutableElement method : ElementFilter.methodsIn(typeElement.getEnclosedElements())) {
                if (method.getAnnotation(PageShowing.class) != null) {
                    goToMethod.addStatement("  page_$L.$L()", role, method.getSimpleName());
                }
            }

            // Append element
            // Assumes the page has an 'element' field (populated by TemplatedProcessor or manually)
            // Use Reflection-like access or just assume public field 'element' for PoC
            // We know our TemplatedProcessor adds 'public HTMLElement element'
            goToMethod.addStatement("  if (page_$L.element != null) body.appendChild(page_$L.element)", role, role);

            goToMethod.addStatement("  this.currentPage = page_$L", role);

            goToMethod.addStatement("  break");
        }

        goToMethod.addCode("default:\n");
        goToMethod.addStatement("  $T.alert($S + role)", windowClass, "Unknown page role: ");
        goToMethod.endControlFlow();

        navBuilder.addMethod(goToMethod.build());

        // Create the package if it doesn't exist
        JavaFile.builder("com.example.errai.impl", navBuilder.build())
                .build()
                .writeTo(processingEnv.getFiler());

        // Generate the Factory for NavigationImpl
        generateNavigationFactory();
    }

    private void generateNavigationFactory() throws IOException {
        ClassName navImplClass = ClassName.get("com.example.errai.impl", "NavigationImpl");
        TypeSpec factory = TypeSpec.classBuilder("NavigationImpl_Factory")
                .addModifiers(Modifier.PUBLIC)
                .addField(FieldSpec.builder(navImplClass, "instance")
                        .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                        .build())
                .addMethod(MethodSpec.methodBuilder("getInstance")
                        .addModifiers(Modifier.PUBLIC, Modifier.STATIC)
                        .returns(navImplClass)
                        .beginControlFlow("if (instance == null)")
                        .addStatement("instance = new $T()", navImplClass)
                        .endControlFlow()
                        .addStatement("return instance")
                        .build())
                .build();

        JavaFile.builder("com.example.errai.impl", factory)
                .build()
                .writeTo(processingEnv.getFiler());
    }
}
