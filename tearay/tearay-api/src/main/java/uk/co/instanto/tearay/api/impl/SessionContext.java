package uk.co.instanto.tearay.api.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Supplier;

public class SessionContext {
    private static SessionContext instance;
    private final Map<Class<?>, Object> instances = new HashMap<>();

    public static SessionContext getInstance() {
        if (instance == null) {
            instance = new SessionContext();
        }
        return instance;
    }

    @SuppressWarnings("unchecked")
    public <T> T get(Class<T> type, Supplier<T> creator) {
        if (instances.containsKey(type)) {
            return (T) instances.get(type);
        }
        T bean = creator.get();
        instances.put(type, bean);
        return bean;
    }

    public void clear() {
        instances.clear();
    }
}
