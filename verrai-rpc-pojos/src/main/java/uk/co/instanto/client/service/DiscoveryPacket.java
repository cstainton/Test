package uk.co.instanto.client.service;

import dev.verrai.rpc.common.annotation.Portable;
import java.util.List;

@Portable
public class DiscoveryPacket {

    public enum Type {
        ANNOUNCE,
        HEARTBEAT,
        BYE
    }

    private Type type;
    private String nodeId;
    private List<String> serviceIds;

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
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
}
