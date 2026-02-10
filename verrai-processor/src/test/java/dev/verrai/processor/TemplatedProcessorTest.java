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
    public void testBinderLifecycleIntegration() {
        JavaFileObject widget = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.MyWidget",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.IsWidget;",
            "import dev.verrai.api.TakesValue;",
            "import org.teavm.jso.dom.html.HTMLElement;",
            "import org.teavm.jso.dom.events.Event;",
            "",
            "public class MyWidget implements IsWidget, TakesValue<String> {",
            "    public HTMLElement getElement() { return null; }",
            "    public void setValue(String value) {}",
            "    public String getValue() { return null; }",
            "    public void onBrowserEvent(Event e) {}",
            "}"
        );

        JavaFileObject model = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.MyModel",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Bindable;",
            "",
            "@Bindable",
            "public class MyModel {",
            "    private String name;",
            "    public void setName(String name) { this.name = name; }",
            "    public String getName() { return name; }",
            "}"
        );

        JavaFileObject page = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.LifecyclePage",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Templated;",
            "import dev.verrai.api.DataField;",
            "import dev.verrai.api.Model;",
            "import dev.verrai.api.Bound;",
            "import dev.verrai.api.binding.BinderLifecycle;",
            "import dev.verrai.api.binding.Subscription;",
            "import javax.inject.Inject;",
            "",
            "@Templated(\"SimplePage.html\")",
            "public class LifecyclePage implements BinderLifecycle {",
            "    @Inject @Model",
            "    public MyModel model;",
            "",
            "    @Inject @DataField @Bound",
            "    public MyWidget name;",
            "",
            "    public void addBinding(Subscription s) {}",
            "    public void clearBindings() {}",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new TemplatedProcessor(), new BindableProcessor())
            .compile(widget, model, page);

        assertThat(compilation).succeeded();

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.LifecyclePage_Binder")
            .contentsAsUtf8String()
            .contains("((dev.verrai.api.binding.BinderLifecycle) target).addBinding(subscription)");
    }

    @Test
    public void testBindableModelBinding() {
        JavaFileObject widget = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.MyWidget",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.IsWidget;",
            "import dev.verrai.api.TakesValue;",
            "import org.teavm.jso.dom.html.HTMLElement;",
            "import org.teavm.jso.dom.events.Event;",
            "",
            "public class MyWidget implements IsWidget, TakesValue<String> {",
            "    public HTMLElement getElement() { return null; }",
            "    public void setValue(String value) {}",
            "    public String getValue() { return null; }",
            "    public void onBrowserEvent(Event e) {}",
            "}"
        );

        JavaFileObject model = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.MyModel",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Bindable;",
            "",
            "@Bindable",
            "public class MyModel {",
            "    private String name;",
            "    public void setName(String name) { this.name = name; }",
            "    public String getName() { return name; }",
            "}"
        );

        JavaFileObject page = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.BindablePage",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Templated;",
            "import dev.verrai.api.DataField;",
            "import dev.verrai.api.Model;",
            "import dev.verrai.api.Bound;",
            "import javax.inject.Inject;",
            "",
            "@Templated(\"SimplePage.html\")",
            "public class BindablePage {",
            "    @Inject @Model",
            "    public MyModel model;",
            "",
            "    @Inject @DataField @Bound",
            "    public MyWidget name;",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new TemplatedProcessor(), new BindableProcessor())
            .compile(widget, model, page);

        assertThat(compilation).succeeded();

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.BindablePage_Binder")
            .contentsAsUtf8String()
            .contains("if (target.model instanceof dev.verrai.api.binding.BindableProxy)");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.BindablePage_Binder")
            .contentsAsUtf8String()
            .contains("((dev.verrai.api.binding.BindableProxy) target.model).addPropertyChangeHandler");
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
