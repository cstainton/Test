package dev.verrai.api.binding;

/**
 * Interface for type converters used in data binding.
 * @param <M> The model type
 * @param <W> The widget type
 */
public interface Converter<M, W> {
    M toModel(W widgetValue);
    W toWidget(M modelValue);
}
