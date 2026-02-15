package dev.verrai.rpc.processor;

import com.google.auto.service.AutoService;
import com.squareup.javapoet.JavaFile;
import com.squareup.javapoet.TypeSpec;
import dev.verrai.rpc.common.annotation.Portable;
import dev.verrai.rpc.common.annotation.Service;

import javax.annotation.processing.*;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.Element;
import javax.lang.model.element.PackageElement;
import javax.lang.model.element.TypeElement;
import javax.tools.Diagnostic;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AutoService(Processor.class)
@SupportedAnnotationTypes({
        "dev.verrai.rpc.common.annotation.Service",
        "dev.verrai.rpc.common.annotation.Portable",
        "dev.verrai.rpc.common.annotation.Event"
})
@SupportedSourceVersion(SourceVersion.RELEASE_8)
public class TearayProcessor extends AbstractProcessor {

    private final ProtoGenerator protoGenerator = new ProtoGenerator();
    private final CodecGenerator codecGenerator = new CodecGenerator();
    private final ServiceGenerator serviceGenerator = new ServiceGenerator();
    private final JsonCodecGenerator jsonCodecGenerator = new JsonCodecGenerator();
    private WireGenerator wireGenerator;
    private CodecRegistryGenerator codecRegistryGenerator;
    private Filer filer;
    private Messager messager;
    private final Set<String> generatedLoaders = new HashSet<>();

    @Override
    public synchronized void init(ProcessingEnvironment processingEnv) {
        super.init(processingEnv);

        this.filer = processingEnv.getFiler();
        this.messager = processingEnv.getMessager();
        this.wireGenerator = new WireGenerator(processingEnv);
        this.codecRegistryGenerator = new CodecRegistryGenerator(processingEnv.getFiler());
    }

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        if (roundEnv.processingOver()) {
            generateServiceFile();
            return false;
        }

        try {
            Set<Element> portableElements = new HashSet<>();
            portableElements.addAll(roundEnv.getElementsAnnotatedWith(Portable.class));
            portableElements
                    .addAll(roundEnv.getElementsAnnotatedWith(dev.verrai.rpc.common.annotation.Event.class));

            if (!portableElements.isEmpty()) {
                // 1. Generate all .proto files
                for (Element element : portableElements) {
                    if (element instanceof TypeElement) {
                        generateProto((TypeElement) element);
                    }
                }

                // 2. Run Wire compiler to generate POJOs
                wireGenerator.generateWireClasses();

                // 3. Generate Codecs
                for (Element element : portableElements) {
                    if (element instanceof TypeElement) {
                        JavaFile javaFile = codecGenerator.generate((TypeElement) element);
                        javaFile.writeTo(filer);

                        // Also generate JSON codecs
                        JavaFile jsonCodecFile = jsonCodecGenerator.generate((TypeElement) element);
                        jsonCodecFile.writeTo(filer);
                    }
                }

                // Generate CodecLoader for this batch
                Set<TypeElement> portableTypeElements = new HashSet<>();
                for (Element element : portableElements) {
                    if (element instanceof TypeElement) {
                        portableTypeElements.add((TypeElement) element);
                    }
                }
                String loaderName = codecRegistryGenerator.generate(portableTypeElements);
                if (loaderName != null) {
                    generatedLoaders.add(loaderName);
                }
            }

            // 4. Generate Services (Stubs/Dispatchers)
            // Services depend on the Wire classes being present (or at least on classpath)
            // Since we generated them in this round, they should be available or we
            // reference them by name
            for (Element element : roundEnv.getElementsAnnotatedWith(Service.class)) {
                if (element instanceof TypeElement) {
                    List<JavaFile> files = serviceGenerator.generate((TypeElement) element);
                    for (JavaFile file : files) {
                        file.writeTo(filer);
                    }
                }
            }

        } catch (IOException e) {
            messager.printMessage(Diagnostic.Kind.ERROR, "Error generating files: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            messager.printMessage(Diagnostic.Kind.ERROR, "General error: " + e.getMessage());
        }

        return true;
    }

    private void generateServiceFile() {
        if (generatedLoaders.isEmpty()) return;
        try {
            String path = "META-INF/services/dev.verrai.rpc.common.serialization.CodecLoader";
            javax.tools.FileObject file = filer.createResource(javax.tools.StandardLocation.CLASS_OUTPUT, "", path);
            try (java.io.Writer writer = file.openWriter()) {
                for (String loader : generatedLoaders) {
                    writer.write(loader + "\n");
                }
            }
        } catch (IOException e) {
            messager.printMessage(Diagnostic.Kind.ERROR, "Error generating service file: " + e.getMessage());
        }
    }

    private void generateProto(TypeElement typeElement) throws IOException {
        String packageName = ((PackageElement) typeElement.getEnclosingElement()).getQualifiedName().toString();
        String protoPackage = packageName + ".proto";

        String protoContent = protoGenerator.generate(typeElement, protoPackage);
        String simpleName = typeElement.getSimpleName().toString();

        // Write to resources so WireGenerator can pick it up and it's available for
        // other tools
        // We put it in 'META-INF/proto' or similar? Or just root?
        // Let's mirror the package structure
        String relativePath = protoPackage.replace('.', '/') + "/" + simpleName + ".proto";

        // Also register with WireGenerator
        wireGenerator.addProtoFile(relativePath, protoContent);

        // We primarily output to CLASS_OUTPUT so it ends up in target/classes
        javax.tools.FileObject fileObject = filer.createResource(javax.tools.StandardLocation.CLASS_OUTPUT,
         "", relativePath);
        try (java.io.Writer writer = fileObject.openWriter()) {
         writer.write(protoContent);
        }
    }
}
