package uk.co.instanto.tearay.processor;

import uk.co.instanto.tearay.api.Page;
import uk.co.instanto.tearay.api.PageShowing;
import uk.co.instanto.tearay.api.PageShown;
import uk.co.instanto.tearay.api.PageHiding;
import uk.co.instanto.tearay.api.PageHidden;
import uk.co.instanto.tearay.api.PageState;
import uk.co.instanto.tearay.api.RestrictedAccess;
import uk.co.instanto.tearay.api.ApplicationScoped;
import uk.co.instanto.tearay.processor.model.PageDefinition;
import uk.co.instanto.tearay.processor.visitor.NavigationImplWriter;
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
import java.util.List;
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
            List<PageDefinition> pageDefinitions = new ArrayList<>();
            for (Element element : pages) {
                 TypeElement typeElement = (TypeElement) element;
                 Page pageAnno = typeElement.getAnnotation(Page.class);
                 String role = pageAnno.role();
                 if (role.isEmpty()) role = typeElement.getSimpleName().toString();

                 RestrictedAccess restricted = typeElement.getAnnotation(RestrictedAccess.class);

                 List<VariableElement> pageStateFields = new ArrayList<>();
                 for (VariableElement field : ElementFilter.fieldsIn(typeElement.getEnclosedElements())) {
                     if (field.getAnnotation(PageState.class) != null) {
                         pageStateFields.add(field);
                     }
                 }

                 List<ExecutableElement> pageShowingMethods = new ArrayList<>();
                 List<ExecutableElement> pageShownMethods = new ArrayList<>();
                 List<ExecutableElement> pageHidingMethods = new ArrayList<>();
                 List<ExecutableElement> pageHiddenMethods = new ArrayList<>();

                 for (ExecutableElement method : ElementFilter.methodsIn(typeElement.getEnclosedElements())) {
                     if (method.getAnnotation(PageShowing.class) != null) {
                         pageShowingMethods.add(method);
                     }
                     if (method.getAnnotation(PageShown.class) != null) {
                         pageShownMethods.add(method);
                     }
                     if (method.getAnnotation(PageHiding.class) != null) {
                         pageHidingMethods.add(method);
                     }
                     if (method.getAnnotation(PageHidden.class) != null) {
                         pageHiddenMethods.add(method);
                     }
                 }

                 pageDefinitions.add(new PageDefinition(typeElement, role, restricted, pageStateFields, pageShowingMethods, pageShownMethods, pageHidingMethods, pageHiddenMethods));
            }

            NavigationImplWriter writer = new NavigationImplWriter(processingEnv, securityProviderImpl);
            for (PageDefinition pageDef : pageDefinitions) {
                writer.visit(pageDef);
            }
            writer.write(processingEnv.getFiler());

            generateNavigationFactory(securityProviderImpl);

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
