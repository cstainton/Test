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
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Set;

@AutoService(Processor.class)
@SupportedAnnotationTypes("uk.co.instanto.tearay.api.Templated")
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class TemplatedProcessor extends AbstractProcessor {

    private final Map<String, String> templateCache = new HashMap<>();

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
                .addModifiers(Modifier.PUBLIC, Modifier.STATIC)
                .returns(htmlElementClass)
                .addParameter(com.squareup.javapoet.TypeName.get(typeElement.asType()), "target");

        bindMethod.addStatement("$T doc = $T.current().getDocument()", documentClass, windowClass);
        bindMethod.addStatement("$T root = doc.createElement($S)", htmlElementClass, "div");

        String escapedHtml = htmlContent.replace("\n", " ").replace("\"", "\\\"");
        bindMethod.addStatement("root.setInnerHTML($S)", escapedHtml);

        List<VariableElement> fields = ElementFilter.fieldsIn(typeElement.getEnclosedElements());

        // Assign root to 'element' field if exists
        for (VariableElement field : fields) {
             if (field.getSimpleName().toString().equals("element") &&
                 com.squareup.javapoet.TypeName.get(field.asType()).equals(htmlElementClass)) {
                 bindMethod.addStatement("target.element = root");
             }
        }

        // Process @DataField
        for (VariableElement field : fields) {
            DataField dataField = field.getAnnotation(DataField.class);
            if (dataField != null) {
                String dataFieldName = dataField.value();
                if (dataFieldName.isEmpty()) {
                    dataFieldName = field.getSimpleName().toString();
                }

                // Query element
                bindMethod.addStatement("$T el_$L = ($T) root.querySelector($S)",
                        htmlElementClass, field.getSimpleName(), htmlElementClass, "[data-field='" + dataFieldName + "']");

                bindMethod.beginControlFlow("if (el_$L != null)", field.getSimpleName());

                // Check if field is HTMLElement
                 TypeElement htmlElementType = processingEnv.getElementUtils().getTypeElement("org.teavm.jso.dom.html.HTMLElement");
                 if (htmlElementType != null && processingEnv.getTypeUtils().isAssignable(field.asType(), htmlElementType.asType())) {
                    bindMethod.addStatement("target.$L = ($T) el_$L",
                        field.getSimpleName(),
                        com.squareup.javapoet.TypeName.get(field.asType()),
                        field.getSimpleName());
                 } else {
                     // Assume Widget or Component with 'element' field
                     // Check if target field is not null (initialized)
                     bindMethod.beginControlFlow("if (target.$L != null)", field.getSimpleName());
                     // Assume target.$L has .element field or .getElement() method?
                     // Convention: .element field access or IsWidget interface?
                     // I'll assume .element field for now based on previous code.
                     bindMethod.addStatement("$T widgetElement = target.$L.element", htmlElementClass, field.getSimpleName());

                     bindMethod.beginControlFlow("if (widgetElement != null)");
                     bindMethod.addStatement("el_$L.getParentNode().replaceChild(widgetElement, el_$L)", field.getSimpleName(), field.getSimpleName());
                     bindMethod.endControlFlow();

                     bindMethod.endControlFlow();
                 }

                bindMethod.endControlFlow();
            }
        }

        bindMethod.addStatement("return root");

        TypeSpec binderClass = TypeSpec.classBuilder(binderName)
                .addModifiers(Modifier.PUBLIC)
                .addMethod(bindMethod.build())
                .build();

        JavaFile.builder(packageName, binderClass)
                .build()
                .writeTo(processingEnv.getFiler());
    }

    private String readTemplate(TypeElement typeElement, String templateName) {
         String packageName = processingEnv.getElementUtils().getPackageOf(typeElement).getQualifiedName().toString();
         String cacheKey = packageName + ":" + templateName;
         if (templateCache.containsKey(cacheKey)) {
             return templateCache.get(cacheKey);
         }

         try {
             FileObject resource = processingEnv.getFiler().getResource(StandardLocation.SOURCE_PATH, packageName, templateName);
             String content = resource.getCharContent(true).toString();
             templateCache.put(cacheKey, content);
             return content;
         } catch (Exception e) {
             try {
                 FileObject resource = processingEnv.getFiler().getResource(StandardLocation.CLASS_PATH, packageName, templateName);
                 String content = resource.getCharContent(true).toString();
                 templateCache.put(cacheKey, content);
                 return content;
             } catch (Exception ex) {
                 // Suppress error or warn
                 return null;
             }
         }
    }
}
