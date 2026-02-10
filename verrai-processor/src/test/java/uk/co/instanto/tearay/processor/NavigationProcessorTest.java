package uk.co.instanto.tearay.processor;

import com.google.testing.compile.Compilation;
import com.google.testing.compile.JavaFileObjects;
import org.junit.Test;
import javax.tools.JavaFileObject;

import static com.google.testing.compile.Compiler.javac;
import static com.google.testing.compile.CompilationSubject.assertThat;

public class NavigationProcessorTest {

    @Test
    public void testSimplePageNavigation() {
        JavaFileObject source = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.SimplePage",
            "package uk.co.instanto.tearay.processor;",
            "",
            "import uk.co.instanto.tearay.api.Page;",
            "import org.teavm.jso.dom.html.HTMLElement;",
            "",
            "@Page(role = \"home\")",
            "public class SimplePage {",
            "    public HTMLElement element;",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new NavigationProcessor(), new IOCProcessor())
            .compile(source);

        assertThat(compilation).succeeded();

        assertThat(compilation).generatedSourceFile("uk.co.instanto.tearay.impl.NavigationImpl");

        // Verify content
        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("switch (role)");

        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("case \"home\":");

        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("SimplePage_Factory.getInstance()");
    }
}
