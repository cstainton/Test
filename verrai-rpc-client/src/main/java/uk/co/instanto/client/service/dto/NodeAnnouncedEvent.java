package uk.co.instanto.client.service.dto;

import uk.co.instanto.tearay.rpc.common.annotation.Event;
import java.util.List;

/**
 * Event published when a node announces itself to the network.
 */
@Event
public class NodeAnnouncedEvent {
    private String nodeId;
    private List<String> serviceIds;
    private long timestamp;

    public NodeAnnouncedEvent() {
    }

    public NodeAnnouncedEvent(String nodeId, List<String> serviceIds, long timestamp) {
        this.nodeId = nodeId;
        this.serviceIds = serviceIds;
        this.timestamp = timestamp;
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public List<String> getServiceIds() {
        return serviceIds;
    }

    public void setServiceIds(List<String> serviceIds) {
        this.serviceIds = serviceIds;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "NodeAnnouncedEvent{nodeId='" + nodeId + "', serviceIds=" + serviceIds + ", timestamp=" + timestamp
                + "}";
    }
}
