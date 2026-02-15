package uk.co.instanto.client.service;

import uk.co.instanto.client.service.proto.RpcPacket;

/**
 * Interface for authenticating RPC requests.
 */
public interface Authenticator {
    /**
     * Authenticates the given RPC packet.
     *
     * @param packet The RPC packet to authenticate.
     * @return true if the packet is authenticated and should be processed; false otherwise.
     */
    boolean authenticate(RpcPacket packet);
}
