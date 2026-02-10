package dev.verrai.ui;

public interface HasModel<M> {
    void setModel(M model);
    M getModel();
}
