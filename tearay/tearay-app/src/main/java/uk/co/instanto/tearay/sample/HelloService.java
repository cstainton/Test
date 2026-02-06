package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.api.cdi.ApplicationScoped;

@ApplicationScoped
public class HelloService {
    public String getGreeting() {
        return "Hello from Injected Service! Time: " + System.currentTimeMillis();
    }
}
