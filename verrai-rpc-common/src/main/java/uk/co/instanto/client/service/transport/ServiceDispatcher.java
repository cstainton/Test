package uk.co.instanto.client.service.transport;

import uk.co.instanto.client.service.proto.RpcPacket;
import dev.verrai.rpc.common.transport.Transport;

public interface ServiceDispatcher {
    void dispatch(RpcPacket packet, Object implementation, Transport transport);
}
