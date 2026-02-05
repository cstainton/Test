package uk.co.instanto.tearay.processor;

import uk.co.instanto.tearay.api.DataField;
import uk.co.instanto.tearay.api.Templated;
import com.squareup.javapoet.JavaFile;
import com.squareup.javapoet.MethodSpec;
import com.squareup.javapoet.TypeSpec;
import com.squareup.javapoet.ClassName;
import com.google.auto.service.AutoService;

import javax.annotation.processing.*;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.*;
import javax.lang.model.util.ElementFilter;
import javax.tools.Diagnostic;
import javax.tools.FileObject;
import javax.tools.StandardLocation;
import java.io.IOException;
import java.util.Set;

@AutoService(Processor.class)
@SupportedAnnotationTypes("uk.co.instanto.tearay.api.Templated")
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class TemplatedProcessor extends AbstractProcessor {

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        for (Element element : roundEnv.getElementsAnnotatedWith(Templated.class)) {
            if (element.getKind() != ElementKind.CLASS) continue;
            try {
                processType((TypeElement) element);
            } catch (Exception e) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "Error processing @Templated: " + e.getMessage(), element);
                e.printStackTrace();
            }
        }
        return true;
    }

    private void processType(TypeElement typeElement) throws IOException {
        Templated annotation = typeElement.getAnnotation(Templated.class);
        String templateName = annotation.value();
        if (templateName.isEmpty()) {
            templateName = typeElement.getSimpleName() + ".html";
        }

        String htmlContent = readTemplate(typeElement, templateName);
        if (htmlContent == null) return;

        String packageName = processingEnv.getElementUtils().getPackageOf(typeElement).getQualifiedName().toString();
        String binderName = typeElement.getSimpleName() + "_Binder";

        ClassName htmlElementClass = ClassName.get("org.teavm.jso.dom.html", "HTMLElement");
        ClassName windowClass = ClassName.get("org.teavm.jso.browser", "Window");
        ClassName documentClass = ClassName.get("org.teavm.jso.dom.html", "HTMLDocument");

        MethodSpec.Builder bindMethod = MethodSpec.methodBuilder("bind")
                .addModifiers(javax.lang.model.element.Modifier.PUBLIC, javax.lang.model.element.Modifier.STATIC)
                .returns(htmlElementClass)
                .addParameter(com.squareup.javapoet.TypeName.get(typeElement.asType()), "target");

        bindMethod.addStatement("$T doc = $T.current().getDocument()", documentClass, windowClass);
        bindMethod.addStatement("$T root = doc.createElement($S)", htmlElementClass, "div");

        // Simple escaping for the demo.
        // NOTE: JavaPoet $S handles quoting, but we need to flatten newlines to keep the string cleaner in generated source.
        // We do NOT escape quotes manually because JavaPoet does that.
        String escapedHtml = htmlContent.replace("\n", " ");
        bindMethod.addStatement("root.setInnerHTML($S)", escapedHtml);

        // Assign root if a field "element" exists (Convention for this PoC)
        // In a real framework, we'd look for an interface like IsWidget or a specific annotation.
        for (VariableElement field : ElementFilter.fieldsIn(typeElement.getEnclosedElements())) {
             if (field.getSimpleName().toString().equals("element") &&
                 com.squareup.javapoet.TypeName.get(field.asType()).equals(htmlElementClass)) {
                 bindMethod.addStatement("target.element = root");
             }
        }

        for (VariableElement field : ElementFilter.fieldsIn(typeElement.getEnclosedElements())) {
            DataField dataField = field.getAnnotation(DataField.class);
            if (dataField != null) {
                String dataFieldName = dataField.value();
                if (dataFieldName.isEmpty()) {
                    dataFieldName = field.getSimpleName().toString();
                }

                bindMethod.addStatement("$T el_$L = root.querySelector($S)",
                    htmlElementClass,
                    field.getSimpleName(),
                    "[data-field='" + dataFieldName + "']");

                bindMethod.beginControlFlow("if (el_$L != null)", field.getSimpleName());

                // Check if the field type is HTMLElement
                if (processingEnv.getTypeUtils().isAssignable(field.asType(), processingEnv.getElementUtils().getTypeElement("org.teavm.jso.dom.html.HTMLElement").asType())) {
                    bindMethod.addStatement("target.$L = ($T) el_$L",
                        field.getSimpleName(),
                        com.squareup.javapoet.TypeName.get(field.asType()),
                        field.getSimpleName());
                } else {
                    // Assume it is a nested component.
                    // 1. Check if the component is injected. (If not, we might need to instantiate it, but let's assume IOC handles it)
                    // The IOCProcessor injects the bean. Here we just need to SWAP the element.
                    // But wait, if we are in the Binder, 'target' is already instantiated.
                    // 'target.field' should be populated by IOC if it has @Inject.

                    // Logic:
                    // 1. Get the component instance from the field.
                    // 2. Access its 'element' field (Convention!).
                    // 3. Replace 'el_field' with 'component.element' in the DOM.

                    bindMethod.beginControlFlow("if (target.$L != null)", field.getSimpleName());
                    // We need to access target.field.element.
                    // Since we don't know the exact type structure at compile time easily without reflection or strict rules,
                    // we will cast to a convention or assume public field 'element'.
                    // For this PoC, we assume the component has a public 'element' field of type HTMLElement.
                    // We can't easily check fields of other classes in APT without full TypeMirror resolution, which is doable but verbose.
                    // Let's generate code that assumes it exists.

                    bindMethod.addStatement("$T widgetElement = target.$L.element", htmlElementClass, field.getSimpleName());
                    bindMethod.beginControlFlow("if (widgetElement != null)");

                    // Merge attributes from placeholder to widget
                    // 1. Merge CSS classes
                    bindMethod.addStatement("String currentClasses = widgetElement.getClassName()");
                    bindMethod.addStatement("String placeholderClasses = el_$L.getClassName()", field.getSimpleName());
                    bindMethod.beginControlFlow("if (placeholderClasses != null && !placeholderClasses.isEmpty())");
                    bindMethod.addStatement("widgetElement.setClassName((currentClasses != null ? currentClasses + \" \" : \"\") + placeholderClasses)");
                    bindMethod.endControlFlow();

                    // 2. Copy ID if present on placeholder
                    bindMethod.addStatement("String placeholderId = el_$L.getAttribute(\"id\")", field.getSimpleName());
                    bindMethod.beginControlFlow("if (placeholderId != null && !placeholderId.isEmpty())");
                    bindMethod.addStatement("widgetElement.setAttribute(\"id\", placeholderId)");
                    bindMethod.endControlFlow();

                    // 3. Copy Style
                    bindMethod.addStatement("String placeholderStyle = el_$L.getAttribute(\"style\")", field.getSimpleName());
                    bindMethod.beginControlFlow("if (placeholderStyle != null && !placeholderStyle.isEmpty())");
                    // Simple concatenation for style string; robust parsing is too complex for this PoC
                    bindMethod.addStatement("String currentStyle = widgetElement.getAttribute(\"style\")");
                    bindMethod.addStatement("widgetElement.setAttribute(\"style\", (currentStyle != null ? currentStyle + \";\" : \"\") + placeholderStyle)");
                    bindMethod.endControlFlow();

                    bindMethod.addStatement("el_$L.getParentNode().replaceChild(widgetElement, el_$L)", field.getSimpleName(), field.getSimpleName());
                    bindMethod.endControlFlow();

                    bindMethod.endControlFlow();
                }

                bindMethod.endControlFlow();
            }
        }

        bindMethod.addStatement("return root");

        TypeSpec binderClass = TypeSpec.classBuilder(binderName)
                .addModifiers(javax.lang.model.element.Modifier.PUBLIC)
                .addMethod(bindMethod.build())
                .build();

        JavaFile.builder(packageName, binderClass)
                .build()
                .writeTo(processingEnv.getFiler());
    }

    private String readTemplate(TypeElement typeElement, String templateName) {
         String packageName = processingEnv.getElementUtils().getPackageOf(typeElement).getQualifiedName().toString();
         // Try SOURCE_PATH first as it is more likely for sources
         try {
             FileObject resource = processingEnv.getFiler().getResource(StandardLocation.SOURCE_PATH, packageName, templateName);
             return resource.getCharContent(true).toString();
         } catch (Exception e) {
             // Try CLASS_PATH
             try {
                 FileObject resource = processingEnv.getFiler().getResource(StandardLocation.CLASS_PATH, packageName, templateName);
                 return resource.getCharContent(true).toString();
             } catch (Exception ex) {
                 processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "Could not find template: " + templateName + " in package " + packageName, typeElement);
                 return null;
             }
         }
    }
}
