package uk.co.instanto.tearay.processor;

import com.google.testing.compile.Compilation;
import com.google.testing.compile.JavaFileObjects;
import org.junit.Test;
import javax.tools.JavaFileObject;

import static com.google.testing.compile.Compiler.javac;
import static com.google.testing.compile.CompilationSubject.assertThat;

public class ProviderInjectionTest {

    @Test
    public void testProviderInjectionWithGenerics() {
        JavaFileObject myBean = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.MyBean",
            "package uk.co.instanto.tearay.processor;",
            "",
            "import uk.co.instanto.tearay.api.ApplicationScoped;",
            "",
            "@ApplicationScoped",
            "public class MyBean {}"
        );

        JavaFileObject genericWidget = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.GenericWidget",
            "package uk.co.instanto.tearay.processor;",
            "",
            "import javax.inject.Inject;",
            "import javax.inject.Provider;",
            "",
            "public class GenericWidget<T> {",
            "    @Inject",
            "    public Provider<T> provider;",
            "}"
        );

        JavaFileObject concreteWidget = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.ConcreteWidget",
            "package uk.co.instanto.tearay.processor;",
            "",
            "import uk.co.instanto.tearay.api.Dependent;",
            "",
            "@Dependent",
            "public class ConcreteWidget extends GenericWidget<MyBean> {",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new IOCProcessor())
            .compile(myBean, genericWidget, concreteWidget);

        assertThat(compilation).succeeded();

        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.ConcreteWidget_Factory")
            .contentsAsUtf8String()
            .contains("bean.provider = () -> MyBean_Factory.getInstance()");
    }
}
