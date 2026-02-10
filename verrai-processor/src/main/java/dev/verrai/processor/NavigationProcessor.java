package dev.verrai.processor;

import dev.verrai.api.Page;
import dev.verrai.api.PageShowing;
import dev.verrai.api.PageState;
import dev.verrai.api.RestrictedAccess;
import dev.verrai.api.ApplicationScoped;
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
import java.util.List;
import java.util.Set;

@AutoService(Processor.class)
@SupportedAnnotationTypes({"dev.verrai.api.Page", "dev.verrai.api.PageState", "dev.verrai.api.ApplicationScoped"})
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class NavigationProcessor extends AbstractProcessor {

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        Set<? extends Element> pages = roundEnv.getElementsAnnotatedWith(Page.class);

        // We also need to find the SecurityProvider
        TypeElement securityProviderImpl = findSecurityProvider(roundEnv);

        if (pages.isEmpty()) return false;

        // Only generate once
        if (processingEnv.getElementUtils().getTypeElement("dev.verrai.impl.NavigationImpl") != null) {
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
                 for (ExecutableElement method : ElementFilter.methodsIn(typeElement.getEnclosedElements())) {
                     if (method.getAnnotation(PageShowing.class) != null) {
                         pageShowingMethods.add(method);
                     }
                 }

                 pageDefinitions.add(new PageDefinition(typeElement, role, restricted, pageStateFields, pageShowingMethods));
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
        TypeMirror securityProviderInterface = processingEnv.getElementUtils().getTypeElement("dev.verrai.api.SecurityProvider").asType();
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

        JavaFile.builder("dev.verrai.impl", factory)
                .build()
                .writeTo(processingEnv.getFiler());
    }
}
