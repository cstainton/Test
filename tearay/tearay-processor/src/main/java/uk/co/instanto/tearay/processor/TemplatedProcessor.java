package uk.co.instanto.tearay.processor;

import uk.co.instanto.tearay.api.DataField;
import uk.co.instanto.tearay.api.Templated;
import com.squareup.javapoet.JavaFile;
import com.squareup.javapoet.MethodSpec;
import com.squareup.javapoet.TypeSpec;
import com.squareup.javapoet.ClassName;
import com.squareup.javapoet.ParameterizedTypeName;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
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
        ClassName nodeListClass = ClassName.get("org.teavm.jso.dom.xml", "NodeList");
        ClassName elementClass = ClassName.get("org.teavm.jso.dom.xml", "Element");

        MethodSpec.Builder bindMethod = MethodSpec.methodBuilder("bind")
                .addModifiers(javax.lang.model.element.Modifier.PUBLIC, javax.lang.model.element.Modifier.STATIC)
                .returns(htmlElementClass)
                .addParameter(com.squareup.javapoet.TypeName.get(typeElement.asType()), "target");

        bindMethod.addStatement("$T doc = $T.current().getDocument()", documentClass, windowClass);
        bindMethod.addStatement("$T root = doc.createElement($S)", htmlElementClass, "div");

        // Simple escaping for the demo.
        String escapedHtml = htmlContent.replace("\n", " ");
        bindMethod.addStatement("root.setInnerHTML($S)", escapedHtml);

        // Assign root if a field "element" exists (Convention for this PoC)
        // In a real framework, we'd look for an interface like IsWidget or a specific annotation.
        List<VariableElement> fields = ElementFilter.fieldsIn(typeElement.getEnclosedElements());
        for (VariableElement field : fields) {
             if (field.getSimpleName().toString().equals("element") &&
                 com.squareup.javapoet.TypeName.get(field.asType()).equals(htmlElementClass)) {
                 bindMethod.addStatement("target.element = root");
             }
        }

        for (VariableElement field : fields) {
            DataField dataField = field.getAnnotation(DataField.class);
            if (dataField != null) {
                String dataFieldName = dataField.value();
                if (dataFieldName.isEmpty()) {
                    dataFieldName = field.getSimpleName().toString();
                }
                bindMethod.addCode("case $S:\n", dataFieldName);
                bindMethod.addStatement("  if (el_$L == null) el_$L = ($T) candidate", field.getSimpleName(), field.getSimpleName(), htmlElementClass);
                bindMethod.addStatement("  break");
            }
            bindMethod.endControlFlow(); // switch
            bindMethod.endControlFlow(); // for

            for (VariableElement field : dataFields) {
                // Reuse existing binding logic structure but check el_field != null
                bindMethod.addStatement("$T el_$L = root.querySelector($S)",
                    htmlElementClass,
                    field.getSimpleName(),
                    "[data-field='" + dataFieldName + "']");
            }
        }

        // 2. Move to DocumentFragment to avoid reflows during manipulation
        ClassName fragmentClass = ClassName.get("org.teavm.jso.dom.xml", "DocumentFragment");
        bindMethod.addStatement("$T fragment = doc.createDocumentFragment()", fragmentClass);
        bindMethod.beginControlFlow("while (root.hasChildNodes())");
        bindMethod.addStatement("fragment.appendChild(root.getFirstChild())");
        bindMethod.endControlFlow();

        // 3. Process fields
        for (VariableElement field : ElementFilter.fieldsIn(typeElement.getEnclosedElements())) {
            DataField dataField = field.getAnnotation(DataField.class);
            if (dataField != null) {
                bindMethod.beginControlFlow("if (el_$L != null)", field.getSimpleName());

                // Check if the field type is HTMLElement
                TypeElement htmlElementType = processingEnv.getElementUtils().getTypeElement("org.teavm.jso.dom.html.HTMLElement");
                if (htmlElementType != null && processingEnv.getTypeUtils().isAssignable(field.asType(), htmlElementType.asType())) {
                    bindMethod.addStatement("target.$L = ($T) el_$L",
                        field.getSimpleName(),
                        com.squareup.javapoet.TypeName.get(field.asType()),
                        field.getSimpleName());
                } else {
                    // Assume it is a nested component.
                    bindMethod.beginControlFlow("if (target.$L != null)", field.getSimpleName());
                    bindMethod.addStatement("$T widgetElement = target.$L.element", htmlElementClass, field.getSimpleName());
                    bindMethod.beginControlFlow("if (widgetElement != null)");

                    // Merge attributes
                    bindMethod.addStatement("String currentClasses = widgetElement.getClassName()");
                    bindMethod.addStatement("String placeholderClasses = el_$L.getClassName()", field.getSimpleName());
                    bindMethod.beginControlFlow("if (placeholderClasses != null && !placeholderClasses.isEmpty())");
                    bindMethod.addStatement("widgetElement.setClassName((currentClasses != null ? currentClasses + \" \" : \"\") + placeholderClasses)");
                    bindMethod.endControlFlow();

                    bindMethod.addStatement("String placeholderId = el_$L.getAttribute(\"id\")", field.getSimpleName());
                    bindMethod.beginControlFlow("if (placeholderId != null && !placeholderId.isEmpty())");
                    bindMethod.addStatement("widgetElement.setAttribute(\"id\", placeholderId)");
                    bindMethod.endControlFlow();

                    bindMethod.addStatement("String placeholderStyle = el_$L.getAttribute(\"style\")", field.getSimpleName());
                    bindMethod.beginControlFlow("if (placeholderStyle != null && !placeholderStyle.isEmpty())");
                    bindMethod.addStatement("String currentStyle = widgetElement.getAttribute(\"style\")");
                    bindMethod.addStatement("widgetElement.setAttribute(\"style\", (currentStyle != null ? currentStyle + \";\" : \"\") + placeholderStyle)");
                    bindMethod.endControlFlow();

                    // Replace in DOM (now in Fragment)
                    bindMethod.addStatement("el_$L.getParentNode().replaceChild(widgetElement, el_$L)", field.getSimpleName(), field.getSimpleName());
                    bindMethod.endControlFlow();

                    bindMethod.endControlFlow();
                }

                bindMethod.endControlFlow();
            }
        }

        bindMethod.addStatement("root.appendChild(fragment)");
        bindMethod.addStatement("return root");

        TypeSpec binderClass = TypeSpec.classBuilder(binderName)
                .addModifiers(javax.lang.model.element.Modifier.PUBLIC)
                .addMethod(bindMethod.build())
                .build();

        JavaFile.builder(packageName, binderClass)
                .build()
                .writeTo(processingEnv.getFiler());
    }

    private final Map<String, String> templateCache = new HashMap<>();

    private String readTemplate(TypeElement typeElement, String templateName) {
         String packageName = processingEnv.getElementUtils().getPackageOf(typeElement).getQualifiedName().toString();
         String cacheKey = packageName + ":" + templateName;
         if (templateCache.containsKey(cacheKey)) {
             return templateCache.get(cacheKey);
         }

         // Try SOURCE_PATH first as it is more likely for sources
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
                 processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "Could not find template: " + templateName + " in package " + packageName, typeElement);
                 return null;
             }
         }
    }

    private VariableElement findPublicElementField(javax.lang.model.type.TypeMirror typeMirror) {
        if (typeMirror.getKind() != javax.lang.model.type.TypeKind.DECLARED) {
            return null;
        }
        TypeElement typeElement = (TypeElement) ((javax.lang.model.type.DeclaredType) typeMirror).asElement();
        if (typeElement == null) {
            return null;
        }

        // Check fields in this class
        for (VariableElement field : ElementFilter.fieldsIn(typeElement.getEnclosedElements())) {
            if (field.getSimpleName().toString().equals("element") &&
                field.getModifiers().contains(javax.lang.model.element.Modifier.PUBLIC)) {

                // Check if it is HTMLElement or subtype
                 TypeElement htmlElementType = processingEnv.getElementUtils().getTypeElement("org.teavm.jso.dom.html.HTMLElement");
                 if (htmlElementType != null && processingEnv.getTypeUtils().isAssignable(field.asType(), htmlElementType.asType())) {
                    return field;
                 }
            }
        }

        // Check superclass
        javax.lang.model.type.TypeMirror superclass = typeElement.getSuperclass();
        if (superclass.getKind() != javax.lang.model.type.TypeKind.NONE) {
            return findPublicElementField(superclass);
        }

        return null;
    }
}
