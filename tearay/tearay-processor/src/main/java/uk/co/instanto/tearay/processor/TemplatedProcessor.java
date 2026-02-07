package uk.co.instanto.tearay.processor;

import uk.co.instanto.tearay.api.DataField;
import uk.co.instanto.tearay.api.Templated;
import uk.co.instanto.tearay.api.RootElement;
import uk.co.instanto.tearay.api.IsWidget;
import uk.co.instanto.tearay.api.Bound;
import uk.co.instanto.tearay.api.Model;
import uk.co.instanto.tearay.api.TakesValue;

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
        ClassName fragmentClass = ClassName.get("org.teavm.jso.dom.xml", "DocumentFragment");

        MethodSpec.Builder bindMethod = MethodSpec.methodBuilder("bind")
                .addModifiers(javax.lang.model.element.Modifier.PUBLIC, javax.lang.model.element.Modifier.STATIC)
                .returns(htmlElementClass)
                .addParameter(com.squareup.javapoet.TypeName.get(typeElement.asType()), "target");

        bindMethod.addStatement("$T doc = $T.current().getDocument()", documentClass, windowClass);
        bindMethod.addStatement("$T root = doc.createElement($S)", htmlElementClass, "div");

        // Simple escaping for the demo.
        String escapedHtml = htmlContent.replace("\n", " ");
        bindMethod.addStatement("root.setInnerHTML($S)", escapedHtml);

        List<VariableElement> fields = ElementFilter.fieldsIn(typeElement.getEnclosedElements());

        // Bind element field
        for (VariableElement field : fields) {
             if (field.getSimpleName().toString().equals("element") &&
                 com.squareup.javapoet.TypeName.get(field.asType()).equals(htmlElementClass)) {
                 bindMethod.addStatement("target.element = root");
             }
        }

        // Query selectors for @DataField
        for (VariableElement field : fields) {
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
            }
        }

        // Move to DocumentFragment
        bindMethod.addStatement("$T fragment = doc.createDocumentFragment()", fragmentClass);
        bindMethod.beginControlFlow("while (root.hasChildNodes())");
        bindMethod.addStatement("fragment.appendChild(root.getFirstChild())");
        bindMethod.endControlFlow();

        // Process @DataField replacements
        for (VariableElement field : fields) {
            DataField dataField = field.getAnnotation(DataField.class);
            if (dataField != null) {
                bindMethod.beginControlFlow("if (el_$L != null)", field.getSimpleName());

                // Check if the field type is HTMLElement
                TypeElement htmlElementType = processingEnv.getElementUtils().getTypeElement("org.teavm.jso.dom.html.HTMLElement");
                boolean isHtmlElement = htmlElementType != null && processingEnv.getTypeUtils().isAssignable(field.asType(), htmlElementType.asType());

                if (isHtmlElement) {
                    bindMethod.addStatement("target.$L = ($T) el_$L",
                        field.getSimpleName(),
                        com.squareup.javapoet.TypeName.get(field.asType()),
                        field.getSimpleName());
                } else {
                    // Nested component
                    bindMethod.beginControlFlow("if (target.$L != null)", field.getSimpleName());
                    bindMethod.addStatement("$T widgetElement = target.$L.element", htmlElementClass, field.getSimpleName());
                    bindMethod.beginControlFlow("if (widgetElement != null)");

                    // Merge attributes (simplified)
                    bindMethod.addStatement("String placeholderClasses = el_$L.getClassName()", field.getSimpleName());
                    bindMethod.beginControlFlow("if (placeholderClasses != null && !placeholderClasses.isEmpty())");
                    bindMethod.addStatement("String currentClasses = widgetElement.getClassName()");
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

                    // Replace in DOM
                    bindMethod.addStatement("el_$L.getParentNode().replaceChild(widgetElement, el_$L)", field.getSimpleName(), field.getSimpleName());
                    bindMethod.endControlFlow();
                    bindMethod.endControlFlow();
                }
                bindMethod.endControlFlow();
            }
        }

        // DATA BINDING LOGIC
        VariableElement modelField = null;
        for (VariableElement field : fields) {
            if (field.getAnnotation(Model.class) != null) {
                modelField = field;
                break;
            }
        }

        if (modelField != null) {
            TypeElement modelType = (TypeElement) processingEnv.getTypeUtils().asElement(modelField.asType());
            java.util.Set<String> boundProperties = new java.util.HashSet<>();

            for (VariableElement field : fields) {
                Bound bound = field.getAnnotation(Bound.class);
                if (bound != null) {
                    String propertyName = bound.property();
                    if (propertyName.isEmpty()) {
                        propertyName = field.getSimpleName().toString();
                    }
                    boundProperties.add(propertyName);

                    // Capitalize for getter/setter
                    String capProp = propertyName.substring(0, 1).toUpperCase() + propertyName.substring(1);
                    String getterName = "get" + capProp;
                    String isGetterName = "is" + capProp;
                    String setterName = "set" + capProp;

                    // Validate Property Existence
                    ExecutableElement getterMethod = null;
                    ExecutableElement setterMethod = null;
                    String finalGetter = null;

                    // Scan methods (including inherited)
                    for (ExecutableElement method : ElementFilter.methodsIn(processingEnv.getElementUtils().getAllMembers(modelType))) {
                        String methodName = method.getSimpleName().toString();
                        if (methodName.equals(getterName) && method.getParameters().isEmpty()) {
                            getterMethod = method;
                            finalGetter = getterName;
                        } else if (methodName.equals(isGetterName) && method.getParameters().isEmpty()) {
                            getterMethod = method;
                            finalGetter = isGetterName;
                        }
                        if (methodName.equals(setterName) && method.getParameters().size() == 1) {
                            setterMethod = method;
                        }
                    }

                    if (getterMethod == null) {
                        processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                            "Property '" + propertyName + "' not found in model " + modelType.getSimpleName() + ". Missing getter: " + getterName + "() or " + isGetterName + "()",
                            field);
                        continue;
                    } else if (!getterMethod.getModifiers().contains(javax.lang.model.element.Modifier.PUBLIC)) {
                        processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                            "Getter '" + finalGetter + "()' for property '" + propertyName + "' in model " + modelType.getSimpleName() + " is not public.",
                            field);
                        continue;
                    }

                    if (setterMethod == null) {
                        processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                            "Property '" + propertyName + "' is read-only in model " + modelType.getSimpleName() + ". Missing setter: " + setterName + "(...)",
                            field);
                        continue;
                    } else if (!setterMethod.getModifiers().contains(javax.lang.model.element.Modifier.PUBLIC)) {
                        processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                            "Setter '" + setterName + "(...)' for property '" + propertyName + "' in model " + modelType.getSimpleName() + " is not public.",
                            field);
                        continue;
                    }

                    // Check Type Compatibility
                    // Ideally we check TakesValue<V> on the widget type against Property Type P
                    // However, resolving generic arguments on interface implementations is complex in AP.
                    // For MVP, checking direct assignment compatibility (P assignable to V) is tricky if V is boxed and P is primitive.
                    // Instead, we will rely on generated code to fail compilation if types mismatch,
                    // OR we can check simple cases where we know the widget type (e.g. TextBox -> String).

                    bindMethod.beginControlFlow("if (target.$L != null && target.$L != null)", modelField.getSimpleName(), field.getSimpleName());

                    // 1. Initial set
                    bindMethod.addStatement("target.$L.setValue(target.$L.$L())",
                        field.getSimpleName(), modelField.getSimpleName(), finalGetter);

                    // 2. Change handler
                    bindMethod.addCode("((uk.co.instanto.tearay.api.IsWidget)target.$L).getElement().addEventListener(\"change\", e -> {\n", field.getSimpleName());
                    bindMethod.addStatement("  target.$L.$L(target.$L.getValue())", modelField.getSimpleName(), setterName, field.getSimpleName());
                    bindMethod.addCode("});\n");

                    bindMethod.endControlFlow();
                }
            }

            // Detect Unbound Properties
            java.util.Set<String> allProperties = new java.util.HashSet<>();
            for (ExecutableElement method : ElementFilter.methodsIn(processingEnv.getElementUtils().getAllMembers(modelType))) {
                String methodName = method.getSimpleName().toString();
                if (method.getParameters().isEmpty() && !method.getModifiers().contains(javax.lang.model.element.Modifier.STATIC) && method.getModifiers().contains(javax.lang.model.element.Modifier.PUBLIC)) {
                    if (methodName.startsWith("get") && methodName.length() > 3) {
                         String prop = methodName.substring(3);
                         prop = prop.substring(0, 1).toLowerCase() + prop.substring(1);
                         // Check for corresponding setter
                         boolean setterExists = false;
                         String targetSetter = "set" + methodName.substring(3);
                         for (ExecutableElement m : ElementFilter.methodsIn(processingEnv.getElementUtils().getAllMembers(modelType))) {
                             if (m.getSimpleName().toString().equals(targetSetter) && m.getParameters().size() == 1) {
                                 setterExists = true;
                                 break;
                             }
                         }
                         if (setterExists && !prop.equals("class")) {
                             allProperties.add(prop);
                         }
                    } else if (methodName.startsWith("is") && methodName.length() > 2) {
                         String prop = methodName.substring(2);
                         prop = prop.substring(0, 1).toLowerCase() + prop.substring(1);
                          // Check for corresponding setter
                         boolean setterExists = false;
                         String targetSetter = "set" + methodName.substring(2);
                         for (ExecutableElement m : ElementFilter.methodsIn(processingEnv.getElementUtils().getAllMembers(modelType))) {
                             if (m.getSimpleName().toString().equals(targetSetter) && m.getParameters().size() == 1) {
                                 setterExists = true;
                                 break;
                             }
                         }
                         if (setterExists) {
                             allProperties.add(prop);
                         }
                    }
                }
            }

            allProperties.removeAll(boundProperties);
            if (!allProperties.isEmpty()) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.WARNING,
                    "The following properties in model " + modelType.getSimpleName() + " are not bound: " + allProperties,
                    typeElement);
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
}
