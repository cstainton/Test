package uk.co.instanto.tearay.api;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Indicates that the annotated method handles events for a specific @DataField.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface EventHandler {

    /**
     * The name of the field to bind the event to.
     * This field must be annotated with @DataField.
     */
    String value();

    /**
     * The type of the event (e.g., "click", "change", "input").
     * Defaults to "click".
     */
    String type() default "click";
}
