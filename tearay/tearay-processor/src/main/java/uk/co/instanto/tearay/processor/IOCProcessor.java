package uk.co.instanto.tearay.processor;

import uk.co.instanto.tearay.api.ApplicationScoped;
import uk.co.instanto.tearay.api.Dependent;
import uk.co.instanto.tearay.api.EntryPoint;
import uk.co.instanto.tearay.api.PostConstruct;
import uk.co.instanto.tearay.api.Templated;
import uk.co.instanto.tearay.api.Page;
import uk.co.instanto.tearay.api.Produces;
import uk.co.instanto.tearay.api.Observes;
import uk.co.instanto.tearay.processor.model.BeanDefinition;
import uk.co.instanto.tearay.processor.model.InjectionPoint;
import uk.co.instanto.tearay.processor.visitor.BeanVisitor;
import uk.co.instanto.tearay.processor.visitor.FactoryWriter;
import com.squareup.javapoet.*;
import com.google.auto.service.AutoService;

import javax.annotation.processing.*;
import javax.inject.Inject;
import javax.inject.Qualifier;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.*;
import javax.lang.model.type.DeclaredType;
import javax.lang.model.type.TypeKind;
import javax.lang.model.type.TypeMirror;
import javax.lang.model.util.ElementFilter;
import javax.tools.Diagnostic;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@AutoService(Processor.class)
@SupportedAnnotationTypes({
    "uk.co.instanto.tearay.api.ApplicationScoped",
    "uk.co.instanto.tearay.api.Dependent",
    "uk.co.instanto.tearay.api.EntryPoint",
    "uk.co.instanto.tearay.api.Templated",
    "uk.co.instanto.tearay.api.Page"
})
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class IOCProcessor extends AbstractProcessor {

    private ProcessorCache cache;

    @Override
    public synchronized void init(ProcessingEnvironment processingEnv) {
        super.init(processingEnv);
        this.cache = new ProcessorCache(processingEnv);
    }

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        if (roundEnv.processingOver()) {
            cache.save();
            return false;
        }

        // Collect all beans: @ApplicationScoped, @EntryPoint, @Templated, and @Page (which implies bean)
        Set<Element> beans = roundEnv.getElementsAnnotatedWith(ApplicationScoped.class).stream().collect(Collectors.toSet());
        beans.addAll(roundEnv.getElementsAnnotatedWith(Dependent.class));
        beans.addAll(roundEnv.getElementsAnnotatedWith(EntryPoint.class));
        beans.addAll(roundEnv.getElementsAnnotatedWith(Templated.class));
        beans.addAll(roundEnv.getElementsAnnotatedWith(Page.class));

        // Build Resolution Map
        Map<String, String> resolutionMap = new HashMap<>();
        for (Element element : beans) {
            if (element.getKind() == ElementKind.CLASS) {
                TypeElement typeElement = (TypeElement) element;
                String factoryFQCN = getFactoryName(typeElement);
                Set<String> qualifiers = getQualifiers(element);

                // Map the class itself
                resolutionMap.put(getKey(typeElement.getQualifiedName().toString(), qualifiers), factoryFQCN);

                // Map interfaces
                for (TypeMirror interfaceType : typeElement.getInterfaces()) {
                    String interfaceName = interfaceType.toString();
                    if (interfaceName.contains("<")) {
                        interfaceName = interfaceName.substring(0, interfaceName.indexOf("<"));
                    }
                    resolutionMap.put(getKey(interfaceName, qualifiers), factoryFQCN);
                }

                // Map superclass if not Object
                 TypeMirror superclass = typeElement.getSuperclass();
                 while (superclass.getKind() == TypeKind.DECLARED) {
                      TypeElement superEl = (TypeElement) ((DeclaredType) superclass).asElement();
                      if (superEl.getQualifiedName().toString().equals("java.lang.Object")) break;
                      resolutionMap.put(getKey(superEl.getQualifiedName().toString(), qualifiers), factoryFQCN);
                      superclass = superEl.getSuperclass();
                 }

                // Scan for @Produces
                for (Element member : element.getEnclosedElements()) {
                    if (member.getKind() == ElementKind.METHOD && member.getAnnotation(Produces.class) != null) {
                        ExecutableElement method = (ExecutableElement) member;
                        String returnType = method.getReturnType().toString();
                        if (returnType.contains("<")) {
                            returnType = returnType.substring(0, returnType.indexOf("<"));
                        }
                        Set<String> producerQualifiers = getQualifiers(method);
                        String producerKey = getKey(returnType, producerQualifiers);
                        // Convention: Pkg.Bean_Method_Factory
                        String producerFactoryName = getPackageName(typeElement) + "." + typeElement.getSimpleName() + "_" + method.getSimpleName() + "_Factory";
                        resolutionMap.put(producerKey, producerFactoryName);
                    }
                }
            }
        }

        BeanVisitor factoryWriter = new FactoryWriter(processingEnv);

        for (Element element : beans) {
            if (element.getKind() != ElementKind.CLASS) continue;
            try {
                processBean((TypeElement) element, resolutionMap, factoryWriter);
            } catch (Exception e) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "Error processing bean " + element + ": " + e.getMessage(), element);
                e.printStackTrace();
            }
        }

        // Handle Bootstrapper generation if EntryPoint is present
        Set<? extends Element> entryPoints = roundEnv.getElementsAnnotatedWith(EntryPoint.class);
        if (!entryPoints.isEmpty()) {
            try {
                generateBootstrapper((TypeElement) entryPoints.iterator().next());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return false;
    }

    private String getFactoryName(TypeElement typeElement) {
        String pkg = getPackageName(typeElement);
        return pkg + "." + typeElement.getSimpleName() + "_Factory";
    }

    private String getPackageName(TypeElement typeElement) {
        return processingEnv.getElementUtils().getPackageOf(typeElement).getQualifiedName().toString();
    }

    private String getKey(String typeName, Set<String> qualifiers) {
        if (qualifiers.isEmpty()) return typeName;
        return typeName + "|" + String.join("|", qualifiers);
    }

    private Set<String> getQualifiers(Element element) {
        Set<String> qualifiers = new TreeSet<>();
        for (AnnotationMirror am : element.getAnnotationMirrors()) {
            DeclaredType annotationType = am.getAnnotationType();
            if (annotationType.asElement().getAnnotation(Qualifier.class) != null) {
                qualifiers.add(am.toString());
            }
        }
        return qualifiers;
    }

    private void processBean(TypeElement typeElement, Map<String, String> resolutionMap, BeanVisitor visitor) {
        boolean isSingleton = typeElement.getAnnotation(ApplicationScoped.class) != null ||
                              typeElement.getAnnotation(EntryPoint.class) != null;
        boolean isTemplated = typeElement.getAnnotation(Templated.class) != null;
        Set<String> qualifiers = getQualifiers(typeElement);

        List<InjectionPoint> injectionPoints = new ArrayList<>();
        List<VariableElement> allFields = getAllFields(typeElement);
        DeclaredType typeMirror = (DeclaredType) typeElement.asType();

        for (VariableElement field : allFields) {
            if (field.getAnnotation(Inject.class) != null) {
                TypeMirror fieldType = processingEnv.getTypeUtils().asMemberOf(typeMirror, field);
                Set<String> fieldQualifiers = getQualifiers(field);
                injectionPoints.add(new InjectionPoint(field, fieldType, fieldQualifiers));
            }
        }

        List<ExecutableElement> postConstructMethods = new ArrayList<>();
        List<ExecutableElement> producerMethods = new ArrayList<>();
        List<ExecutableElement> observesMethods = new ArrayList<>();

        List<ExecutableElement> allMethods = getAllMethods(typeElement);
        for (ExecutableElement method : allMethods) {
            if (method.getAnnotation(PostConstruct.class) != null) {
                postConstructMethods.add(method);
            }
            if (method.getAnnotation(Produces.class) != null) {
                if (method.getEnclosingElement().equals(typeElement)) {
                    producerMethods.add(method);
                }
            }
            // Check for @Observes parameter
            for (VariableElement param : method.getParameters()) {
                if (param.getAnnotation(Observes.class) != null) {
                    observesMethods.add(method);
                    break;
                }
            }
        }

        BeanDefinition beanDef = new BeanDefinition(typeElement, isSingleton, isTemplated,
                injectionPoints, postConstructMethods, resolutionMap, qualifiers, producerMethods, observesMethods);

        String signature = computeSignature(beanDef);
        String className = typeElement.getQualifiedName().toString();

        if (cache.isChanged(className, signature)) {
            visitor.visit(beanDef);
            cache.update(className, signature);
        }
    }

    private String computeSignature(BeanDefinition beanDef) {
        StringBuilder sb = new StringBuilder();
        sb.append(beanDef.getTypeElement().getQualifiedName().toString());
        sb.append(":");
        sb.append(beanDef.isSingleton());
        sb.append(":");
        sb.append(beanDef.isTemplated());
        sb.append("|Q:");
        sb.append(String.join(",", beanDef.getQualifiers()));
        sb.append("|");

        for (InjectionPoint ip : beanDef.getInjectionPoints()) {
            sb.append(ip.getField().getSimpleName().toString());
            sb.append("=");
            String typeName = ip.getType().toString();
            String rawTypeName = typeName;
             if (rawTypeName.contains("<")) {
                rawTypeName = rawTypeName.substring(0, rawTypeName.indexOf("<"));
            }
            sb.append(typeName);
            sb.append("[");
            sb.append(String.join(",", ip.getQualifiers()));
            sb.append("]");

            String key = getKey(rawTypeName, ip.getQualifiers());
            if (beanDef.getResolutionMap().containsKey(key)) {
                sb.append("->");
                sb.append(beanDef.getResolutionMap().get(key));
            }

            sb.append(";");
        }

        sb.append("|PC:");
        for (ExecutableElement method : beanDef.getPostConstructMethods()) {
            sb.append(method.getSimpleName().toString());
            sb.append(";");
        }

        sb.append("|PROD:");
        for (ExecutableElement method : beanDef.getProducerMethods()) {
            sb.append(method.getSimpleName().toString());
            sb.append(method.getReturnType().toString());
            sb.append(";");
        }

        sb.append("|OBS:");
        for (ExecutableElement method : beanDef.getObservesMethods()) {
            sb.append(method.getSimpleName().toString());
            sb.append(";");
        }

        // Compute hash
        try {
            java.security.MessageDigest digest = java.security.MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(sb.toString().getBytes(java.nio.charset.StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (java.security.NoSuchAlgorithmException e) {
            return String.valueOf(sb.toString().hashCode());
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

    private List<ExecutableElement> getAllMethods(TypeElement typeElement) {
        List<ExecutableElement> methods = new ArrayList<>(ElementFilter.methodsIn(typeElement.getEnclosedElements()));
        TypeMirror superclass = typeElement.getSuperclass();
        if (superclass.getKind() == TypeKind.DECLARED) {
             methods.addAll(getAllMethods((TypeElement) ((DeclaredType) superclass).asElement()));
        }
        return methods;
    }

    private void generateBootstrapper(TypeElement entryPoint) throws IOException {
        String packageName = processingEnv.getElementUtils().getPackageOf(entryPoint).getQualifiedName().toString();
        ClassName entryPointFactory = ClassName.get(packageName, entryPoint.getSimpleName() + "_Factory");

        TypeSpec bootstrapper = TypeSpec.classBuilder("BootstrapperImpl")
                .addModifiers(Modifier.PUBLIC)
                .addMethod(MethodSpec.methodBuilder("run")
                        .addModifiers(Modifier.PUBLIC)
                        .addStatement("$T instance = $T.getInstance()", ClassName.get(entryPoint), entryPointFactory)
                        .addStatement("instance.onModuleLoad()")
                        .build())
                .build();

        JavaFile.builder(packageName, bootstrapper)
                .build()
                .writeTo(processingEnv.getFiler());
    }
}
