package dev.verrai.persistence;

import dev.verrai.api.persistence.EntityManager;
import org.teavm.jso.JSObject;
import org.teavm.jso.JSBody;
import org.teavm.jso.JSProperty;
import org.teavm.jso.JSFunctor;
import org.teavm.jso.browser.Window;
import org.teavm.jso.indexeddb.*;
import org.teavm.jso.core.JSObjects;
import org.teavm.jso.core.JSArray;
import org.teavm.jso.dom.events.Event;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class EntityManagerImpl implements EntityManager {

    private final PersistenceUnit persistenceUnit;
    private IDBDatabase db;
    private boolean open = false;
    private final List<Consumer<IDBDatabase>> pendingOperations = new ArrayList<>();

    public EntityManagerImpl(PersistenceUnit persistenceUnit) {
        this.persistenceUnit = persistenceUnit;
        openDatabase();
    }

    private void openDatabase() {
        IDBFactory factory = ((WindowWithIDB) (Object) Window.current()).getIndexedDB();
        IDBOpenDBRequest request = factory.open(persistenceUnit.getDatabaseName(), persistenceUnit.getDatabaseVersion());

        setOnSuccess(request, evt -> {
            db = ((IDBOpenDBRequestResult) (Object) request).getResult();
            open = true;
            for (Consumer<IDBDatabase> op : pendingOperations) {
                op.accept(db);
            }
            pendingOperations.clear();
        });

        setOnUpgradeNeeded(request, evt -> {
            IDBDatabase upgradeDb = ((IDBOpenDBRequestResult) (Object) request).getResult();
            for (EntityMapper<?> mapper : persistenceUnit.getMappers()) {
                if (!hasObjectStore(upgradeDb, mapper.getEntityName())) {
                     IDBObjectStoreParameters params;
                     if (mapper.getKeyPath() != null) {
                        params = createParams(mapper.getKeyPath(), mapper.isAutoIncrement());
                     } else {
                        params = createParams(mapper.isAutoIncrement());
                     }
                     upgradeDb.createObjectStore(mapper.getEntityName(), params);
                }
            }
        });

        setOnError(request, evt -> {
            IDBError error = ((IDBRequestResult) (Object) request).getError();
            Window.alert("Error opening DB: " + (error != null ? error.getName() : "Unknown"));
        });
    }

    private boolean hasObjectStore(IDBDatabase db, String name) {
        String[] names = db.getObjectStoreNames();
        for (String n : names) {
            if (n.equals(name)) return true;
        }
        return false;
    }

    private void execute(Consumer<IDBDatabase> operation) {
        if (open) {
            operation.accept(db);
        } else {
            pendingOperations.add(operation);
        }
    }

    @Override
    public <T> void persist(T entity) {
        persist(entity, null);
    }

    @Override
    @SuppressWarnings("unchecked")
    public <T> void persist(T entity, Consumer<Void> callback) {
        execute(db -> {
            EntityMapper<T> mapper = (EntityMapper<T>) persistenceUnit.getMapper(entity.getClass());
            IDBTransaction tx = db.transaction(mapper.getEntityName(), "readwrite");
            IDBObjectStore store = tx.objectStore(mapper.getEntityName());

            JSObject jso = mapper.toJSO(entity);
            IDBRequest request;
            if (mapper.isAutoIncrement() || mapper.getKeyPath() != null) {
                request = store.put(jso);
            } else {
                Object id = mapper.getId(entity);
                if (id instanceof String) {
                    request = store.put(jso, toJs((String) id));
                } else if (id instanceof Integer) {
                    request = store.put(jso, toJs((Integer) id));
                } else {
                    request = store.put(jso, (JSObject) id);
                }
            }

            setOnSuccess(request, evt -> {
                 if (mapper.isAutoIncrement()) {
                     JSObject key = ((IDBRequestResult)(Object)request).getResult();
                     Object javaKey = mapper.fromJsId(key);
                     mapper.setId(entity, javaKey);
                 }
                 if (callback != null) callback.accept(null);
            });

            setOnError(request, evt -> {
                 IDBError error = ((IDBRequestResult) (Object) request).getError();
                 Window.alert("Error persisting entity: " + (error != null ? error.getName() : "Unknown"));
            });
        });
    }

    @Override
    public <T> void find(Class<T> type, Object key, Consumer<T> callback) {
        execute(db -> {
            EntityMapper<T> mapper = persistenceUnit.getMapper(type);
            IDBTransaction tx = db.transaction(mapper.getEntityName(), "readonly");
            IDBObjectStore store = tx.objectStore(mapper.getEntityName());

            IDBRequest request;
             if (key instanceof String) {
                 request = store.get(toJs((String) key));
            } else if (key instanceof Integer) {
                 request = store.get(toJs((Integer) key));
            } else {
                 request = store.get((JSObject) key);
            }

            setOnSuccess(request, evt -> {
                JSObject result = ((IDBRequestResult) (Object) request).getResult();
                if (result != null && !JSObjects.isUndefined(result)) {
                    T entity = mapper.fromJSO(result);
                    callback.accept(entity);
                } else {
                    callback.accept(null);
                }
            });

             setOnError(request, evt -> {
                 IDBError error = ((IDBRequestResult) (Object) request).getError();
                 Window.alert("Error finding entity: " + (error != null ? error.getName() : "Unknown"));
                 callback.accept(null);
            });
        });
    }

    @Override
    public <T> void remove(T entity) {
        remove(entity, null);
    }

    @Override
    @SuppressWarnings("unchecked")
    public <T> void remove(T entity, Consumer<Void> callback) {
         execute(db -> {
            EntityMapper<T> mapper = (EntityMapper<T>) persistenceUnit.getMapper(entity.getClass());
            IDBTransaction tx = db.transaction(mapper.getEntityName(), "readwrite");
            IDBObjectStore store = tx.objectStore(mapper.getEntityName());

            Object id = mapper.getId(entity);
            IDBRequest request;
             if (id instanceof String) {
                 request = store.delete(toJs((String) id));
            } else if (id instanceof Integer) {
                 request = store.delete(toJs((Integer) id));
            } else {
                 request = store.delete((JSObject) id);
            }

            setOnSuccess(request, evt -> {
                if (callback != null) callback.accept(null);
            });

             setOnError(request, evt -> {
                 // handle error
            });
        });
    }

    @Override
    public <T> void findAll(Class<T> type, Consumer<List<T>> callback) {
         execute(db -> {
            EntityMapper<T> mapper = persistenceUnit.getMapper(type);
            IDBTransaction tx = db.transaction(mapper.getEntityName(), "readonly");
            IDBObjectStore store = tx.objectStore(mapper.getEntityName());

            IDBRequest request = store.openCursor();
            List<T> list = new ArrayList<>();

            setOnSuccess(request, evt -> {
                IDBCursor cursor = (IDBCursor) ((IDBRequestResult) (Object) request).getResult();
                if (cursor != null && !JSObjects.isUndefined(cursor)) {
                    IDBCursorWithValue valueCursor = (IDBCursorWithValue) (Object) cursor;
                    JSObject value = valueCursor.getValue();
                    list.add(mapper.fromJSO(value));
                    continueCursor(cursor);
                } else {
                    callback.accept(list);
                }
            });

             setOnError(request, evt -> {
                 callback.accept(new ArrayList<>());
            });
        });
    }

    @Override
    public <T> void findAll(Class<T> type, int offset, int limit, Consumer<List<T>> callback) {
         execute(db -> {
            EntityMapper<T> mapper = persistenceUnit.getMapper(type);
            IDBTransaction tx = db.transaction(mapper.getEntityName(), "readonly");
            IDBObjectStore store = tx.objectStore(mapper.getEntityName());

            IDBRequest request = store.openCursor();
            List<T> list = new ArrayList<>();
            final boolean[] advanced = { offset <= 0 };

            setOnSuccess(request, evt -> {
                IDBCursor cursor = (IDBCursor) ((IDBRequestResult) (Object) request).getResult();
                if (cursor != null && !JSObjects.isUndefined(cursor)) {
                    if (!advanced[0]) {
                        advanced[0] = true;
                        advanceCursor(cursor, offset);
                        return;
                    }

                    IDBCursorWithValue valueCursor = (IDBCursorWithValue) (Object) cursor;
                    JSObject value = valueCursor.getValue();
                    list.add(mapper.fromJSO(value));

                    if (list.size() < limit) {
                        continueCursor(cursor);
                    } else {
                        callback.accept(list);
                    }
                } else {
                    callback.accept(list);
                }
            });

             setOnError(request, evt -> {
                 callback.accept(new ArrayList<>());
            });
        });
    }

    @Override
    public <T> void forEach(Class<T> type, Consumer<T> consumer, Consumer<Void> onComplete) {
         execute(db -> {
            EntityMapper<T> mapper = persistenceUnit.getMapper(type);
            IDBTransaction tx = db.transaction(mapper.getEntityName(), "readonly");
            IDBObjectStore store = tx.objectStore(mapper.getEntityName());

            IDBRequest request = store.openCursor();

            setOnSuccess(request, evt -> {
                IDBCursor cursor = (IDBCursor) ((IDBRequestResult) (Object) request).getResult();
                if (cursor != null && !JSObjects.isUndefined(cursor)) {
                    IDBCursorWithValue valueCursor = (IDBCursorWithValue) (Object) cursor;
                    JSObject value = valueCursor.getValue();
                    consumer.accept(mapper.fromJSO(value));
                    continueCursor(cursor);
                } else {
                    if (onComplete != null) onComplete.accept(null);
                }
            });

             setOnError(request, evt -> {
                 if (onComplete != null) onComplete.accept(null);
            });
        });
    }

    @Override
    public <T> void merge(T entity) {
        persist(entity);
    }

    @Override
    public <T> void merge(T entity, Consumer<T> callback) {
        persist(entity, (v) -> callback.accept(entity));
    }

    // Native helpers

    @JSBody(params = "s", script = "return s;")
    private static native JSObject toJs(String s);

    @JSBody(params = "i", script = "return i;")
    private static native JSObject toJs(int i);

    @JSBody(params = {"keyPath", "autoIncrement"}, script = "return { keyPath: keyPath, autoIncrement: autoIncrement };")
    private static native IDBObjectStoreParameters createParams(String keyPath, boolean autoIncrement);

    @JSBody(params = {"autoIncrement"}, script = "return { autoIncrement: autoIncrement };")
    private static native IDBObjectStoreParameters createParams(boolean autoIncrement);

    @JSBody(params = {"cursor", "count"}, script = "cursor.advance(count);")
    private static native void advanceCursor(IDBCursor cursor, int count);

    @JSBody(params = "cursor", script = "cursor.continue();")
    private static native void continueCursor(IDBCursor cursor);

    @JSBody(params = {"request", "handler"}, script = "request.onsuccess = handler;")
    private static native void setOnSuccess(IDBRequest request, IDBEventHandler handler);

    @JSBody(params = {"request", "handler"}, script = "request.onerror = handler;")
    private static native void setOnError(IDBRequest request, IDBEventHandler handler);

    @JSBody(params = {"request", "handler"}, script = "request.onupgradeneeded = handler;")
    private static native void setOnUpgradeNeeded(IDBOpenDBRequest request, IDBEventHandler handler);

    @JSFunctor
    public interface IDBEventHandler extends JSObject {
        void handleEvent(Event evt);
    }

    interface WindowWithIDB extends JSObject {
        @JSProperty
        IDBFactory getIndexedDB();
    }

    interface IDBRequestResult extends JSObject {
        @JSProperty
        JSObject getResult();

        @JSProperty
        IDBError getError();
    }

    interface IDBOpenDBRequestResult extends JSObject {
        @JSProperty
        IDBDatabase getResult();
    }

    interface IDBCursorWithValue extends JSObject {
        @JSProperty
        JSObject getValue();
    }
}
