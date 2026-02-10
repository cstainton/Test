package dev.verrai.persistence;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public abstract class PersistenceUnit {
    private final Map<Class<?>, EntityMapper<?>> mappers = new HashMap<>();

    public abstract String getDatabaseName();
    public abstract int getDatabaseVersion();

    protected <T> void register(Class<T> type, EntityMapper<T> mapper) {
        mappers.put(type, mapper);
    }

    @SuppressWarnings("unchecked")
    public <T> EntityMapper<T> getMapper(Class<T> type) {
        return (EntityMapper<T>) mappers.get(type);
    }

    public Collection<EntityMapper<?>> getMappers() {
        return mappers.values();
    }
}
