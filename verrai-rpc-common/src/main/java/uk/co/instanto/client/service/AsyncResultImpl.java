package uk.co.instanto.client.service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;

public class AsyncResultImpl<T> implements AsyncResult<T> {

    private T result;
    private Throwable error;
    private boolean completed;
    private final List<Consumer<T>> successCallbacks = new ArrayList<>();
    private final List<Consumer<Throwable>> errorCallbacks = new ArrayList<>();

    public AsyncResultImpl() {
    }

    @Override
    public <U> AsyncResult<U> thenApply(Function<T, U> fn) {
        AsyncResultImpl<U> next = new AsyncResultImpl<>();
        onComplete(
                res -> {
                    try {
                        next.complete(fn.apply(res));
                    } catch (Exception e) {
                        next.completeExceptionally(e);
                    }
                },
                err -> next.completeExceptionally(err));
        return next;
    }

    @Override
    public AsyncResult<Void> thenAccept(Consumer<T> action) {
        AsyncResultImpl<Void> next = new AsyncResultImpl<>();
        onComplete(
                res -> {
                    try {
                        action.accept(res);
                        next.complete(null);
                    } catch (Exception e) {
                        next.completeExceptionally(e);
                    }
                },
                err -> next.completeExceptionally(err));
        return next;
    }

    @Override
    public AsyncResult<T> exceptionally(Function<Throwable, T> fn) {
        AsyncResultImpl<T> next = new AsyncResultImpl<>();
        onComplete(
                res -> next.complete(res),
                err -> {
                    try {
                        next.complete(fn.apply(err));
                    } catch (Exception e) {
                        next.completeExceptionally(e);
                    }
                });
        return next;
    }

    public void complete(T result) {
        if (completed)
            return;
        this.result = result;
        this.completed = true;
        for (Consumer<T> cb : successCallbacks) {
            cb.accept(result);
        }
        successCallbacks.clear();
        errorCallbacks.clear();
    }

    public void completeExceptionally(Throwable ex) {
        if (completed)
            return;
        this.error = ex;
        this.completed = true;
        for (Consumer<Throwable> cb : errorCallbacks) {
            cb.accept(ex);
        }
        successCallbacks.clear();
        errorCallbacks.clear();
    }

    private void onComplete(Consumer<T> onSuccess, Consumer<Throwable> onError) {
        if (completed) {
            if (error != null) {
                onError.accept(error);
            } else {
                onSuccess.accept(result);
            }
        } else {
            successCallbacks.add(onSuccess);
            errorCallbacks.add(onError);
        }
    }
}
