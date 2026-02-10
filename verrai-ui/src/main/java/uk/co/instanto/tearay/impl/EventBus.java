package uk.co.instanto.tearay.impl;

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
        if (observers.containsKey(eventType)) {
            for (Consumer<Object> observer : observers.get(eventType)) {
                observer.accept(event);
            }
        }
    }
}
