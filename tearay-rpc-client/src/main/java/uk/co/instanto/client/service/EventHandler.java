package uk.co.instanto.client.service;

/**
 * Functional interface for handling events.
 * 
 * @param <T> The type of event to handle
 */
@FunctionalInterface
public interface EventHandler<T> {
    /**
     * Called when an event of type T is received.
     * 
     * @param event The event object
     */
    void onEvent(T event);
}
