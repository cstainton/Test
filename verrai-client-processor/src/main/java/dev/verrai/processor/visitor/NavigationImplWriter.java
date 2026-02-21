package dev.verrai.processor.visitor;

import dev.verrai.api.PageState;
import dev.verrai.security.RestrictedAccess;
import dev.verrai.processor.model.PageDefinition;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NavigationImplWriter implements PageVisitor {

    private final ProcessingEnvironment processingEnv;
    private final TypeSpec.Builder navBuilder;
    private final TypeElement securityProviderImpl;
    private final List<PageDefinition> collectedPages = new ArrayList<>();
    private String startingPageRole = null;

    public NavigationImplWriter(ProcessingEnvironment processingEnv, TypeElement securityProviderImpl) {
        this.processingEnv = processingEnv;
        this.securityProviderImpl = securityProviderImpl;

        ClassName navigationInterface = ClassName.get("dev.verrai.api", "Navigation");
        ClassName securityProviderInterface = ClassName.get("dev.verrai.security", "SecurityProvider");

        navBuilder = TypeSpec.classBuilder("NavigationImpl")
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(navigationInterface);

        // Singleton instance
        navBuilder.addField(FieldSpec.builder(ClassName.bestGuess("dev.verrai.impl.NavigationImpl"), "instance")
                .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                .build());

        // Current page reference (typed as Object since we switch on role)
        navBuilder.addField(FieldSpec.builder(Object.class, "currentPage")
                .addModifiers(Modifier.PRIVATE)
                .build());

        // Flag to suppress duplicate history.pushState when navigating from popstate
        navBuilder.addField(FieldSpec.builder(boolean.class, "isPopstate")
                .addModifiers(Modifier.PRIVATE)
                .build());

        if (securityProviderImpl != null) {
            navBuilder.addField(FieldSpec.builder(securityProviderInterface, "securityProvider")
                    .addModifiers(Modifier.PUBLIC)
                    .build());
        }

        // goTo(role) — delegates to goTo(role, emptyMap)
        MethodSpec.Builder goToSimple = MethodSpec.methodBuilder("goTo")
                .addModifiers(Modifier.PUBLIC)
                .addParameter(String.class, "role")
                .addAnnotation(Override.class)
                .addStatement("goTo(role, $T.emptyMap())", Collections.class);
        navBuilder.addMethod(goToSimple.build());
    }

    @Override
    public void visit(PageDefinition page) {
        collectedPages.add(page);
        if (page.isStartingPage()) {
            this.startingPageRole = page.getRole();
        }
    }

    public void write(Filer filer) throws IOException {
        ClassName windowClass = ClassName.get("org.teavm.jso.browser", "Window");
        ClassName htmlElementClass = ClassName.get("org.teavm.jso.dom.html", "HTMLElement");

        navBuilder.addMethod(buildGoToMethod(windowClass, htmlElementClass));
        navBuilder.addMethod(buildStartMethod(windowClass));
        navBuilder.addMethod(buildNavigateToHashMethod());
        navBuilder.addMethod(buildRegisterPopstateListenerMethod(windowClass));
        navBuilder.addMethod(buildCallPageHidingMethod());
        navBuilder.addMethod(buildCallPageHiddenMethod());

        JavaFile.builder("dev.verrai.impl", navBuilder.build())
                .build()
                .writeTo(filer);
    }

    /**
     * Generates the full goTo(role, state) method.
     *
     * Order of operations:
     *  1. Pre-validate role — return early (before any DOM mutation) for unknown roles.
     *  2. Null-guarded outgoing lifecycle: @PageHiding → clearBindings → @PageHidden.
     *  3. Clear the DOM.
     *  4. Build hash URL and conditionally push history entry.
     *  5. Instantiate and mount the new page.
     */
    private MethodSpec buildGoToMethod(ClassName windowClass, ClassName htmlElementClass) {
        MethodSpec.Builder method = MethodSpec.methodBuilder("goTo")
                .addModifiers(Modifier.PUBLIC)
                .addParameter(String.class, "role")
                .addParameter(ParameterizedTypeName.get(Map.class, String.class, String.class), "state")
                .addAnnotation(Override.class);

        // 1. Pre-validate role before any DOM mutation or lifecycle calls
        method.beginControlFlow("switch (role)");
        for (PageDefinition page : collectedPages) {
            method.addCode("case $S:\n", page.getRole());
            method.addStatement("  break");
        }
        method.addCode("default:\n");
        method.addStatement("  $T.alert($S + role)", windowClass, "Unknown page role: ");
        method.addStatement("  return");
        method.endControlFlow();

        // 2. Outgoing page lifecycle — null-guarded so the first navigation is clean
        method.addStatement("$T body = $T.current().getDocument().getBody()", htmlElementClass, windowClass);
        method.beginControlFlow("if (this.currentPage != null)");
        method.addStatement("callPageHiding(this.currentPage)");
        method.beginControlFlow("if (this.currentPage instanceof dev.verrai.api.binding.BinderLifecycle)");
        method.addStatement("((dev.verrai.api.binding.BinderLifecycle) this.currentPage).clearBindings()");
        method.endControlFlow();
        method.addStatement("callPageHidden(this.currentPage)");
        method.endControlFlow();

        // 3. Clear the DOM
        method.addStatement("body.setInnerText(\"\")");

        // 4. Build URL hash for the new page
        method.addStatement("$T hash = new $T(\"#\" + role)", StringBuilder.class, StringBuilder.class);
        method.beginControlFlow("for ($T entry : state.entrySet())",
                ParameterizedTypeName.get(Map.Entry.class, String.class, String.class));
        method.addStatement("hash.append(\";\").append(entry.getKey()).append(\"=\").append(entry.getValue())");
        method.endControlFlow();

        // Only push to history when navigating programmatically (not from popstate)
        method.beginControlFlow("if (!this.isPopstate)");
        method.addStatement("$T.current().getHistory().pushState(null, null, hash.toString())", windowClass);
        method.endControlFlow();

        // 5. Instantiate and mount the new page
        method.beginControlFlow("switch (role)");
        for (PageDefinition page : collectedPages) {
            generatePageCase(page, method, windowClass);
        }
        // default is unreachable — pre-validation above already returned
        method.addCode("default:\n");
        method.addStatement("  break");
        method.endControlFlow();

        return method.build();
    }

    private void generatePageCase(PageDefinition page, MethodSpec.Builder method, ClassName windowClass) {
        String role = page.getRole();
        String varName = page.getVarName();
        TypeElement typeElement = page.getTypeElement();
        ClassName htmlElementClass = ClassName.get("org.teavm.jso.dom.html", "HTMLElement");

        method.addCode("case $S:\n", role);

        // Security check
        RestrictedAccess restricted = page.getRestrictedAccess();
        if (restricted != null && securityProviderImpl != null) {
            method.addCode("  if (this.securityProvider != null) {\n");
            for (String reqRole : restricted.roles()) {
                method.addStatement("    if (!this.securityProvider.hasRole($S)) { $T.alert($S); return; }",
                        reqRole, windowClass, "Access Denied: Missing role " + reqRole);
            }
            method.addCode("  }\n");
        }

        // Instantiate
        ClassName factoryClass = ClassName.bestGuess(typeElement.getQualifiedName().toString() + "_Factory");
        ClassName pageClass = ClassName.get(typeElement);
        method.addStatement("  $T page_$L = $T.getInstance()", pageClass, varName, factoryClass);

        // @PageState injection
        for (VariableElement field : page.getPageStateFields()) {
            PageState pageState = field.getAnnotation(PageState.class);
            String paramName = pageState.value();
            if (paramName.isEmpty())
                paramName = field.getSimpleName().toString();

            method.addCode("  {\n");
            method.addStatement("    String val = state.get($S)", paramName);
            method.addStatement("    if (val != null) page_$L.$L = val", varName, field.getSimpleName());
            method.addCode("  }\n");
        }

        // @PageShowing lifecycle
        for (ExecutableElement m : page.getPageShowingMethods()) {
            method.addStatement("  page_$L.$L()", varName, m.getSimpleName());
        }

        // Mount to DOM
        method.addStatement("  if (page_$L.element != null) body.appendChild(page_$L.element)", varName, varName);
        method.addStatement("  this.currentPage = page_$L", varName);
        method.addStatement("  break");
    }

    /**
     * Generates the start() method required by the Navigation interface.
     * Navigates to the current URL hash if present, otherwise to the declared startingPage.
     * Emits a runtime alert if no startingPage was declared and no hash is present.
     */
    private MethodSpec buildStartMethod(ClassName windowClass) {
        MethodSpec.Builder method = MethodSpec.methodBuilder("start")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class);

        method.addStatement("$T hash = $T.current().getLocation().getHash()", String.class, windowClass);
        method.beginControlFlow("if (hash != null && !hash.isEmpty() && !hash.equals($S))", "#");
        method.addStatement("navigateToHash(hash)");
        method.nextControlFlow("else");
        if (startingPageRole != null) {
            method.addStatement("goTo($S)", startingPageRole);
        } else {
            method.addStatement("$T.alert($S)", windowClass,
                    "No starting page declared. Annotate a @Page with startingPage=true.");
        }
        method.endControlFlow();

        return method.build();
    }

    /**
     * Generates navigateToHash(String hash) — parses the Verrai hash format
     * (#role;key=value;key2=value2) and delegates to goTo(role, state).
     */
    private MethodSpec buildNavigateToHashMethod() {
        MethodSpec.Builder method = MethodSpec.methodBuilder("navigateToHash")
                .addModifiers(Modifier.PRIVATE)
                .addParameter(String.class, "hash");

        method.beginControlFlow("if (hash == null || hash.isEmpty() || hash.equals($S))", "#");
        method.addStatement("return");
        method.endControlFlow();

        method.addStatement("$T fragment = hash.startsWith($S) ? hash.substring(1) : hash",
                String.class, "#");
        method.addStatement("$T[] parts = fragment.split($S)", String.class, ";");
        method.addStatement("$T role = parts[0]", String.class);
        method.addStatement("$T<$T, $T> state = new $T<>()",
                Map.class, String.class, String.class, HashMap.class);
        method.beginControlFlow("for (int i = 1; i < parts.length; i++)");
        method.addStatement("$T[] kv = parts[i].split($S, 2)", String.class, "=");
        method.beginControlFlow("if (kv.length == 2)");
        method.addStatement("state.put(kv[0], kv[1])");
        method.endControlFlow();
        method.endControlFlow();
        method.addStatement("goTo(role, state)");

        return method.build();
    }

    /**
     * Generates registerPopstateListener() — called once from the factory after construction.
     * Handles browser back/forward by re-parsing the hash URL without pushing a new history entry.
     */
    private MethodSpec buildRegisterPopstateListenerMethod(ClassName windowClass) {
        MethodSpec.Builder method = MethodSpec.methodBuilder("registerPopstateListener")
                .addModifiers(Modifier.PUBLIC);

        method.addCode("$T.current().addEventListener($S, e -> {\n", windowClass, "popstate");
        method.addCode("  this.isPopstate = true;\n");
        method.addCode("  $T h = $T.current().getLocation().getHash();\n", String.class, windowClass);
        method.addCode("  navigateToHash(h);\n");
        method.addCode("  this.isPopstate = false;\n");
        method.addCode("});\n");

        return method.build();
    }

    /**
     * Generates callPageHiding(Object page) — dispatches @PageHiding to the outgoing page
     * while it is still mounted in the DOM.
     */
    private MethodSpec buildCallPageHidingMethod() {
        MethodSpec.Builder method = MethodSpec.methodBuilder("callPageHiding")
                .addModifiers(Modifier.PRIVATE)
                .addParameter(Object.class, "page");

        for (PageDefinition pageDef : collectedPages) {
            if (!pageDef.getPageHidingMethods().isEmpty()) {
                ClassName pageClass = ClassName.get(pageDef.getTypeElement());
                method.beginControlFlow("if (page instanceof $T)", pageClass);
                for (ExecutableElement m : pageDef.getPageHidingMethods()) {
                    method.addStatement("(($T) page).$L()", pageClass, m.getSimpleName());
                }
                method.endControlFlow();
            }
        }

        return method.build();
    }

    /**
     * Generates callPageHidden(Object page) — dispatches @PageHidden to the outgoing page
     * after subscriptions are cleared but before the new page mounts.
     */
    private MethodSpec buildCallPageHiddenMethod() {
        MethodSpec.Builder method = MethodSpec.methodBuilder("callPageHidden")
                .addModifiers(Modifier.PRIVATE)
                .addParameter(Object.class, "page");

        for (PageDefinition pageDef : collectedPages) {
            if (!pageDef.getPageHiddenMethods().isEmpty()) {
                ClassName pageClass = ClassName.get(pageDef.getTypeElement());
                method.beginControlFlow("if (page instanceof $T)", pageClass);
                for (ExecutableElement m : pageDef.getPageHiddenMethods()) {
                    method.addStatement("(($T) page).$L()", pageClass, m.getSimpleName());
                }
                method.endControlFlow();
            }
        }

        return method.build();
    }
}
