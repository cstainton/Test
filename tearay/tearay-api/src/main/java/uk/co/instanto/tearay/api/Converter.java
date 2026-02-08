package uk.co.instanto.tearay.api;

public interface Converter<M, W> {
    M toModelValue(W widgetValue);
    W toWidgetValue(M modelValue);
}
