package uk.co.instanto.tearay.rpc.processor;

import com.google.auto.service.AutoService;
import com.squareup.javapoet.JavaFile;
import com.squareup.javapoet.TypeSpec;
import uk.co.instanto.tearay.rpc.common.annotation.Portable;
import uk.co.instanto.tearay.rpc.common.annotation.Service;

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
        "uk.co.instanto.tearay.rpc.common.annotation.Service",
        "uk.co.instanto.tearay.rpc.common.annotation.Portable",
        "uk.co.instanto.tearay.rpc.common.annotation.Event"
})
@SupportedSourceVersion(SourceVersion.RELEASE_8)
public class TearayProcessor extends AbstractProcessor {

    private final ProtoGenerator protoGenerator = new ProtoGenerator();
    private final CodecGenerator codecGenerator = new CodecGenerator();
    private final ServiceGenerator serviceGenerator = new ServiceGenerator();
    private final JsonCodecGenerator jsonCodecGenerator = new JsonCodecGenerator();
    private WireGenerator wireGenerator;
    private Filer filer;
    private Messager messager;

    @Override
    public synchronized void init(ProcessingEnvironment processingEnv) {
        super.init(processingEnv);

        this.filer = processingEnv.getFiler();
        this.messager = processingEnv.getMessager();
        this.wireGenerator = new WireGenerator(processingEnv);
    }

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {

        try {
            Set<Element> portableElements = new HashSet<>();
            portableElements.addAll(roundEnv.getElementsAnnotatedWith(Portable.class));
            portableElements
                    .addAll(roundEnv.getElementsAnnotatedWith(uk.co.instanto.tearay.rpc.common.annotation.Event.class));

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
        // FileObject fileObject = filer.createResource(StandardLocation.CLASS_OUTPUT,
        // "", relativePath);
        // try (Writer writer = fileObject.openWriter()) {
        // writer.write(protoContent);
        // }
    }
}
