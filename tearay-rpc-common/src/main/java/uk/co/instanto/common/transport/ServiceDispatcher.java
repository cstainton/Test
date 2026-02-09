package uk.co.instanto.common.transport;

import uk.co.instanto.client.service.proto.RpcPacket;

public interface ServiceDispatcher {
    void dispatch(RpcPacket packet, Object implementation, Transport transport);
}
