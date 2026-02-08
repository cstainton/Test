package uk.co.instanto.tearay.processor;

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
            "uk.co.instanto.tearay.processor.SimpleBean",
            "package uk.co.instanto.tearay.processor;",
            "",
            "import uk.co.instanto.tearay.api.ApplicationScoped;",
            "",
            "@ApplicationScoped",
            "public class SimpleBean {",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new IOCProcessor())
            .compile(source);

        assertThat(compilation).succeeded();

        assertThat(compilation).generatedSourceFile("uk.co.instanto.tearay.processor.SimpleBean_Factory");

        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.SimpleBean_Factory")
            .contentsAsUtf8String()
            .contains("getInstance()");
    }

    @Test
    public void testInheritanceInjection() {
        JavaFileObject service = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.MyService",
            "package uk.co.instanto.tearay.processor;",
            "",
            "import uk.co.instanto.tearay.api.ApplicationScoped;",
            "",
            "@ApplicationScoped",
            "public class MyService {}"
        );

        JavaFileObject parent = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.ParentBean",
            "package uk.co.instanto.tearay.processor;",
            "",
            "import javax.inject.Inject;",
            "",
            "public class ParentBean {",
            "    @Inject",
            "    public MyService service;",
            "}"
        );

        JavaFileObject child = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.ChildBean",
            "package uk.co.instanto.tearay.processor;",
            "",
            "import uk.co.instanto.tearay.api.ApplicationScoped;",
            "",
            "@ApplicationScoped",
            "public class ChildBean extends ParentBean {",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new IOCProcessor())
            .compile(service, parent, child);

        assertThat(compilation).succeeded();

        assertThat(compilation).generatedSourceFile("uk.co.instanto.tearay.processor.ChildBean_Factory");

        // Should contain injection for parent field
        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.ChildBean_Factory")
            .contentsAsUtf8String()
            .contains("bean.service =");
    }
}
