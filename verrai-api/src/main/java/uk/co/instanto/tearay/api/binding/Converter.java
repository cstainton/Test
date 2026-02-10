package uk.co.instanto.tearay.api.binding;

public interface Converter<M, W> {
    /**
     * Converts a value from the widget (view) to the model.
     * @param widgetValue the value from the widget
     * @return the value for the model
     */
    M toModel(W widgetValue);

    /**
     * Converts a value from the model to the widget (view).
     * @param modelValue the value from the model
     * @return the value for the widget
     */
    W toWidget(M modelValue);
}
