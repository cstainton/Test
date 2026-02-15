package uk.co.instanto.client.service.dummy;

import uk.co.instanto.client.service.transport.ServiceDispatcher;
import uk.co.instanto.client.service.proto.RpcPacket;
import dev.verrai.rpc.common.transport.Transport;

public class TestService_Dispatcher implements ServiceDispatcher {
    @Override
    public void dispatch(RpcPacket packet, Object implementation, Transport transport) {
        // No-op for test
    }
}
