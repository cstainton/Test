package com.example;

import com.example.errai.api.ApplicationScoped;

@ApplicationScoped
public class HelloService {
    public String getGreeting() {
        return "Hello from Injected Service! Time: " + System.currentTimeMillis();
    }
}
