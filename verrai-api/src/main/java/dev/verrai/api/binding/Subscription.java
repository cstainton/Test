package dev.verrai.api.binding;

/**
 * Represents a registration for a binding or event handler.
 * Calling remove() removes the registration.
 */
public interface Subscription {
    void remove();
}
