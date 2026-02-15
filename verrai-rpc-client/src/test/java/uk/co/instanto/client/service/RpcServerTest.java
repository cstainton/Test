package uk.co.instanto.client.service;

import dev.verrai.rpc.common.transport.MessageHandler;
import dev.verrai.rpc.common.transport.Transport;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.co.instanto.client.service.proto.RpcPacket;
import uk.co.instanto.client.service.transport.ServiceDispatcher;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class RpcServerTest {

    @Mock
    private Transport transport;

    @Mock
    private UnitRegistry registry;

    @Mock
    private ServiceDispatcher dispatcher;

    private RpcServer rpcServer;
    private MessageHandler messageHandler;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        rpcServer = new RpcServer(transport, registry);

        ArgumentCaptor<MessageHandler> handlerCaptor = ArgumentCaptor.forClass(MessageHandler.class);
        verify(transport).addMessageHandler(handlerCaptor.capture());
        messageHandler = handlerCaptor.getValue();
    }

    @Test
    public void testConstructorRegistersMessageHandler() {
        verify(transport).addMessageHandler(any(MessageHandler.class));
    }

    @Test
    public void testHandleIncomingBytes_SuccessfulRequest() {
        String serviceId = "TestService";
        Object serviceImpl = new Object();

        when(registry.getLocalServiceInstance(serviceId)).thenReturn(serviceImpl);
        rpcServer.registerDispatcher(serviceId, dispatcher);

        RpcPacket packet = new RpcPacket.Builder()
                .type(RpcPacket.Type.REQUEST)
                .serviceId(serviceId)
                .methodName("someMethod")
                .requestId("req-1")
                .build();

        byte[] encoded = RpcPacket.ADAPTER.encode(packet);

        messageHandler.onMessage(encoded);

        verify(registry).getLocalServiceInstance(serviceId);
        verify(dispatcher).dispatch(any(RpcPacket.class), eq(serviceImpl), eq(transport));
    }

    @Test
    public void testHandleIncomingBytes_NoServiceInstance() {
        String serviceId = "UnknownService";

        when(registry.getLocalServiceInstance(serviceId)).thenReturn(null);
        rpcServer.registerDispatcher(serviceId, dispatcher);

        RpcPacket packet = new RpcPacket.Builder()
                .type(RpcPacket.Type.REQUEST)
                .serviceId(serviceId)
                .requestId("req-2")
                .build();

        byte[] encoded = RpcPacket.ADAPTER.encode(packet);

        messageHandler.onMessage(encoded);

        verify(registry).getLocalServiceInstance(serviceId);
        verify(dispatcher, never()).dispatch(any(), any(), any());
    }

    @Test
    public void testHandleIncomingBytes_NoDispatcher() {
        String serviceId = "NoDispatcherService";
        Object serviceImpl = new Object();

        when(registry.getLocalServiceInstance(serviceId)).thenReturn(serviceImpl);
        // Do NOT register dispatcher

        RpcPacket packet = new RpcPacket.Builder()
                .type(RpcPacket.Type.REQUEST)
                .serviceId(serviceId)
                .requestId("req-3")
                .build();

        byte[] encoded = RpcPacket.ADAPTER.encode(packet);

        messageHandler.onMessage(encoded);

        verify(registry).getLocalServiceInstance(serviceId);
        verify(dispatcher, never()).dispatch(any(), any(), any());
    }

    @Test
    public void testHandleIncomingBytes_InvalidPacketType() {
        String serviceId = "TestService";
        Object serviceImpl = new Object();

        when(registry.getLocalServiceInstance(serviceId)).thenReturn(serviceImpl);
        rpcServer.registerDispatcher(serviceId, dispatcher);

        RpcPacket packet = new RpcPacket.Builder()
                .type(RpcPacket.Type.RESPONSE) // Not REQUEST
                .serviceId(serviceId)
                .requestId("req-4")
                .build();

        byte[] encoded = RpcPacket.ADAPTER.encode(packet);

        messageHandler.onMessage(encoded);

        // Should decode but not dispatch
        verify(dispatcher, never()).dispatch(any(), any(), any());
    }

    @Test
    public void testHandleIncomingBytes_GarbageData() {
        byte[] garbage = new byte[]{1, 2, 3, 4, 5};

        try {
            messageHandler.onMessage(garbage);
        } catch (Exception e) {
            // Should be caught inside RpcServer
            org.junit.Assert.fail("Exception should have been caught inside RpcServer");
        }

        verify(dispatcher, never()).dispatch(any(), any(), any());
    }
}
