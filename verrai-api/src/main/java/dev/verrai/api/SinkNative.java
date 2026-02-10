package dev.verrai.api;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Indicates that the annotated field (which must be an {@link IsWidget}) should sink
 * the specified native events.
 *
 * <p>Example:
 * <pre>
 * {@code
 * @Inject
 * @SinkNative({"click", "mouseover"})
 * private MyWidget widget;
 * }
 * </pre>
 *
 * The widget's {@link IsWidget#onBrowserEvent(org.teavm.jso.dom.events.Event)} method
 * will be called for each event.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface SinkNative {
    /**
     * The names of the native events to sink (e.g., "click", "change").
     */
    String[] value();
}
