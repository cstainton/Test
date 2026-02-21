package dev.verrai.processor;

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
            "dev.verrai.processor.SimplePage",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Page;",
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

        assertThat(compilation).generatedSourceFile("dev.verrai.impl.NavigationImpl");

        // Verify content
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("switch (role)");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("case \"home\":");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("SimplePage_Factory.getInstance()");
    }

    @Test
    public void testPathUsedAsRoleFallback() {
        JavaFileObject source = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.PathPage",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Page;",
            "import org.teavm.jso.dom.html.HTMLElement;",
            "",
            "@Page(path = \"my-path\")",
            "public class PathPage {",
            "    public HTMLElement element;",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new NavigationProcessor(), new IOCProcessor())
            .compile(source);

        assertThat(compilation).succeeded();

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("case \"my-path\":");
    }

    @Test
    public void testStartingPageGeneratesStartMethod() {
        JavaFileObject source = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.StartPage",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Page;",
            "import org.teavm.jso.dom.html.HTMLElement;",
            "",
            "@Page(role = \"home\", startingPage = true)",
            "public class StartPage {",
            "    public HTMLElement element;",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new NavigationProcessor(), new IOCProcessor())
            .compile(source);

        assertThat(compilation).succeeded();

        // start() method must exist
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("public void start()");

        // start() must navigate to the declared startingPage role
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("goTo(\"home\")");
    }

    @Test
    public void testPageHidingAndPageHiddenLifecycle() {
        JavaFileObject source = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.LifecyclePage",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Page;",
            "import dev.verrai.api.PageHiding;",
            "import dev.verrai.api.PageHidden;",
            "import dev.verrai.api.PageShowing;",
            "import org.teavm.jso.dom.html.HTMLElement;",
            "",
            "@Page(role = \"lifecycle\")",
            "public class LifecyclePage {",
            "    public HTMLElement element;",
            "",
            "    @PageHiding",
            "    public void onHiding() {}",
            "",
            "    @PageHidden",
            "    public void onHidden() {}",
            "",
            "    @PageShowing",
            "    public void onShowing() {}",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new NavigationProcessor(), new IOCProcessor())
            .compile(source);

        assertThat(compilation).succeeded();

        // Lifecycle calls are null-guarded so the first navigation is clean
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("if (this.currentPage != null)");

        // callPageHiding and callPageHidden are invoked inside the null guard
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("callPageHiding(this.currentPage)");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("callPageHidden(this.currentPage)");

        // Verify @PageHiding method is dispatched
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("page).onHiding()");

        // Verify @PageHidden method is dispatched
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("page).onHidden()");
    }

    @Test
    public void testPopstateAndDeeplinkSupport() {
        JavaFileObject source = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.SimplePage",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Page;",
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

        // popstate listener registration
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("registerPopstateListener");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("addEventListener(\"popstate\"");

        // isPopstate flag suppresses duplicate history.pushState
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("isPopstate");

        // navigateToHash parses the custom hash format
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("navigateToHash");

        // Factory calls registerPopstateListener
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl_Factory")
            .contentsAsUtf8String()
            .contains("instance.registerPopstateListener()");
    }

    @Test
    public void testNavigationCleanup() {
        JavaFileObject source = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.CleanupPage",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Page;",
            "import dev.verrai.api.binding.BinderLifecycle;",
            "import dev.verrai.api.binding.Subscription;",
            "import org.teavm.jso.dom.html.HTMLElement;",
            "",
            "@Page(role = \"cleanup\")",
            "public class CleanupPage implements BinderLifecycle {",
            "    public HTMLElement element;",
            "    public void addBinding(Subscription s) {}",
            "    public void clearBindings() {}",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new NavigationProcessor(), new IOCProcessor())
            .compile(source);

        assertThat(compilation).succeeded();

        assertThat(compilation).generatedSourceFile("dev.verrai.impl.NavigationImpl");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("if (this.currentPage instanceof dev.verrai.api.binding.BinderLifecycle)");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("((dev.verrai.api.binding.BinderLifecycle) this.currentPage).clearBindings()");
    }

    @Test
    public void testUnknownRoleAlertsBeforeDomMutation() {
        JavaFileObject source = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.SimplePage",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Page;",
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

        String nav;
        try {
            nav = compilation
                .generatedSourceFile("dev.verrai.impl.NavigationImpl")
                .get()
                .getCharContent(false)
                .toString();
        } catch (java.io.IOException e) {
            throw new RuntimeException(e);
        }

        // Pre-validation switch must appear before setInnerText so the DOM is
        // never cleared for an unknown role
        int alertPos = nav.indexOf("Unknown page role: ");
        int clearPos  = nav.indexOf("setInnerText");
        org.junit.Assert.assertTrue(
            "Pre-validation alert must appear before DOM clear",
            alertPos != -1 && clearPos != -1 && alertPos < clearPos);

        // goTo must return early for unknown role (before any DOM mutation)
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("Unknown page role: ");
    }

    @Test
    public void testNoStartingPageEmitsWarningAndRuntimeAlert() {
        JavaFileObject source = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.SimplePage",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.Page;",
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

        // Compilation succeeds but with a warning
        assertThat(compilation).succeeded();
        assertThat(compilation).hadWarningContaining("startingPage=true");

        // start() must emit a runtime alert rather than silently doing nothing
        assertThat(compilation)
            .generatedSourceFile("dev.verrai.impl.NavigationImpl")
            .contentsAsUtf8String()
            .contains("No starting page declared");
    }
}
