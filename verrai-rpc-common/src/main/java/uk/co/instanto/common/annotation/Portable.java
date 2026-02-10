package uk.co.instanto.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Marks a class as Portable - meaning it can be serialized for transport
 * between client and service sides using Protobuf.
 * 
 * Classes annotated with @Portable will have proto definitions and codecs
 * automatically generated during the build process.
 * 
 * This annotation is inspired by Errai framework's portable type system.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Portable {
}
