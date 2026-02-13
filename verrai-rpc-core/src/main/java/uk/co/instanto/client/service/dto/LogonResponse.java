package uk.co.instanto.client.service.dto;

import dev.verrai.rpc.common.annotation.Portable;

@Portable
public class LogonResponse {
    private String jwtToken;
    private String stompAddress;

    public LogonResponse() {
    }

    public LogonResponse(String jwtToken, String stompAddress) {
        this.jwtToken = jwtToken;
        this.stompAddress = stompAddress;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getStompAddress() {
        return stompAddress;
    }

    public void setStompAddress(String stompAddress) {
        this.stompAddress = stompAddress;
    }
}
