package uk.co.instanto.client.service;

/**
 * callback for when a service is ready (discovered and instantiated).
 */
public interface ServiceReadyCallback<T> {
    void onServiceReady(T service);
}
