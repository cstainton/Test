package dev.verrai.api.binding;

/**
 * Handler interface for property change events.
 */
public interface PropertyChangeHandler {
    void onPropertyChange(String property, Object value);
}
