package uk.co.instanto.tearay.rpc.common.transport.stomp;

import java.util.Map;

public interface StompMessage {
    String getBody();

    Map<String, String> getHeaders();
}
