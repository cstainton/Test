package uk.co.instanto.tearay.api;

import org.teavm.jso.dom.html.HTMLElement;
import java.util.ArrayList;
import java.util.List;
import java.util.function.BiConsumer;
import java.util.function.Function;

public class DataBinder<T> {

    private T model;
    private final List<Binding<T, ?, ?>> bindings = new ArrayList<>();

    public void setModel(T model) {
        this.model = model;
        updateWidgets();
    }

    public T getModel() {
        return model;
    }

    public <M, W> void bind(TakesValue<W> widget, Function<T, M> getter, BiConsumer<T, M> setter, Class<M> modelType, Class<W> widgetType) {
        Converter<M, W> converter = ConverterRegistry.find(modelType, widgetType);
        if (converter == null) {
            if (modelType.equals(widgetType)) {
                @SuppressWarnings("unchecked")
                Converter<M, W> identity = (Converter<M, W>) new IdentityConverter<>();
                converter = identity;
            } else {
                throw new IllegalArgumentException("No converter found for model type " + modelType.getName() + " and widget type " + widgetType.getName());
            }
        }
        bind(widget, getter, setter, converter);
    }

    public <M> void bind(TakesValue<M> widget, Function<T, M> getter, BiConsumer<T, M> setter) {
        bind(widget, getter, setter, new IdentityConverter<>());
    }

    public <M, W> void bind(TakesValue<W> widget, Function<T, M> getter, BiConsumer<T, M> setter, Converter<M, W> converter) {
        Binding<T, M, W> binding = new Binding<>(widget, getter, setter, converter);
        bindings.add(binding);

        // Register change listener
        if (widget instanceof IsWidget) {
            HTMLElement element = ((IsWidget) widget).getElement();
            if (element != null) {
                element.addEventListener("change", evt -> {
                    updateModel(binding);
                });
            }
        } else if (widget instanceof HTMLElement) {
             ((HTMLElement) widget).addEventListener("change", evt -> {
                 updateModel(binding);
             });
        }

        // Initial update if model is present
        if (model != null) {
            updateWidget(binding);
        }
    }

    private void updateWidgets() {
        if (model == null) return;
        for (Binding<T, ?, ?> binding : bindings) {
            updateWidget(binding);
        }
    }

    @SuppressWarnings("unchecked")
    private <M, W> void updateWidget(Binding<T, M, W> binding) {
        M modelValue = binding.getter.apply(model);
        W widgetValue = binding.converter.toWidgetValue(modelValue);
        binding.widget.setValue(widgetValue);
    }

    @SuppressWarnings("unchecked")
    private <M, W> void updateModel(Binding<T, M, W> binding) {
        if (model == null) return;
        W widgetValue = binding.widget.getValue();
        M modelValue = binding.converter.toModelValue(widgetValue);
        binding.setter.accept(model, modelValue);
    }

    private static class Binding<T, M, W> {
        final TakesValue<W> widget;
        final Function<T, M> getter;
        final BiConsumer<T, M> setter;
        final Converter<M, W> converter;

        Binding(TakesValue<W> widget, Function<T, M> getter, BiConsumer<T, M> setter, Converter<M, W> converter) {
            this.widget = widget;
            this.getter = getter;
            this.setter = setter;
            this.converter = converter;
        }
    }

    private static class IdentityConverter<V> implements Converter<V, V> {
        @Override
        public V toModelValue(V widgetValue) {
            return widgetValue;
        }

        @Override
        public V toWidgetValue(V modelValue) {
            return modelValue;
        }
    }
}
