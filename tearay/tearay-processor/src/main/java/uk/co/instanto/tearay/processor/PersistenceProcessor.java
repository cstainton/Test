package uk.co.instanto.tearay.processor;

import com.squareup.javapoet.*;
import uk.co.instanto.tearay.api.persistence.*;
import uk.co.instanto.tearay.api.EntryPoint;
import uk.co.instanto.tearay.api.ApplicationScoped;

import javax.annotation.processing.*;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.*;
import javax.lang.model.type.*;
import javax.lang.model.util.*;
import javax.tools.Diagnostic;
import javax.tools.FileObject;
import javax.tools.StandardLocation;
import java.io.IOException;
import java.io.Writer;
import java.util.*;

@SupportedAnnotationTypes({
    "uk.co.instanto.tearay.api.persistence.Entity",
    "uk.co.instanto.tearay.api.EntryPoint"
})
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class PersistenceProcessor extends AbstractProcessor {

    private Types typeUtils;
    private Elements elementUtils;
    private Filer filer;
    private Messager messager;

    private final Set<String> generatedMappers = new HashSet<>();

    @Override
    public synchronized void init(ProcessingEnvironment processingEnv) {
        super.init(processingEnv);
        typeUtils = processingEnv.getTypeUtils();
        elementUtils = processingEnv.getElementUtils();
        filer = processingEnv.getFiler();
        messager = processingEnv.getMessager();
    }

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        try {
            Set<? extends Element> entities = roundEnv.getElementsAnnotatedWith(Entity.class);
            for (Element e : entities) {
                if (e.getKind() == ElementKind.CLASS) {
                    String mapperName = generateMapper((TypeElement) e);
                    if (mapperName != null) {
                        generatedMappers.add(mapperName);
                    }
                }
            }

            Set<? extends Element> entryPoints = roundEnv.getElementsAnnotatedWith(EntryPoint.class);
            if (!entryPoints.isEmpty()) {
                generateAppEntityManager((TypeElement) entryPoints.iterator().next());
            }

            if (roundEnv.processingOver() && !generatedMappers.isEmpty()) {
                 generateServiceFile();
            }
        } catch (Exception e) {
            messager.printMessage(Diagnostic.Kind.ERROR, "Error generating persistence code: " + e.getMessage());
            e.printStackTrace();
        }

        return false;
    }

    private String generateMapper(TypeElement entity) throws IOException {
        String packageName = elementUtils.getPackageOf(entity).getQualifiedName().toString();
        String className = entity.getSimpleName().toString() + "Mapper";
        ClassName entityClass = ClassName.get(entity);

        ClassName entityMapperInterface = ClassName.get("uk.co.instanto.tearay.persistence", "EntityMapper");
        TypeName interfaceType = ParameterizedTypeName.get(entityMapperInterface, entityClass);

        ClassName jsObject = ClassName.get("org.teavm.jso", "JSObject");
        ClassName jsBody = ClassName.get("org.teavm.jso", "JSBody");

        TypeSpec.Builder typeSpec = TypeSpec.classBuilder(className)
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(interfaceType);

        // getEntityClass
        typeSpec.addMethod(MethodSpec.methodBuilder("getEntityClass")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(ParameterizedTypeName.get(ClassName.get(Class.class), entityClass))
                .addStatement("return $T.class", entityClass)
                .build());

        // getEntityName
        String entityName = entity.getAnnotation(Entity.class).name();
        if (entityName.isEmpty()) entityName = entity.getSimpleName().toString();

        typeSpec.addMethod(MethodSpec.methodBuilder("getEntityName")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(String.class)
                .addStatement("return $S", entityName)
                .build());

        // Find Id
        VariableElement idField = null;
        for (Element e : entity.getEnclosedElements()) {
            if (e.getKind() == ElementKind.FIELD && e.getAnnotation(Id.class) != null) {
                idField = (VariableElement) e;
                break;
            }
        }

        if (idField == null) {
            messager.printMessage(Diagnostic.Kind.ERROR, "Entity " + entity + " has no @Id field", entity);
            return null;
        }

        // getId
        String idGetter = "get" + capitalize(idField.getSimpleName().toString());

        typeSpec.addMethod(MethodSpec.methodBuilder("getId")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(Object.class)
                .addParameter(entityClass, "entity")
                .addStatement("return entity.$L()", idGetter)
                .build());

        // setId
        String idSetter = "set" + capitalize(idField.getSimpleName().toString());
        TypeName idType = TypeName.get(idField.asType());
        typeSpec.addMethod(MethodSpec.methodBuilder("setId")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .addParameter(entityClass, "entity")
                .addParameter(Object.class, "id")
                .addStatement("entity.$L(($T) id)", idSetter, idType)
                .build());

        // fromJsId
        typeSpec.addMethod(MethodSpec.methodBuilder("fromJsId")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(Object.class)
                .addParameter(jsObject, "id")
                .addStatement("return $L(id)", getFromJsHelper(idField.asType()))
                .build());

        // getKeyPath
        typeSpec.addMethod(MethodSpec.methodBuilder("getKeyPath")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(String.class)
                .addStatement("return $S", idField.getSimpleName().toString())
                .build());

        // isAutoIncrement
        boolean auto = idField.getAnnotation(GeneratedValue.class) != null;
        typeSpec.addMethod(MethodSpec.methodBuilder("isAutoIncrement")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(boolean.class)
                .addStatement("return $L", auto)
                .build());

        // toJSO
        MethodSpec.Builder toJso = MethodSpec.methodBuilder("toJSO")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(jsObject)
                .addParameter(entityClass, "entity")
                .addStatement("$T obj = createObject()", jsObject);

        List<VariableElement> fields = ElementFilter.fieldsIn(entity.getEnclosedElements());
        for (VariableElement f : fields) {
            if (f.getModifiers().contains(Modifier.STATIC) || f.getModifiers().contains(Modifier.TRANSIENT)) continue;

            String name = f.getSimpleName().toString();
            String getter = "get" + capitalize(name);
            if (f.asType().getKind() == TypeKind.BOOLEAN) {
                 if (!methodExists(entity, getter)) getter = "is" + capitalize(name);
            }

            toJso.addStatement("setProperty(obj, $S, toJs(entity.$L()))", name, getter);
        }
        toJso.addStatement("return obj");
        typeSpec.addMethod(toJso.build());

        // fromJSO
        MethodSpec.Builder fromJso = MethodSpec.methodBuilder("fromJSO")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .returns(entityClass)
                .addParameter(jsObject, "jso")
                .addStatement("$T entity = new $T()", entityClass, entityClass);

        for (VariableElement f : fields) {
            if (f.getModifiers().contains(Modifier.STATIC) || f.getModifiers().contains(Modifier.TRANSIENT)) continue;

            String name = f.getSimpleName().toString();
            String setter = "set" + capitalize(name);

            String helper = getFromJsHelper(f.asType());
            fromJso.addStatement("entity.$L($L(getProperty(jso, $S)))", setter, helper, name);
        }

        fromJso.addStatement("return entity");
        typeSpec.addMethod(fromJso.build());

        // Helpers
        addHelpers(typeSpec, jsObject, jsBody);

        JavaFile.builder(packageName, typeSpec.build()).build().writeTo(filer);
        return packageName + "." + className;
    }

    private void generateAppEntityManager(TypeElement entryPoint) throws IOException {
        String packageName = elementUtils.getPackageOf(entryPoint).getQualifiedName().toString();
        ClassName appEntityManager = ClassName.get(packageName, "AppEntityManager");
        ClassName entityManagerImpl = ClassName.get("uk.co.instanto.tearay.persistence", "EntityManagerImpl");
        ClassName defaultPersistenceUnit = ClassName.get("uk.co.instanto.tearay.persistence", "DefaultPersistenceUnit");

        TypeSpec.Builder typeSpec = TypeSpec.classBuilder(appEntityManager)
                .addModifiers(Modifier.PUBLIC)
                .superclass(entityManagerImpl)
                .addAnnotation(ApplicationScoped.class);

        MethodSpec constructor = MethodSpec.constructorBuilder()
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(ClassName.get("javax.inject", "Inject"))
                .addStatement("super(new $T())", defaultPersistenceUnit)
                .build();

        typeSpec.addMethod(constructor);

        JavaFile.builder(packageName, typeSpec.build()).build().writeTo(filer);
    }

    private void generateServiceFile() throws IOException {
        FileObject file = filer.createResource(StandardLocation.CLASS_OUTPUT, "", "META-INF/services/uk.co.instanto.tearay.persistence.EntityMapper");
        try (Writer writer = file.openWriter()) {
            for (String mapper : generatedMappers) {
                writer.write(mapper + "\n");
            }
        }
    }

    private String capitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }

    private boolean methodExists(TypeElement type, String methodName) {
        for (Element e : type.getEnclosedElements()) {
            if (e.getKind() == ElementKind.METHOD && e.getSimpleName().toString().equals(methodName)) {
                return true;
            }
        }
        return false;
    }

    private String getFromJsHelper(TypeMirror type) {
        if (type.getKind() == TypeKind.INT) return "fromJsInt";
        if (type.getKind() == TypeKind.BOOLEAN) return "fromJsBoolean";
        if (type.getKind() == TypeKind.DOUBLE) return "fromJsDouble";

        String str = type.toString();
        if (str.equals("java.lang.String")) return "fromJsString";
        if (str.equals("java.lang.Integer")) return "fromJsInteger";
        if (str.equals("java.lang.Double")) return "fromJsDoubleWrapper";
        if (str.equals("java.lang.Boolean")) return "fromJsBooleanWrapper";

        return "fromJsObject";
    }

    private void addHelpers(TypeSpec.Builder builder, ClassName jsObject, ClassName jsBody) {
        builder.addMethod(MethodSpec.methodBuilder("createObject")
                .addModifiers(Modifier.PRIVATE, Modifier.STATIC, Modifier.NATIVE)
                .returns(jsObject)
                .addAnnotation(AnnotationSpec.builder(jsBody).addMember("script", "$S", "return {};").build())
                .build());

        builder.addMethod(MethodSpec.methodBuilder("setProperty")
                .addModifiers(Modifier.PRIVATE, Modifier.STATIC, Modifier.NATIVE)
                .addParameter(jsObject, "obj")
                .addParameter(String.class, "key")
                .addParameter(jsObject, "val")
                .addAnnotation(AnnotationSpec.builder(jsBody).addMember("params", "{\"obj\", \"key\", \"val\"}").addMember("script", "$S", "obj[key] = val;").build())
                .build());

        builder.addMethod(MethodSpec.methodBuilder("getProperty")
                .addModifiers(Modifier.PRIVATE, Modifier.STATIC, Modifier.NATIVE)
                .returns(jsObject)
                .addParameter(jsObject, "obj")
                .addParameter(String.class, "key")
                .addAnnotation(AnnotationSpec.builder(jsBody).addMember("params", "{\"obj\", \"key\"}").addMember("script", "$S", "return obj[key];").build())
                .build());

        addToJsHelper(builder, jsObject, jsBody, String.class, "s");
        addToJsHelper(builder, jsObject, jsBody, int.class, "i");
        addToJsHelper(builder, jsObject, jsBody, double.class, "d");
        addToJsHelper(builder, jsObject, jsBody, boolean.class, "b");

        addFromJsHelper(builder, jsObject, jsBody, String.class, "fromJsString", "return o;");
        addFromJsHelper(builder, jsObject, jsBody, int.class, "fromJsInt", "return o;");
        addFromJsHelper(builder, jsObject, jsBody, double.class, "fromJsDouble", "return o;");
        addFromJsHelper(builder, jsObject, jsBody, boolean.class, "fromJsBoolean", "return o;");

        addWrapperHelpers(builder, jsObject);
    }

    private void addToJsHelper(TypeSpec.Builder builder, ClassName jsObject, ClassName jsBody, Class<?> type, String param) {
        builder.addMethod(MethodSpec.methodBuilder("toJs")
                .addModifiers(Modifier.PRIVATE, Modifier.STATIC, Modifier.NATIVE)
                .returns(jsObject)
                .addParameter(type, param)
                .addAnnotation(AnnotationSpec.builder(jsBody).addMember("params", "$S", param).addMember("script", "$S", "return " + param + ";").build())
                .build());
    }

    private void addFromJsHelper(TypeSpec.Builder builder, ClassName jsObject, ClassName jsBody, Class<?> retType, String name, String script) {
        builder.addMethod(MethodSpec.methodBuilder(name)
                .addModifiers(Modifier.PRIVATE, Modifier.STATIC, Modifier.NATIVE)
                .returns(retType)
                .addParameter(jsObject, "o")
                .addAnnotation(AnnotationSpec.builder(jsBody).addMember("params", "$S", "o").addMember("script", "$S", script).build())
                .build());
    }

    private void addWrapperHelpers(TypeSpec.Builder builder, ClassName jsObject) {
         // Integer
         builder.addMethod(MethodSpec.methodBuilder("toJs")
                 .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                 .returns(jsObject)
                 .addParameter(Integer.class, "i")
                 .addStatement("return i == null ? null : toJs(i.intValue())")
                 .build());
         builder.addMethod(MethodSpec.methodBuilder("fromJsInteger")
                 .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                 .returns(Integer.class)
                 .addParameter(jsObject, "o")
                 .addStatement("return (o == null) ? null : fromJsInt(o)")
                 .build());

         // Double
         builder.addMethod(MethodSpec.methodBuilder("toJs")
                 .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                 .returns(jsObject)
                 .addParameter(Double.class, "d")
                 .addStatement("return d == null ? null : toJs(d.doubleValue())")
                 .build());
         builder.addMethod(MethodSpec.methodBuilder("fromJsDoubleWrapper")
                 .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                 .returns(Double.class)
                 .addParameter(jsObject, "o")
                 .addStatement("return (o == null) ? null : fromJsDouble(o)")
                 .build());

         // Boolean
         builder.addMethod(MethodSpec.methodBuilder("toJs")
                 .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                 .returns(jsObject)
                 .addParameter(Boolean.class, "b")
                 .addStatement("return b == null ? null : toJs(b.booleanValue())")
                 .build());
         builder.addMethod(MethodSpec.methodBuilder("fromJsBooleanWrapper")
                 .addModifiers(Modifier.PRIVATE, Modifier.STATIC)
                 .returns(Boolean.class)
                 .addParameter(jsObject, "o")
                 .addStatement("return (o == null) ? null : fromJsBoolean(o)")
                 .build());
    }
}
