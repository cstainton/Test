package uk.co.instanto.common.transport.stomp;

import java.util.Map;

public interface StompMessage {
    String getBody();

    Map<String, String> getHeaders();
}
