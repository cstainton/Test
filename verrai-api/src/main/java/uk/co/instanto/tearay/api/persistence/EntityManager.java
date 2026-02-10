package uk.co.instanto.tearay.api.persistence;

import java.util.List;
import java.util.function.Consumer;

public interface EntityManager {
    <T> void persist(T entity);
    <T> void persist(T entity, Consumer<Void> callback);

    <T> void find(Class<T> type, Object key, Consumer<T> callback);

    <T> void remove(T entity);
    <T> void remove(T entity, Consumer<Void> callback);

    <T> void findAll(Class<T> type, Consumer<List<T>> callback);

    <T> void merge(T entity);
    <T> void merge(T entity, Consumer<T> callback);
}
