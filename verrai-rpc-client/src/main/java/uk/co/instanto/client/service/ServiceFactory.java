package uk.co.instanto.client.service;

import uk.co.instanto.client.service.RpcClient;

/**
 * A factory for creating service stubs.
 * Used by the ServiceRegistry to instantiate stubs dynamically.
 *
 * @param <T> The service interface type.
 */
public interface ServiceFactory<T> {
    /**
     * Creates a new stub for the service using the given RpcClient.
     *
     * @param client The RpcClient configured for the target node/transport.
     * @return A new service stub instance.
     */
    T create(RpcClient client);
}
