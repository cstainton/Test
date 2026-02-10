package dev.verrai.processor;

import com.google.testing.compile.Compilation;
import com.google.testing.compile.JavaFileObjects;
import dev.verrai.api.binding.Subscription;
import org.junit.Test;
import javax.tools.JavaFileObject;

import static com.google.testing.compile.Compiler.javac;
import static com.google.testing.compile.CompilationSubject.assertThat;

public class BindableProcessorTest {

    @Test
    public void testBindableProxyGeneration() {
        JavaFileObject source = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.MyBindableModel",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Bindable;",
            "",
            "@Bindable",
            "public class MyBindableModel {",
            "    private String name;",
            "    public void setName(String name) { this.name = name; }",
            "    public String getName() { return name; }",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new BindableProcessor())
            .compile(source);

        assertThat(compilation).succeeded();

        assertThat(compilation).generatedSourceFile("dev.verrai.processor.MyBindableModel_BindableProxy");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.MyBindableModel_BindableProxy")
            .contentsAsUtf8String()
            .contains("class MyBindableModel_BindableProxy extends MyBindableModel implements BindableProxy");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.MyBindableModel_BindableProxy")
            .contentsAsUtf8String()
            .contains("firePropertyChange(\"name\", name)");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.MyBindableModel_BindableProxy")
            .contentsAsUtf8String()
            .contains("public Subscription addPropertyChangeHandler");
    }
}
