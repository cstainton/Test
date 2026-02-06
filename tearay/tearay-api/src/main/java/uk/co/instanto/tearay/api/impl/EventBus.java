package uk.co.instanto.tearay.api.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

public class EventBus {
    private static EventBus instance;
    private final Map<Class<?>, List<Consumer<Object>>> subscribers = new HashMap<>();

    public static EventBus getInstance() {
        if (instance == null) {
            instance = new EventBus();
        }
        return instance;
    }

    public <T> void subscribe(Class<T> type, Consumer<T> listener) {
        subscribers.computeIfAbsent(type, k -> new ArrayList<>())
                   .add((Consumer<Object>) listener);
    }

    public void fire(Object event) {
        if (event == null) return;
        List<Consumer<Object>> listeners = subscribers.get(event.getClass());
        if (listeners != null) {
            for (Consumer<Object> listener : listeners) {
                listener.accept(event);
            }
        }
    }
}
