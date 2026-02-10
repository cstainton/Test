package dev.verrai.api;

public interface SecurityProvider {
    boolean hasRole(String role);
}
