package uk.co.instanto.client.service.dto;

import dev.verrai.rpc.common.annotation.Portable;

@Portable
public class LogonRequest {
    private String username;
    private String password;

    public LogonRequest() {}

    public LogonRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
