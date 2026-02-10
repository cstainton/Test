package uk.co.instanto.demo.service.dto;

import uk.co.instanto.tearay.rpc.common.annotation.Event;

/**
 * Event published when a greeting is echoed.
 */
@Event
public class GreetingEchoedEvent {
    private String originalMessage;
    private String echoedBy;
    private long timestamp;

    public GreetingEchoedEvent() {
    }

    public GreetingEchoedEvent(String originalMessage, String echoedBy, long timestamp) {
        this.originalMessage = originalMessage;
        this.echoedBy = echoedBy;
        this.timestamp = timestamp;
    }

    public String getOriginalMessage() {
        return originalMessage;
    }

    public void setOriginalMessage(String originalMessage) {
        this.originalMessage = originalMessage;
    }

    public String getEchoedBy() {
        return echoedBy;
    }

    public void setEchoedBy(String echoedBy) {
        this.echoedBy = echoedBy;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "GreetingEchoedEvent{originalMessage='" + originalMessage + "', echoedBy='" + echoedBy + "', timestamp="
                + timestamp + "}";
    }
}
