package dev.verrai.processor;

import dev.verrai.api.i18n.Bundle;
import dev.verrai.api.i18n.TranslationKey;
import org.junit.Test;
import com.google.testing.compile.Compilation;
import com.google.testing.compile.JavaFileObjects;
import javax.tools.JavaFileObject;

import static com.google.testing.compile.Compiler.javac;
import static com.google.testing.compile.CompilationSubject.assertThat;

public class I18nProcessorTest {

    @Test
    public void testBundleGeneration() {
        JavaFileObject bundle = JavaFileObjects.forSourceLines(
            "dev.verrai.processor.MyBundle",
            "package dev.verrai.processor;",
            "",
            "import dev.verrai.api.i18n.Bundle;",
            "import dev.verrai.api.i18n.TranslationKey;",
            "",
            "@Bundle",
            "public interface MyBundle {",
            "    String hello(String name);",
            "    String goodbye();",
            "    String welcome(String user, int balance);",
            "    @TranslationKey(\"test_key\")",
            "    String weirdMethodName();",
            "}"
        );

        Compilation compilation = javac()
            .withProcessors(new I18nProcessor())
            .compile(bundle);

        assertThat(compilation).succeeded();

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.MyBundleImpl")
            .contentsAsUtf8String()
            .contains("class MyBundleImpl implements MyBundle");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.MyBundleImpl")
            .contentsAsUtf8String()
            .contains("I18nHelper.format(\"Hello {0}\", name)");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.MyBundleImpl")
            .contentsAsUtf8String()
            .contains("return \"Goodbye\"");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.MyBundleImpl")
            .contentsAsUtf8String()
            .contains("I18nHelper.format(\"Welcome {0}, your balance is {1}\", user, balance)");

        assertThat(compilation)
            .generatedSourceFile("dev.verrai.processor.MyBundleImpl")
            .contentsAsUtf8String()
            .contains("return \"Key Test\"");
    }
}
