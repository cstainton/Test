package dev.verrai.sample;

import dev.verrai.api.ApplicationScoped;

@ApplicationScoped
public class HelloService implements GreetingService {
    @Override
    public String getGreeting() {
        return "Hello from Injected Service! Time: " + System.currentTimeMillis();
    }
}
