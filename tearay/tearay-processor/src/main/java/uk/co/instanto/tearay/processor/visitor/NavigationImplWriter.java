package uk.co.instanto.tearay.processor.visitor;

import uk.co.instanto.tearay.api.Navigation;
import uk.co.instanto.tearay.api.PageShowing;
import uk.co.instanto.tearay.api.PageState;
import uk.co.instanto.tearay.api.RestrictedAccess;
import uk.co.instanto.tearay.processor.model.PageDefinition;
import com.squareup.javapoet.*;

import javax.annotation.processing.Filer;
import javax.annotation.processing.ProcessingEnvironment;
import javax.lang.model.element.Modifier;
import javax.lang.model.element.TypeElement;
import javax.lang.model.element.VariableElement;
import javax.lang.model.element.ExecutableElement;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class NavigationImplWriter implements PageVisitor {

    private final ProcessingEnvironment processingEnv;
    private final TypeSpec.Builder navBuilder;
    private final TypeElement securityProviderImpl;
    private final List<PageDefinition> pages = new ArrayList<>();

    public NavigationImplWriter(ProcessingEnvironment processingEnv, TypeElement securityProviderImpl) {
        this.processingEnv = processingEnv;
        this.securityProviderImpl = securityProviderImpl;

        ClassName navigationInterface = ClassName.get("uk.co.instanto.tearay.api", "Navigation");
        ClassName securityProviderInterface = ClassName.get("uk.co.instanto.tearay.api", "SecurityProvider");

        navBuilder = TypeSpec.classBuilder("NavigationImpl")
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
    }

    @Override
    public void visit(PageDefinition page) {
        pages.add(page);
    }

    public void write(Filer filer) throws IOException {
        ClassName htmlElementClass = ClassName.get("org.teavm.jso.dom.html", "HTMLElement");
        ClassName windowClass = ClassName.get("org.teavm.jso.browser", "Window");

        MethodSpec.Builder goToMethod = MethodSpec.methodBuilder("goTo")
                .addModifiers(Modifier.PUBLIC)
                .addParameter(String.class, "role")
                .addParameter(ParameterizedTypeName.get(Map.class, String.class, String.class), "state")
                .addAnnotation(Override.class);

        // --- Hiding Logic ---
        goToMethod.beginControlFlow("if (this.currentPage != null)");
        boolean firstHiding = true;
        for (PageDefinition page : pages) {
            if (!page.getPageHidingMethods().isEmpty()) {
                ClassName pageClass = ClassName.get(page.getTypeElement());
                if (firstHiding) {
                    goToMethod.beginControlFlow("if (this.currentPage instanceof $T)", pageClass);
                    firstHiding = false;
                } else {
                    goToMethod.nextControlFlow("else if (this.currentPage instanceof $T)", pageClass);
                }
                for (ExecutableElement m : page.getPageHidingMethods()) {
                    goToMethod.addStatement("(($T)this.currentPage).$L()", pageClass, m.getSimpleName());
                }
            }
        }
        if (!firstHiding) {
            goToMethod.endControlFlow();
        }
        goToMethod.endControlFlow(); // if current != null

        // --- Clear Body ---
        goToMethod.addStatement("$T body = $T.current().getDocument().getBody()", htmlElementClass, windowClass);
        goToMethod.addStatement("body.setInnerText(\"\")");

        // --- Hidden Logic ---
        goToMethod.beginControlFlow("if (this.currentPage != null)");
        boolean firstHidden = true;
        for (PageDefinition page : pages) {
            if (!page.getPageHiddenMethods().isEmpty()) {
                ClassName pageClass = ClassName.get(page.getTypeElement());
                if (firstHidden) {
                    goToMethod.beginControlFlow("if (this.currentPage instanceof $T)", pageClass);
                    firstHidden = false;
                } else {
                    goToMethod.nextControlFlow("else if (this.currentPage instanceof $T)", pageClass);
                }
                for (ExecutableElement m : page.getPageHiddenMethods()) {
                    goToMethod.addStatement("(($T)this.currentPage).$L()", pageClass, m.getSimpleName());
                }
            }
        }
        if (!firstHidden) {
            goToMethod.endControlFlow();
        }
        goToMethod.endControlFlow(); // if current != null


        // --- Update Hash ---
        goToMethod.addStatement("$T hash = new $T(\"#\" + role)", StringBuilder.class, StringBuilder.class);
        goToMethod.beginControlFlow("for ($T entry : state.entrySet())", ParameterizedTypeName.get(Map.Entry.class, String.class, String.class));
        goToMethod.addStatement("hash.append(\";\").append(entry.getKey()).append(\"=\").append(entry.getValue())");
        goToMethod.endControlFlow();
        goToMethod.addStatement("$T.current().getHistory().pushState(null, null, hash.toString())", windowClass);

        // --- Switch Pages ---
        goToMethod.beginControlFlow("switch (role)");

        for (PageDefinition page : pages) {
            String role = page.getRole();
            String varName = page.getVarName();
            TypeElement typeElement = page.getTypeElement();

            goToMethod.addCode("case $S:\n", role);

            // Security Check
            RestrictedAccess restricted = page.getRestrictedAccess();
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
            for (VariableElement field : page.getPageStateFields()) {
                PageState pageState = field.getAnnotation(PageState.class);
                String paramName = pageState.value();
                if (paramName.isEmpty()) paramName = field.getSimpleName().toString();

                goToMethod.addCode("  {\n");
                goToMethod.addStatement("    String val = state.get($S)", paramName);
                goToMethod.addStatement("    if (val != null) page_$L.$L = val", varName, field.getSimpleName());
                goToMethod.addCode("  }\n");
            }

            // PageShowing
            for (ExecutableElement method : page.getPageShowingMethods()) {
                 goToMethod.addStatement("  page_$L.$L()", varName, method.getSimpleName());
            }

            // Append element
            goToMethod.addStatement("  if (page_$L.element != null) body.appendChild(page_$L.element)", varName, varName);

            // PageShown
            for (ExecutableElement method : page.getPageShownMethods()) {
                 goToMethod.addStatement("  page_$L.$L()", varName, method.getSimpleName());
            }

            goToMethod.addStatement("  this.currentPage = page_$L", varName);
            goToMethod.addStatement("  break");
        }

        goToMethod.addCode("default:\n");
        goToMethod.addStatement("  $T.alert($S + role)", windowClass, "Unknown page role: ");
        goToMethod.endControlFlow(); // switch

        navBuilder.addMethod(goToMethod.build());

        JavaFile.builder("uk.co.instanto.tearay.impl", navBuilder.build())
                .build()
                .writeTo(filer);
    }
}
