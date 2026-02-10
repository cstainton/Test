package dev.verrai.api.binding;

/**
 * Interface for components that manage their own bindings.
 * Implementations should call Subscription.remove() when the component is destroyed.
 */
public interface BinderLifecycle {
    void addBinding(Subscription subscription);
    void clearBindings();
}
