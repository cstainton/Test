package dev.verrai.processor;

import dev.verrai.api.Page;
import dev.verrai.api.PageHidden;
import dev.verrai.api.PageHiding;
import dev.verrai.api.PageShowing;
import dev.verrai.api.PageState;
import dev.verrai.security.RestrictedAccess;
import jakarta.enterprise.context.ApplicationScoped;
import dev.verrai.processor.model.PageDefinition;
import dev.verrai.processor.visitor.NavigationImplWriter;
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
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AutoService(Processor.class)
@SupportedAnnotationTypes({ "dev.verrai.api.Page", "dev.verrai.api.PageState",
        "jakarta.enterprise.context.ApplicationScoped" })
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class NavigationProcessor extends AbstractProcessor {

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        Set<? extends Element> pages = roundEnv.getElementsAnnotatedWith(Page.class);

        TypeElement securityProviderImpl = findSecurityProvider(roundEnv);

        if (pages.isEmpty())
            return false;

        if (processingEnv.getElementUtils().getTypeElement("dev.verrai.impl.NavigationImpl") != null) {
            return false;
        }

        try {
            List<PageDefinition> pageDefinitions = new ArrayList<>();
            for (Element element : pages) {
                TypeElement typeElement = (TypeElement) element;
                Page pageAnno = typeElement.getAnnotation(Page.class);

                // Fix: use path as role fallback before defaulting to class name
                String role = pageAnno.role();
                if (role.isEmpty()) {
                    role = pageAnno.path();
                }
                if (role.isEmpty()) {
                    role = typeElement.getSimpleName().toString();
                }

                boolean isStartingPage = pageAnno.startingPage();
                RestrictedAccess restricted = typeElement.getAnnotation(RestrictedAccess.class);

                List<VariableElement> pageStateFields = new ArrayList<>();
                for (VariableElement field : ElementFilter.fieldsIn(typeElement.getEnclosedElements())) {
                    if (field.getAnnotation(PageState.class) != null) {
                        // Gap 12: @PageState fields must be String — values come from URL hash segments
                        String typeName = field.asType().toString();
                        if (!typeName.equals("java.lang.String")) {
                            processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                                    "@PageState field '" + field.getSimpleName() + "' in "
                                    + typeElement.getSimpleName() + " must be of type String "
                                    + "(got " + typeName + "). Values are extracted from the URL hash.",
                                    field);
                        }
                        pageStateFields.add(field);
                    }
                }

                List<ExecutableElement> pageShowingMethods = new ArrayList<>();
                List<ExecutableElement> pageHidingMethods = new ArrayList<>();
                List<ExecutableElement> pageHiddenMethods = new ArrayList<>();
                for (ExecutableElement method : ElementFilter.methodsIn(typeElement.getEnclosedElements())) {
                    if (method.getAnnotation(PageShowing.class) != null) {
                        pageShowingMethods.add(method);
                    }
                    if (method.getAnnotation(PageHiding.class) != null) {
                        pageHidingMethods.add(method);
                    }
                    if (method.getAnnotation(PageHidden.class) != null) {
                        pageHiddenMethods.add(method);
                    }
                }

                pageDefinitions.add(new PageDefinition(typeElement, role, restricted,
                        pageStateFields, pageShowingMethods, pageHidingMethods,
                        pageHiddenMethods, isStartingPage));
            }

            // Gap 1: Multiple startingPage=true is a compile error — last one would silently win
            // Gap 2: Duplicate role names — both pages would be unreachable except the last
            Set<String> seenRoles = new HashSet<>();
            int startingPageCount = 0;
            boolean validationFailed = false;
            for (PageDefinition pd : pageDefinitions) {
                if (pd.isStartingPage()) {
                    startingPageCount++;
                    if (startingPageCount > 1) {
                        processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                                "Multiple @Page classes declare startingPage=true. " +
                                "Only one page may be the starting page.",
                                pd.getTypeElement());
                        validationFailed = true;
                    }
                }
                if (!seenRoles.add(pd.getRole())) {
                    processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                            "Duplicate @Page role \"" + pd.getRole() + "\" on "
                            + pd.getTypeElement().getSimpleName() + ". Each page must have a unique role.",
                            pd.getTypeElement());
                    validationFailed = true;
                }
            }
            if (validationFailed) return false;

            if (startingPageCount == 0) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.WARNING,
                        "No @Page with startingPage=true found. " +
                        "navigation.start() will show an alert if the URL has no hash.");
            }

            NavigationImplWriter writer = new NavigationImplWriter(processingEnv, securityProviderImpl);
            for (PageDefinition pageDef : pageDefinitions) {
                writer.visit(pageDef);
            }
            writer.write(processingEnv.getFiler());

            generateNavigationFactory(securityProviderImpl);

        } catch (IOException e) {
            e.printStackTrace();
            processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                    "Error generating NavigationImpl: " + e.getMessage());
        }

        return false;
    }

    private TypeElement findSecurityProvider(RoundEnvironment roundEnv) {
        TypeMirror securityProviderInterface = processingEnv.getElementUtils()
                .getTypeElement("dev.verrai.security.SecurityProvider").asType();
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

    private void generateNavigationFactory(TypeElement securityProviderImpl) throws IOException {
        ClassName navImplClass = ClassName.get("dev.verrai.impl", "NavigationImpl");

        MethodSpec.Builder getInstance = MethodSpec.methodBuilder("getInstance")
                .addModifiers(Modifier.PUBLIC, Modifier.STATIC)
                .returns(navImplClass);

        getInstance.beginControlFlow("if (instance == null)")
                .addStatement("instance = new $T()", navImplClass);

        if (securityProviderImpl != null) {
            ClassName providerFactory = ClassName
                    .bestGuess(securityProviderImpl.getQualifiedName().toString() + "_Factory");
            getInstance.addStatement("instance.securityProvider = $T.getInstance()", providerFactory);
        }

        // Register popstate listener once after instance is fully initialized
        getInstance.addStatement("instance.registerPopstateListener()");

        getInstance.endControlFlow()
                .addStatement("return instance");

        TypeSpec factory = TypeSpec.classBuilder("NavigationImpl_Factory")
                .addModifiers(Modifier.PUBLIC)
                .addField(FieldSpec.builder(navImplClass, "instance")
                        .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                        .build())
                .addMethod(getInstance.build())
                .build();

        JavaFile.builder("dev.verrai.impl", factory)
                .build()
                .writeTo(processingEnv.getFiler());
    }
}
