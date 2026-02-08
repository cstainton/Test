package uk.co.instanto.tearay.api;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.TYPE;

@Target({TYPE, METHOD, PARAMETER, FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Qualifier
public @interface Named {
    String value() default "";
}
