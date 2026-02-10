package dev.verrai.api.i18n;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Indicates that an interface is a message bundle.
 * The processor will generate an implementation of the interface that returns messages from a properties file.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Bundle {
    /**
     * The name of the resource bundle. If not specified, the simple name of the interface is used.
     */
    String value() default "";
}
