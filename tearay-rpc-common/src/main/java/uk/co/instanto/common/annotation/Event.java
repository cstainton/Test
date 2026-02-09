package uk.co.instanto.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Marks a class as an event that can be published and subscribed to across
 * service boundaries.
 * Event classes should be placed in a .dto package alongside the service that
 * publishes them.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Event {
}
