package dev.verrai.processor;

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
            "dev.verrai.processor.SimplePage",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Templated;",
            "import dev.verrai.api.DataField;",
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
        assertThat(compilation).generatedSourceFile("dev.verrai.processor.SimplePage_Binder");

        // Verify optimized querySelectorAll usage
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.SimplePage_Binder")
            .contentsAsUtf8String()
            .contains("root.querySelectorAll(\"[data-field]\")");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.SimplePage_Binder")
            .contentsAsUtf8String()
            .contains("switch (key)");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.SimplePage_Binder")
            .contentsAsUtf8String()
            .contains("case \"name\":");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.SimplePage_Binder")
            .contentsAsUtf8String()
            .contains("el_name = candidate;");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.SimplePage_Binder")
            .contentsAsUtf8String()
            .contains("case \"submit\":");
    }

    @Test
    public void testElementFieldBinding() {
         JavaFileObject source = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.ElementPage",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Templated;",
            "import dev.verrai.api.DataField;",
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
            .generatedSourceFile("dev.verrai.processor.ElementPage_Binder")
            .contentsAsUtf8String()
            .contains("target.element = root");
    }

    @Test
    public void testInheritedElementFieldBinding() {
         JavaFileObject parent = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.ParentPage",
            "package dev.verrai.processor;",
            "",
            "import org.teavm.jso.dom.html.HTMLElement;",
            "",
            "public class ParentPage {",
            "    public HTMLElement element;",
            "}"
        );

         JavaFileObject source = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.InheritedPage",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Templated;",
            "import dev.verrai.api.DataField;",
            "import org.teavm.jso.dom.html.HTMLElement;",
            "",
            "@Templated(\"SimplePage.html\")",
            "public class InheritedPage extends ParentPage {",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new TemplatedProcessor())
            .compile(parent, source);

        assertThat(compilation).succeeded();

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.InheritedPage_Binder")
            .contentsAsUtf8String()
            .contains("target.element = root");
    }

    @Test
    public void testMissingDataFieldInTemplate() {
        JavaFileObject source = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.BrokenPage",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Templated;",
            "import dev.verrai.api.DataField;",
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
