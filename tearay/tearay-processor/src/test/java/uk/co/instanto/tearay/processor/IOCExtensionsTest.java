package uk.co.instanto.tearay.processor;

import com.google.testing.compile.Compilation;
import com.google.testing.compile.JavaFileObjects;
import org.junit.Test;
import javax.tools.JavaFileObject;

import static com.google.testing.compile.Compiler.javac;
import static com.google.testing.compile.CompilationSubject.assertThat;

public class IOCExtensionsTest {

    @Test
    public void testEventInjectionAndObservation() {
        JavaFileObject eventType = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.MyEvent",
            "package uk.co.instanto.tearay.processor;",
            "public class MyEvent {}"
        );

        JavaFileObject bean = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.EventBean",
            "package uk.co.instanto.tearay.processor;",
            "",
            "import uk.co.instanto.tearay.api.ApplicationScoped;",
            "import uk.co.instanto.tearay.api.Event;",
            "import uk.co.instanto.tearay.api.Observes;",
            "import javax.inject.Inject;",
            "",
            "@ApplicationScoped",
            "public class EventBean {",
            "    @Inject",
            "    Event<MyEvent> event;",
            "",
            "    public void onEvent(@Observes MyEvent e) {}",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new IOCProcessor())
            .compile(eventType, bean);

        assertThat(compilation).succeeded();

        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.EventBean_Factory")
            .contentsAsUtf8String()
            .contains("new Event<MyEvent>()");

        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.EventBean_Factory")
            .contentsAsUtf8String()
            .contains("SimpleEventBus.get().register(MyEvent.class, (e) -> bean.onEvent(e))");
    }

    @Test
    public void testQualifiedInjection() {
        JavaFileObject service = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.MyService",
            "package uk.co.instanto.tearay.processor;",
            "public interface MyService {}"
        );

        JavaFileObject fooService = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.FooService",
            "package uk.co.instanto.tearay.processor;",
            "import uk.co.instanto.tearay.api.ApplicationScoped;",
            "import javax.inject.Named;",
            "@ApplicationScoped @Named(\"foo\")",
            "public class FooService implements MyService {}"
        );

        JavaFileObject barService = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.BarService",
            "package uk.co.instanto.tearay.processor;",
            "import uk.co.instanto.tearay.api.ApplicationScoped;",
            "import javax.inject.Named;",
            "@ApplicationScoped @Named(\"bar\")",
            "public class BarService implements MyService {}"
        );

        JavaFileObject consumer = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.ConsumerBean",
            "package uk.co.instanto.tearay.processor;",
            "import uk.co.instanto.tearay.api.ApplicationScoped;",
            "import javax.inject.Inject;",
            "import javax.inject.Named;",
            "@ApplicationScoped",
            "public class ConsumerBean {",
            "    @Inject @Named(\"foo\") MyService foo;",
            "    @Inject @Named(\"bar\") MyService bar;",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new IOCProcessor())
            .compile(service, fooService, barService, consumer);

        assertThat(compilation).succeeded();

        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.ConsumerBean_Factory")
            .contentsAsUtf8String()
            .contains("bean.foo = FooService_Factory.getInstance()");

        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.ConsumerBean_Factory")
            .contentsAsUtf8String()
            .contains("bean.bar = BarService_Factory.getInstance()");
    }

    @Test
    public void testProducerMethod() {
        JavaFileObject producedType = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.ProducedType",
            "package uk.co.instanto.tearay.processor;",
            "public class ProducedType {}"
        );

        JavaFileObject producer = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.ProducerBean",
            "package uk.co.instanto.tearay.processor;",
            "import uk.co.instanto.tearay.api.ApplicationScoped;",
            "import uk.co.instanto.tearay.api.Produces;",
            "@ApplicationScoped",
            "public class ProducerBean {",
            "    @Produces",
            "    public ProducedType produce() { return new ProducedType(); }",
            "}"
        );

        JavaFileObject consumer = JavaFileObjects.forSourceLines(
            "uk.co.instanto.tearay.processor.Consumer",
            "package uk.co.instanto.tearay.processor;",
            "import uk.co.instanto.tearay.api.ApplicationScoped;",
            "import javax.inject.Inject;",
            "@ApplicationScoped",
            "public class Consumer {",
            "    @Inject ProducedType item;",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new IOCProcessor())
            .compile(producedType, producer, consumer);

        assertThat(compilation).succeeded();

        // Check if factory for producer method is generated
        assertThat(compilation).generatedSourceFile("uk.co.instanto.tearay.processor.ProducerBean_produce_Factory");

        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.ProducerBean_produce_Factory")
            .contentsAsUtf8String()
            .contains("ProducerBean bean = ProducerBean_Factory.getInstance()");

        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.ProducerBean_produce_Factory")
            .contentsAsUtf8String()
            .contains("return bean.produce()");

        // Check if consumer uses the producer factory
        assertThat(compilation)
            .generatedSourceFile("uk.co.instanto.tearay.processor.Consumer_Factory")
            .contentsAsUtf8String()
            .contains("bean.item = ProducerBean_produce_Factory.getInstance()");
    }
}
