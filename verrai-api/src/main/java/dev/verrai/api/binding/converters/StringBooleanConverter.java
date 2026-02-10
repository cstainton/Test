package dev.verrai.api.binding.converters;

import dev.verrai.api.binding.Converter;

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
