package uk.co.instanto.client.service.dto;

import uk.co.instanto.tearay.rpc.common.annotation.Event;

/**
 * Event published periodically to indicate a node is still alive.
 */
@Event
public class NodeHeartbeatEvent {
    private String nodeId;
    private long timestamp;

    public NodeHeartbeatEvent() {
    }

    public NodeHeartbeatEvent(String nodeId, long timestamp) {
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
        return "NodeHeartbeatEvent{nodeId='" + nodeId + "', timestamp=" + timestamp + "}";
    }
}
