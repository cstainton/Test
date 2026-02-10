package dev.verrai.api;

import java.util.Map;

public interface Navigation {
    void goTo(String role);
    void goTo(String role, Map<String, String> state);
}
