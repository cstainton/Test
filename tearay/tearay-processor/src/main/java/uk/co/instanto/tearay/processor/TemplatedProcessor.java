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
import com.squareup.javapoet.WildcardTypeName;
import com.google.auto.service.AutoService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import javax.annotation.processing.*;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.*;
import javax.lang.model.type.DeclaredType;
import javax.lang.model.type.TypeKind;
import javax.lang.model.type.TypeMirror;
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

    private final Map<String, String> templateCache = new HashMap<>();

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        for (javax.lang.model.element.Element element : roundEnv.getElementsAnnotatedWith(Templated.class)) {
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

        // Verify DataFields
        Document jsoupDoc = Jsoup.parse(htmlContent);
        List<VariableElement> fields = getAllFields(typeElement);
        boolean hasErrors = false;

        for (VariableElement field : fields) {
             DataField dataField = field.getAnnotation(DataField.class);
             if (dataField != null) {
                 String name = dataField.value();
                 if (name.isEmpty()) {
                     name = field.getSimpleName().toString();
                 }
                 if (jsoupDoc.select("[data-field=" + name + "]").isEmpty()) {
                     processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                         "Template " + templateName + " does not contain data-field='" + name + "'", field);
                     hasErrors = true;
                 }
             }
        }

        if (hasErrors) return;

        String packageName = processingEnv.getElementUtils().getPackageOf(typeElement).getQualifiedName().toString();
        String binderName = typeElement.getSimpleName() + "_Binder";

        ClassName htmlElementClass = ClassName.get("org.teavm.jso.dom.html", "HTMLElement");
        ClassName windowClass = ClassName.get("org.teavm.jso.browser", "Window");
        ClassName documentClass = ClassName.get("org.teavm.jso.dom.html", "HTMLDocument");
        ClassName nodeListClass = ClassName.get("org.teavm.jso.dom.xml", "NodeList");
        ClassName elementClass = ClassName.get("org.teavm.jso.dom.xml", "Element");
        ClassName fragmentClass = ClassName.get("org.teavm.jso.dom.xml", "DocumentFragment");

        MethodSpec.Builder bindMethod = MethodSpec.methodBuilder("bind")
                .addModifiers(Modifier.PUBLIC, Modifier.STATIC)
                .returns(htmlElementClass)
                .addParameter(com.squareup.javapoet.TypeName.get(typeElement.asType()), "target");

        bindMethod.addStatement("$T doc = $T.current().getDocument()", documentClass, windowClass);
        bindMethod.addStatement("$T root = doc.createElement($S)", htmlElementClass, "div");

        String escapedHtml = htmlContent.replace("\n", " ").replace("\"", "\\\"");
        bindMethod.addStatement("root.setInnerHTML($S)", escapedHtml);

        // Assign root to 'element' field if exists
        for (VariableElement field : fields) {
             if (field.getSimpleName().toString().equals("element") &&
                 com.squareup.javapoet.TypeName.get(field.asType()).equals(htmlElementClass)) {
                 bindMethod.addStatement("target.element = root");
             }
        }

        // Process @DataField
        List<VariableElement> dataFields = new ArrayList<>();
        for (VariableElement field : fields) {
            DataField dataField = field.getAnnotation(DataField.class);
            if (dataField != null) {
                dataFields.add(field);
            }
        }

        for (VariableElement field : dataFields) {
            bindMethod.addStatement("$T el_$L = null", htmlElementClass, field.getSimpleName());
        }

        bindMethod.addStatement("$T candidates = root.querySelectorAll($S)", nodeListClass, "[data-field]");
        bindMethod.beginControlFlow("for (int i = 0; i < candidates.getLength(); i++)");
        bindMethod.addStatement("$T candidate = ($T) candidates.item(i)", htmlElementClass, htmlElementClass);
        bindMethod.addStatement("String key = candidate.getAttribute($S)", "data-field");
        bindMethod.beginControlFlow("switch (key)");

        Map<String, List<VariableElement>> fieldsByDataField = new HashMap<>();
        for (VariableElement field : dataFields) {
            DataField dataField = field.getAnnotation(DataField.class);
            String dataFieldName = dataField.value();
            if (dataFieldName.isEmpty()) {
                dataFieldName = field.getSimpleName().toString();
            }
            if (!fieldsByDataField.containsKey(dataFieldName)) {
                fieldsByDataField.put(dataFieldName, new ArrayList<>());
            }
            fieldsByDataField.get(dataFieldName).add(field);
        }

        for (Map.Entry<String, List<VariableElement>> entry : fieldsByDataField.entrySet()) {
            bindMethod.addCode("case $S:\n", entry.getKey());
            for (VariableElement field : entry.getValue()) {
                bindMethod.addStatement("  el_$L = candidate", field.getSimpleName());
            }
            bindMethod.addStatement("  break");
        }

        bindMethod.endControlFlow(); // switch
        bindMethod.endControlFlow(); // for

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
                     // Assume Widget or Component with 'element' field
                     bindMethod.beginControlFlow("if (target.$L != null)", field.getSimpleName());
                     bindMethod.addStatement("$T widgetElement = target.$L.element", htmlElementClass, field.getSimpleName());

                     bindMethod.beginControlFlow("if (widgetElement != null)");
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
                    String propertyPath = bound.property();
                    if (propertyPath.isEmpty()) {
                        propertyPath = field.getSimpleName().toString();
                    }
                    boundProperties.add(propertyPath);

                    String[] segments = propertyPath.split("\\.");
                    TypeElement currentType = modelType;
                    StringBuilder getterChain = new StringBuilder();
                    StringBuilder checkChain = new StringBuilder();
                    String finalGetter = null;
                    String finalSetter = null;
                    boolean valid = true;

                    // Validate Path
                    for (int i = 0; i < segments.length; i++) {
                        String segment = segments[i];
                        boolean isLast = (i == segments.length - 1);

                        String capProp = segment.substring(0, 1).toUpperCase() + segment.substring(1);
                        String getterName = "get" + capProp;
                        String isGetterName = "is" + capProp;
                        String setterName = "set" + capProp;

                        ExecutableElement getterMethod = null;
                        ExecutableElement setterMethod = null;

                        for (ExecutableElement method : ElementFilter.methodsIn(processingEnv.getElementUtils().getAllMembers(currentType))) {
                            String methodName = method.getSimpleName().toString();
                            if ((methodName.equals(getterName) || methodName.equals(isGetterName)) && method.getParameters().isEmpty()) {
                                getterMethod = method;
                            }
                            if (isLast && methodName.equals(setterName) && method.getParameters().size() == 1) {
                                setterMethod = method;
                            }
                        }

                        if (getterMethod == null) {
                            processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                                "Property '" + segment + "' not found in " + currentType.getSimpleName() + ". Missing getter.", field);
                            valid = false;
                            break;
                        }

                        if (!getterMethod.getModifiers().contains(javax.lang.model.element.Modifier.PUBLIC)) {
                             processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                                "Getter for '" + segment + "' in " + currentType.getSimpleName() + " is not public.", field);
                             valid = false;
                             break;
                        }

                        if (isLast) {
                            finalGetter = getterMethod.getSimpleName().toString();
                            if (setterMethod == null) {
                                 processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                                    "Property '" + segment + "' in " + currentType.getSimpleName() + " is read-only. Missing setter.", field);
                                 valid = false;
                            } else if (!setterMethod.getModifiers().contains(javax.lang.model.element.Modifier.PUBLIC)) {
                                 processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                                    "Setter for '" + segment + "' in " + currentType.getSimpleName() + " is not public.", field);
                                 valid = false;
                            } else {
                                finalSetter = setterMethod.getSimpleName().toString();
                            }
                        } else {
                            // Move to next type
                            javax.lang.model.type.TypeMirror returnType = getterMethod.getReturnType();
                            if (returnType.getKind() == javax.lang.model.type.TypeKind.DECLARED) {
                                currentType = (TypeElement) ((javax.lang.model.type.DeclaredType) returnType).asElement();
                                getterChain.append(".").append(getterMethod.getSimpleName()).append("()");
                                checkChain.append(" && target.").append(modelField.getSimpleName()).append(getterChain).append(" != null");
                            } else {
                                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                                    "Property '" + segment + "' in " + currentType.getSimpleName() + " is not an object, cannot access nested property.", field);
                                valid = false;
                                break;
                            }
                        }
                    }

                    if (valid) {
                         // Generate code
                         // Null check: target.model != null && target.model.getProp() != null ...
                         bindMethod.beginControlFlow("if (target.$L != null" + checkChain + " && target.$L != null)", modelField.getSimpleName(), field.getSimpleName());

                         // Initial Set
                         bindMethod.addStatement("target.$L.setValue(target.$L$L.$L())",
                            field.getSimpleName(), modelField.getSimpleName(), getterChain, finalGetter);

                         // Change Handler
                         bindMethod.addCode("((uk.co.instanto.tearay.api.IsWidget)target.$L).getElement().addEventListener(\"change\", e -> {\n", field.getSimpleName());
                         bindMethod.addStatement("  target.$L$L.$L(target.$L.getValue())", modelField.getSimpleName(), getterChain, finalSetter, field.getSimpleName());
                         bindMethod.addCode("});\n");

                         bindMethod.endControlFlow();
                    }
                }
            }

            // Detect Unbound Properties (Top Level)
            java.util.Set<String> topLevelBound = new java.util.HashSet<>();
            for(String p : boundProperties) {
                if (p.contains(".")) {
                    topLevelBound.add(p.substring(0, p.indexOf(".")));
                } else {
                    topLevelBound.add(p);
                }
            }

            java.util.Set<String> allProperties = new java.util.HashSet<>();
            for (ExecutableElement method : ElementFilter.methodsIn(processingEnv.getElementUtils().getAllMembers(modelType))) {
                String methodName = method.getSimpleName().toString();
                if (method.getParameters().isEmpty() && !method.getModifiers().contains(javax.lang.model.element.Modifier.STATIC) && method.getModifiers().contains(javax.lang.model.element.Modifier.PUBLIC)) {
                    if (methodName.startsWith("get") && methodName.length() > 3) {
                         String prop = methodName.substring(3);
                         prop = prop.substring(0, 1).toLowerCase() + prop.substring(1);
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

            allProperties.removeAll(topLevelBound);
            if (!allProperties.isEmpty()) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.WARNING,
                    "The following properties in model " + modelType.getSimpleName() + " are not bound: " + allProperties,
                    typeElement);
            }
        }

        bindMethod.addStatement("root.appendChild(fragment)");
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

    private List<VariableElement> getAllFields(TypeElement typeElement) {
        List<VariableElement> fields = new ArrayList<>(ElementFilter.fieldsIn(typeElement.getEnclosedElements()));
        TypeMirror superclass = typeElement.getSuperclass();
        if (superclass.getKind() == TypeKind.DECLARED) {
             fields.addAll(getAllFields((TypeElement) ((DeclaredType) superclass).asElement()));
        }
        return fields;
    }
}
