package uk.co.instanto.client.service.dto;

import uk.co.instanto.tearay.rpc.common.annotation.Event;

/**
 * Event published when a node gracefully leaves the network.
 */
@Event
public class NodeDepartedEvent {
    private String nodeId;
    private long timestamp;

    public NodeDepartedEvent() {
    }

    public NodeDepartedEvent(String nodeId, long timestamp) {
        this.nodeId = nodeId;
        this.timestamp = timestamp;
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "NodeDepartedEvent{nodeId='" + nodeId + "', timestamp=" + timestamp + "}";
    }
}
