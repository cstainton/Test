package uk.co.instanto.tearay.processor;

import com.google.testing.compile.Compilation;
import com.google.testing.compile.JavaFileObjects;
import org.junit.Test;
import javax.tools.JavaFileObject;

import static com.google.testing.compile.Compiler.javac;
import static com.google.testing.compile.CompilationSubject.assertThat;

public class TemplatedProcessorTest {

    @Test
    public void testSimplePageBinding() {
        JavaFileObject source = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.SimplePage",
            "package uk.co.instanto.tearay.processor;",
            "",
            "import uk.co.instanto.tearay.api.Templated;",
            "import uk.co.instanto.tearay.api.DataField;",
            "import org.teavm.jso.dom.html.HTMLElement;",
            "",
            "@Templated(\"SimplePage.html\")",
            "public class SimplePage {",
            "    @DataField",
            "    public HTMLElement name;",
            "",
            "    @DataField",
            "    public HTMLElement submit;",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new TemplatedProcessor())
            .compile(source);

        assertThat(compilation).succeeded();

        // Basic check: file generated
        assertThat(compilation).generatedSourceFile("uk.co.instanto.tearay.processor.SimplePage_Binder");

        // Verify optimized querySelectorAll usage
        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.SimplePage_Binder")
            .contentsAsUtf8String()
            .contains("root.querySelectorAll(\"[data-field]\")");

        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.SimplePage_Binder")
            .contentsAsUtf8String()
            .contains("switch (attr)");

        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.SimplePage_Binder")
            .contentsAsUtf8String()
            .contains("case \"name\":");

        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.SimplePage_Binder")
            .contentsAsUtf8String()
            .contains("el_name = candidate;");

        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.SimplePage_Binder")
            .contentsAsUtf8String()
            .contains("case \"submit\":");
    }

    @Test
    public void testElementFieldBinding() {
         JavaFileObject source = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.ElementPage",
            "package uk.co.instanto.tearay.processor;",
            "",
            "import uk.co.instanto.tearay.api.Templated;",
            "import uk.co.instanto.tearay.api.DataField;",
            "import org.teavm.jso.dom.html.HTMLElement;",
            "",
            "@Templated(\"SimplePage.html\")",
            "public class ElementPage {",
            "    public HTMLElement element;",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new TemplatedProcessor())
            .compile(source);

        assertThat(compilation).succeeded();

        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.ElementPage_Binder")
            .contentsAsUtf8String()
            .contains("target.element = root");
    }

    @Test
    public void testMissingDataFieldInTemplate() {
        JavaFileObject source = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.BrokenPage",
            "package uk.co.instanto.tearay.processor;",
            "",
            "import uk.co.instanto.tearay.api.Templated;",
            "import uk.co.instanto.tearay.api.DataField;",
            "import org.teavm.jso.dom.html.HTMLElement;",
            "",
            "@Templated(\"SimplePage.html\")",
            "public class BrokenPage {",
            "    @DataField",
            "    public HTMLElement missingField;",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new TemplatedProcessor())
            .compile(source);

        assertThat(compilation).failed();
        assertThat(compilation)
            .hadErrorContaining("Template SimplePage.html does not contain data-field='missingField'");
    }
}
