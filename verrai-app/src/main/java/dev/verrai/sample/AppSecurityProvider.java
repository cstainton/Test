package dev.verrai.sample;

import dev.verrai.api.ApplicationScoped;
import dev.verrai.api.SecurityProvider;
import java.util.HashSet;
import java.util.Set;
import java.util.Arrays;

@ApplicationScoped
public class AppSecurityProvider implements SecurityProvider {

    private Set<String> roles = new HashSet<>();

    @Override
    public boolean hasRole(String role) {
        return roles.contains(role);
    }

    public void setRoles(String... newRoles) {
        this.roles.clear();
        this.roles.addAll(Arrays.asList(newRoles));
    }
}
