package uk.co.instanto.tearay.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

public class SimpleEventBus {
    private static final SimpleEventBus INSTANCE = new SimpleEventBus();
    private final Map<Class<?>, List<Consumer<Object>>> listeners = new HashMap<>();

    public static SimpleEventBus get() {
        return INSTANCE;
    }

    public <T> void fire(T event) {
        List<Consumer<Object>> list = listeners.get(event.getClass());
        if (list != null) {
            // Copy list to avoid concurrent modification issues
            for (Consumer<Object> consumer : new ArrayList<>(list)) {
                consumer.accept(event);
            }
        }
    }

    @SuppressWarnings("unchecked")
    public <T> void register(Class<T> type, Consumer<T> listener) {
        listeners.computeIfAbsent(type, k -> new ArrayList<>()).add((Consumer<Object>) listener);
    }
}
