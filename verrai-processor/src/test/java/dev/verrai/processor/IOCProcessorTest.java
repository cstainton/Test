package dev.verrai.processor;

import com.google.testing.compile.Compilation;
import com.google.testing.compile.JavaFileObjects;
import org.junit.Test;
import javax.tools.JavaFileObject;

import static com.google.testing.compile.Compiler.javac;
import static com.google.testing.compile.CompilationSubject.assertThat;

public class IOCProcessorTest {

    @Test
    public void testSimpleBean() {
        JavaFileObject source = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.SimpleBean",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.ApplicationScoped;",
            "",
            "@ApplicationScoped",
            "public class SimpleBean {",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new IOCProcessor())
            .compile(source);

        assertThat(compilation).succeeded();

        assertThat(compilation).generatedSourceFile("dev.verrai.processor.SimpleBean_Factory");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.SimpleBean_Factory")
            .contentsAsUtf8String()
            .contains("getInstance()");
    }

    @Test
    public void testInheritanceInjection() {
        JavaFileObject service = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.MyService",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.ApplicationScoped;",
            "",
            "@ApplicationScoped",
            "public class MyService {}"
        );

        JavaFileObject parent = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.ParentBean",
            "package dev.verrai.processor;",
            "",
            "import javax.inject.Inject;",
            "",
            "public class ParentBean {",
            "    @Inject",
            "    public MyService service;",
            "}"
        );

        JavaFileObject child = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.ChildBean",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.ApplicationScoped;",
            "",
            "@ApplicationScoped",
            "public class ChildBean extends ParentBean {",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new IOCProcessor())
            .compile(service, parent, child);

        assertThat(compilation).succeeded();

        assertThat(compilation).generatedSourceFile("dev.verrai.processor.ChildBean_Factory");

        // Should contain injection for parent field
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.ChildBean_Factory")
            .contentsAsUtf8String()
            .contains("bean.service =");
    }
}
