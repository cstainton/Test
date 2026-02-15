package uk.co.instanto.client.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.co.instanto.client.service.dto.proto.NodeAnnouncedEvent;
import uk.co.instanto.client.service.dto.proto.NodeDepartedEvent;
import uk.co.instanto.client.service.dto.proto.NodeHeartbeatEvent;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

public class DiscoveryServiceTest {

    @Mock
    private UnitRegistry registry;

    @Mock
    private EventBus eventBus;

    private DiscoveryService discoveryService;
    private final String NODE_ID = "test-node-id";

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        discoveryService = new DiscoveryService(registry, eventBus, NODE_ID);
    }

    @Test
    public void testSetupSubscribesToEvents() {
        // Constructor calls setup(), which calls subscribe
        verify(eventBus).subscribe(eq(NodeAnnouncedEvent.class), any());
        verify(eventBus).subscribe(eq(NodeHeartbeatEvent.class), any());
        verify(eventBus).subscribe(eq(NodeDepartedEvent.class), any());
    }

    @Test
    public void testAnnouncePublishesEvent() {
        Set<String> serviceIds = new HashSet<>(Arrays.asList("service-1", "service-2"));
        when(registry.getDiscoverableServiceIdsInstance()).thenReturn(serviceIds);

        discoveryService.announce();

        ArgumentCaptor<NodeAnnouncedEvent> captor = ArgumentCaptor.forClass(NodeAnnouncedEvent.class);
        verify(eventBus).publish(captor.capture());

        NodeAnnouncedEvent event = captor.getValue();
        assertEquals(NODE_ID, event.nodeId);
        // Compare contents since event.serviceIds is likely a List and order might vary if Set was used as source
        assertEquals(new HashSet<>(serviceIds), new HashSet<>(event.serviceIds));
    }

    @Test
    public void testHeartbeatPublishesEvent() {
        discoveryService.heartbeat();

        ArgumentCaptor<NodeHeartbeatEvent> captor = ArgumentCaptor.forClass(NodeHeartbeatEvent.class);
        verify(eventBus).publish(captor.capture());

        NodeHeartbeatEvent event = captor.getValue();
        assertEquals(NODE_ID, event.nodeId);
    }

    @Test
    public void testByePublishesEvent() {
        discoveryService.bye();

        ArgumentCaptor<NodeDepartedEvent> captor = ArgumentCaptor.forClass(NodeDepartedEvent.class);
        verify(eventBus).publish(captor.capture());

        NodeDepartedEvent event = captor.getValue();
        assertEquals(NODE_ID, event.nodeId);
    }

    @Test
    public void testOnNodeAnnouncedRegistersRemote() {
        // Capture the handler registered in constructor
        ArgumentCaptor<EventHandler<NodeAnnouncedEvent>> captor = ArgumentCaptor.forClass(EventHandler.class);
        verify(eventBus).subscribe(eq(NodeAnnouncedEvent.class), captor.capture());
        EventHandler<NodeAnnouncedEvent> handler = captor.getValue();

        String remoteNodeId = "remote-node";
        List<String> remoteServices = Arrays.asList("remote-service-1");
        NodeAnnouncedEvent event = new NodeAnnouncedEvent.Builder()
                .nodeId(remoteNodeId)
                .serviceIds(remoteServices)
                .timestamp(System.currentTimeMillis())
                .build();

        handler.onEvent(event);

        verify(registry).registerRemote("remote-service-1", remoteNodeId, null);
    }

    @Test
    public void testOnNodeAnnouncedIgnoredForSameNode() {
        ArgumentCaptor<EventHandler<NodeAnnouncedEvent>> captor = ArgumentCaptor.forClass(EventHandler.class);
        verify(eventBus).subscribe(eq(NodeAnnouncedEvent.class), captor.capture());
        EventHandler<NodeAnnouncedEvent> handler = captor.getValue();

        NodeAnnouncedEvent event = new NodeAnnouncedEvent.Builder()
                .nodeId(NODE_ID)
                .serviceIds(Collections.singletonList("service-1"))
                .timestamp(System.currentTimeMillis())
                .build();

        handler.onEvent(event);

        verify(registry, never()).registerRemote(anyString(), anyString(), any());
    }

    @Test
    public void testOnHeartbeatRegistersRemote() {
        ArgumentCaptor<EventHandler<NodeHeartbeatEvent>> captor = ArgumentCaptor.forClass(EventHandler.class);
        verify(eventBus).subscribe(eq(NodeHeartbeatEvent.class), captor.capture());
        EventHandler<NodeHeartbeatEvent> handler = captor.getValue();

        String remoteNodeId = "remote-node";
        NodeHeartbeatEvent event = new NodeHeartbeatEvent.Builder()
                .nodeId(remoteNodeId)
                .timestamp(System.currentTimeMillis())
                .build();

        handler.onEvent(event);

        verify(registry).registerRemote(null, remoteNodeId, null);
    }

    @Test
    public void testOnNodeDepartedRemovesNode() {
        ArgumentCaptor<EventHandler<NodeDepartedEvent>> captor = ArgumentCaptor.forClass(EventHandler.class);
        verify(eventBus).subscribe(eq(NodeDepartedEvent.class), captor.capture());
        EventHandler<NodeDepartedEvent> handler = captor.getValue();

        String remoteNodeId = "remote-node";
        NodeDepartedEvent event = new NodeDepartedEvent.Builder()
                .nodeId(remoteNodeId)
                .timestamp(System.currentTimeMillis())
                .build();

        handler.onEvent(event);

        verify(registry).removeNode(remoteNodeId);
    }
}
