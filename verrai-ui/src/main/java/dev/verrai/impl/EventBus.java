package dev.verrai.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

public class EventBus {
    private static final Map<Class<?>, List<Consumer<Object>>> observers = new HashMap<>();

    public static <T> void register(Class<T> eventType, Consumer<T> observer) {
        if (!observers.containsKey(eventType)) {
            observers.put(eventType, new ArrayList<>());
        }
        observers.get(eventType).add((Consumer<Object>) observer);
    }

    public static void fire(Object event) {
        Class<?> eventType = event.getClass();
        List<Consumer<Object>> eventObservers = observers.get(eventType);
        if (eventObservers != null) {
            for (Consumer<Object> observer : eventObservers) {
                observer.accept(event);
            }
        }
    }
}
