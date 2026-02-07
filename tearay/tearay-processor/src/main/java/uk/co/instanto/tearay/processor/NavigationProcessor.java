package uk.co.instanto.tearay.processor;

import uk.co.instanto.tearay.api.Page;
import uk.co.instanto.tearay.api.PageShowing;
import uk.co.instanto.tearay.api.PageHidden;
import uk.co.instanto.tearay.api.PageState;
import uk.co.instanto.tearay.api.RestrictedAccess;
import uk.co.instanto.tearay.api.ApplicationScoped;
import com.squareup.javapoet.*;
import com.google.auto.service.AutoService;

import javax.annotation.processing.*;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.*;
import javax.lang.model.type.TypeMirror;
import javax.lang.model.util.ElementFilter;
import javax.lang.model.util.Types;
import javax.tools.Diagnostic;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@AutoService(Processor.class)
@SupportedAnnotationTypes({"uk.co.instanto.tearay.api.Page", "uk.co.instanto.tearay.api.PageState", "uk.co.instanto.tearay.api.ApplicationScoped"})
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class NavigationProcessor extends AbstractProcessor {

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        Set<? extends Element> pages = roundEnv.getElementsAnnotatedWith(Page.class);

        // We also need to find the SecurityProvider
        TypeElement securityProviderImpl = findSecurityProvider(roundEnv);

        if (pages.isEmpty()) return false;

        // Only generate once
        if (processingEnv.getElementUtils().getTypeElement("uk.co.instanto.tearay.impl.NavigationImpl") != null) {
            return false;
        }

        try {
            generateNavigationImpl(pages, securityProviderImpl);
        } catch (IOException e) {
            e.printStackTrace();
            processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "Error generating NavigationImpl: " + e.getMessage());
        }

        return false;
    }

    private TypeElement findSecurityProvider(RoundEnvironment roundEnv) {
        TypeMirror securityProviderInterface = processingEnv.getElementUtils().getTypeElement("uk.co.instanto.tearay.api.SecurityProvider").asType();
        Types types = processingEnv.getTypeUtils();

        for (Element element : roundEnv.getElementsAnnotatedWith(ApplicationScoped.class)) {
            if (element.getKind() == ElementKind.CLASS) {
                if (types.isAssignable(element.asType(), securityProviderInterface)) {
                    return (TypeElement) element;
                }
            }
        }
        return null;
    }

    private void generateNavigationImpl(Set<? extends Element> pages, TypeElement securityProviderImpl) throws IOException {
        ClassName navigationInterface = ClassName.get("uk.co.instanto.tearay.api", "Navigation");
        ClassName securityProviderInterface = ClassName.get("uk.co.instanto.tearay.api", "SecurityProvider");
        ClassName htmlElementClass = ClassName.get("org.teavm.jso.dom.html", "HTMLElement");
        ClassName windowClass = ClassName.get("org.teavm.jso.browser", "Window");

        TypeSpec.Builder navBuilder = TypeSpec.classBuilder("NavigationImpl")
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(navigationInterface);

        // Singleton instance for the factory to use
        navBuilder.addField(FieldSpec.builder(ClassName.bestGuess("uk.co.instanto.tearay.impl.NavigationImpl"), "instance")
                .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                .build());

        // Current page reference
        navBuilder.addField(FieldSpec.builder(Object.class, "currentPage")
                .addModifiers(Modifier.PRIVATE)
                .build());

        // Security Provider field
        if (securityProviderImpl != null) {
            navBuilder.addField(FieldSpec.builder(securityProviderInterface, "securityProvider")
                    .addModifiers(Modifier.PUBLIC) // Public for factory injection
                    .build());
        }

        // goTo(role) - default implementation delegation
        MethodSpec.Builder goToSimple = MethodSpec.methodBuilder("goTo")
                .addModifiers(Modifier.PUBLIC)
                .addParameter(String.class, "role")
                .addAnnotation(Override.class)
                .addStatement("goTo(role, $T.emptyMap())", Collections.class);
        navBuilder.addMethod(goToSimple.build());

        // goTo(role, state)
        MethodSpec.Builder goToMethod = MethodSpec.methodBuilder("goTo")
                .addModifiers(Modifier.PUBLIC)
                .addParameter(String.class, "role")
                .addParameter(ParameterizedTypeName.get(Map.class, String.class, String.class), "state")
                .addAnnotation(Override.class);

        goToMethod.addStatement("$T body = $T.current().getDocument().getBody()", htmlElementClass, windowClass);
        goToMethod.addStatement("body.setInnerText(\"\")"); // Clear body

        // Update URL hash
        goToMethod.addStatement("$T hash = new $T(\"#\" + role)", StringBuilder.class, StringBuilder.class);
        goToMethod.beginControlFlow("for ($T entry : state.entrySet())", ParameterizedTypeName.get(Map.Entry.class, String.class, String.class));
        goToMethod.addStatement("hash.append(\";\").append(entry.getKey()).append(\"=\").append(entry.getValue())");
        goToMethod.endControlFlow();
        goToMethod.addStatement("$T.current().getHistory().pushState(null, null, hash.toString())", windowClass);

        goToMethod.beginControlFlow("switch (role)");

        for (Element element : pages) {
            TypeElement typeElement = (TypeElement) element;
            Page pageAnno = typeElement.getAnnotation(Page.class);
            String role = pageAnno.role();
            if (role.isEmpty()) role = typeElement.getSimpleName().toString();

            // Sanitize role for java variable name
            String varName = role.replaceAll("[^a-zA-Z0-9_]", "_");

            goToMethod.addCode("case $S:\n", role);

            // Security Check
            RestrictedAccess restricted = typeElement.getAnnotation(RestrictedAccess.class);
            if (restricted != null && securityProviderImpl != null) {
                goToMethod.addCode("  if (this.securityProvider != null) {\n");
                for (String reqRole : restricted.roles()) {
                    goToMethod.addStatement("    if (!this.securityProvider.hasRole($S)) { $T.alert($S); return; }",
                        reqRole, windowClass, "Access Denied: Missing role " + reqRole);
                }
                goToMethod.addCode("  }\n");
            }

            // Instantiate
            ClassName factoryClass = ClassName.bestGuess(typeElement.getQualifiedName().toString() + "_Factory");
            ClassName pageClass = ClassName.get(typeElement);
            goToMethod.addStatement("  $T page_$L = $T.getInstance()", pageClass, varName, factoryClass);

            // Inject PageState
            for (VariableElement field : ElementFilter.fieldsIn(typeElement.getEnclosedElements())) {
                PageState pageState = field.getAnnotation(PageState.class);
                if (pageState != null) {
                    String paramName = pageState.value();
                    if (paramName.isEmpty()) paramName = field.getSimpleName().toString();

                    goToMethod.addCode("  {\n");
                    goToMethod.addStatement("    String val = state.get($S)", paramName);
                    goToMethod.addStatement("    if (val != null) page_$L.$L = val", varName, field.getSimpleName());
                    goToMethod.addCode("  }\n");
                }
            }

            // Check for @PageShowing
            for (ExecutableElement method : ElementFilter.methodsIn(typeElement.getEnclosedElements())) {
                if (method.getAnnotation(PageShowing.class) != null) {
                    goToMethod.addStatement("  page_$L.$L()", varName, method.getSimpleName());
                }
            }

            // Append element
            goToMethod.addStatement("  if (page_$L.element != null) body.appendChild(page_$L.element)", varName, varName);

            goToMethod.addStatement("  this.currentPage = page_$L", varName);

            goToMethod.addStatement("  break");
        }

        goToMethod.addCode("default:\n");
        goToMethod.addStatement("  $T.alert($S + role)", windowClass, "Unknown page role: ");
        goToMethod.endControlFlow();

        navBuilder.addMethod(goToMethod.build());

        // Create the package if it doesn't exist
        JavaFile.builder("uk.co.instanto.tearay.impl", navBuilder.build())
                .build()
                .writeTo(processingEnv.getFiler());

        // Generate the Factory for NavigationImpl
        generateNavigationFactory(securityProviderImpl);
    }

    private void generateNavigationFactory(TypeElement securityProviderImpl) throws IOException {
        ClassName navImplClass = ClassName.get("uk.co.instanto.tearay.impl", "NavigationImpl");

        MethodSpec.Builder getInstance = MethodSpec.methodBuilder("getInstance")
                .addModifiers(Modifier.PUBLIC, Modifier.STATIC)
                .returns(navImplClass);

        getInstance.beginControlFlow("if (instance == null)")
                .addStatement("instance = new $T()", navImplClass);

        if (securityProviderImpl != null) {
            ClassName providerFactory = ClassName.bestGuess(securityProviderImpl.getQualifiedName().toString() + "_Factory");
            getInstance.addStatement("instance.securityProvider = $T.getInstance()", providerFactory);
        }

        getInstance.endControlFlow()
                .addStatement("return instance");

        TypeSpec factory = TypeSpec.classBuilder("NavigationImpl_Factory")
                .addModifiers(Modifier.PUBLIC)
                .addField(FieldSpec.builder(navImplClass, "instance")
                        .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                        .build())
                .addMethod(getInstance.build())
                .build();

        JavaFile.builder("uk.co.instanto.tearay.impl", factory)
                .build()
                .writeTo(processingEnv.getFiler());
    }
}
