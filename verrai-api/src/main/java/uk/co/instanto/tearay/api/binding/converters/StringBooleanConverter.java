package uk.co.instanto.tearay.api.binding.converters;

import uk.co.instanto.tearay.api.binding.Converter;

public class StringBooleanConverter implements Converter<Boolean, String> {
    @Override
    public Boolean toModel(String widgetValue) {
        if (widgetValue == null) return null;
        return Boolean.parseBoolean(widgetValue);
    }

    @Override
    public String toWidget(Boolean modelValue) {
        return modelValue == null ? "false" : modelValue.toString();
    }
}
