package uk.co.instanto.tearay.processor;

import uk.co.instanto.tearay.api.validation.*;
import com.squareup.javapoet.*;
import com.google.auto.service.AutoService;

import javax.annotation.processing.*;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.*;
import javax.lang.model.type.TypeMirror;
import javax.lang.model.util.ElementFilter;
import javax.tools.Diagnostic;
import java.io.IOException;
import java.util.Set;
import java.util.HashSet;
import java.util.List;
import java.util.ArrayList;

@AutoService(Processor.class)
@SupportedAnnotationTypes({
    "uk.co.instanto.tearay.api.validation.Validatable"
})
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class ValidationProcessor extends AbstractProcessor {

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        for (Element element : roundEnv.getElementsAnnotatedWith(Validatable.class)) {
            if (element.getKind() != ElementKind.CLASS) continue;
            try {
                generateValidator((TypeElement) element);
            } catch (Exception e) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "Error generating Validator: " + e.getMessage(), element);
                e.printStackTrace();
            }
        }
        return true;
    }

    private void generateValidator(TypeElement typeElement) throws IOException {
        String packageName = processingEnv.getElementUtils().getPackageOf(typeElement).getQualifiedName().toString();
        String simpleName = typeElement.getSimpleName().toString();
        String validatorName = simpleName + "_Validator";

        ClassName targetType = ClassName.get(typeElement);
        ClassName validatorInterface = ClassName.get("uk.co.instanto.tearay.api.validation", "Validator");
        ClassName constraintViolation = ClassName.get("uk.co.instanto.tearay.api.validation", "ConstraintViolation");
        ClassName setClass = ClassName.get("java.util", "Set");
        ClassName hashSetClass = ClassName.get("java.util", "HashSet");

        MethodSpec.Builder validateMethod = MethodSpec.methodBuilder("validate")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(ParameterizedTypeName.get(setClass, constraintViolation))
                .addParameter(targetType, "object")
                .addStatement("$T<$T> violations = new $T<>()", setClass, constraintViolation, hashSetClass);

        List<VariableElement> fields = ElementFilter.fieldsIn(typeElement.getEnclosedElements());
        for (VariableElement field : fields) {
            String property = field.getSimpleName().toString();
            String getter = "get" + property.substring(0, 1).toUpperCase() + property.substring(1) + "()";
            // Check for booleans "is"
            boolean isBoolean = field.asType().getKind() == javax.lang.model.type.TypeKind.BOOLEAN;
             if (isBoolean) {
                  getter = "is" + property.substring(0, 1).toUpperCase() + property.substring(1) + "()";
             }

            // NotNull
            NotNull notNull = field.getAnnotation(NotNull.class);
            if (notNull != null) {
                // If it's a reference type
                if (!field.asType().getKind().isPrimitive()) {
                    validateMethod.beginControlFlow("if (object.$L == null)", getter.replace("()", "()"));
                    validateMethod.addStatement("violations.add(new $T($S, $S, null))", constraintViolation, property, notNull.message());
                    validateMethod.endControlFlow();
                }
            }

            // Size (String)
            Size size = field.getAnnotation(Size.class);
            if (size != null) {
                // Check if String
                if (field.asType().toString().equals("java.lang.String")) {
                     validateMethod.beginControlFlow("if (object.$L != null)", getter.replace("()", "()"));
                     validateMethod.addStatement("int len = object.$L.length()", getter.replace("()", "()"));
                     validateMethod.beginControlFlow("if (len < $L || len > $L)", size.min(), size.max());
                     String msg = size.message().replace("{min}", String.valueOf(size.min())).replace("{max}", String.valueOf(size.max()));
                     validateMethod.addStatement("violations.add(new $T($S, $S, object.$L))",
                        constraintViolation, property, msg, getter.replace("()", "()"));
                     validateMethod.endControlFlow();
                     validateMethod.endControlFlow();
                }
            }

            // Pattern (String)
            Pattern pattern = field.getAnnotation(Pattern.class);
            if (pattern != null) {
                if (field.asType().toString().equals("java.lang.String")) {
                     validateMethod.beginControlFlow("if (object.$L != null)", getter.replace("()", "()"));
                     validateMethod.beginControlFlow("if (!object.$L.matches($S))", getter.replace("()", "()"), pattern.regexp());
                     String msg = pattern.message().replace("{regexp}", pattern.regexp());
                     validateMethod.addStatement("violations.add(new $T($S, $S, object.$L))",
                        constraintViolation, property, msg, getter.replace("()", "()"));
                     validateMethod.endControlFlow();
                     validateMethod.endControlFlow();
                }
            }

             // Min (Number)
            Min min = field.getAnnotation(Min.class);
            if (min != null) {
                if (field.asType().getKind().isPrimitive()) {
                    validateMethod.beginControlFlow("if (object.$L < $L)", getter.replace("()", "()"), min.value());
                     String msg = min.message().replace("{value}", String.valueOf(min.value()));
                     validateMethod.addStatement("violations.add(new $T($S, $S, object.$L))",
                        constraintViolation, property, msg, getter.replace("()", "()"));
                     validateMethod.endControlFlow();
                }
            }

            // Max (Number)
            Max max = field.getAnnotation(Max.class);
            if (max != null) {
                 if (field.asType().getKind().isPrimitive()) {
                    validateMethod.beginControlFlow("if (object.$L > $L)", getter.replace("()", "()"), max.value());
                     String msg = max.message().replace("{value}", String.valueOf(max.value()));
                     validateMethod.addStatement("violations.add(new $T($S, $S, object.$L))",
                        constraintViolation, property, msg, getter.replace("()", "()"));
                     validateMethod.endControlFlow();
                }
            }
        }

        validateMethod.addStatement("return violations");

        TypeSpec validatorClass = TypeSpec.classBuilder(validatorName)
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(ParameterizedTypeName.get(validatorInterface, targetType))
                .addMethod(validateMethod.build())
                .build();

        JavaFile.builder(packageName, validatorClass)
                .build()
                .writeTo(processingEnv.getFiler());
    }
}
