package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.api.ApplicationScoped;

@ApplicationScoped
public class HelloService implements GreetingService {
    @Override
    public String getGreeting() {
        return "Hello from Injected Service! Time: " + System.currentTimeMillis();
    }
}
