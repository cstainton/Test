package dev.verrai.persistence;

import org.teavm.jso.JSObject;

public interface EntityMapper<T> {
    Class<T> getEntityClass();
    String getEntityName();
    Object getId(T entity);
    void setId(T entity, Object id);
    Object fromJsId(JSObject id);
    JSObject toJSO(T entity);
    T fromJSO(JSObject jso);
    String getKeyPath();
    boolean isAutoIncrement();
}
