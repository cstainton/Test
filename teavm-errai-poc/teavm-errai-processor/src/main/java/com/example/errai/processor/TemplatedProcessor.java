package com.example.errai.processor;

import com.example.errai.api.DataField;
import com.example.errai.api.Templated;
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
@SupportedAnnotationTypes("com.example.errai.api.Templated")
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
                bindMethod.addStatement("target.$L = ($T) el_$L",
                    field.getSimpleName(),
                    com.squareup.javapoet.TypeName.get(field.asType()),
                    field.getSimpleName());
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
