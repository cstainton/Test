package dev.verrai.api.binding;

/**
 * Interface implemented by generated proxies for @Bindable types.
 */
public interface BindableProxy {
    Subscription addPropertyChangeHandler(PropertyChangeHandler handler);
    void removePropertyChangeHandler(PropertyChangeHandler handler);
}
