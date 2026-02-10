package dev.verrai.api.binding.converters;

import dev.verrai.api.binding.Converter;

public class StringIntegerConverter implements Converter<Integer, String> {
    @Override
    public Integer toModel(String widgetValue) {
        if (widgetValue == null || widgetValue.trim().isEmpty()) {
            return null;
        }
        try {
            return Integer.parseInt(widgetValue);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    @Override
    public String toWidget(Integer modelValue) {
        return modelValue == null ? "" : modelValue.toString();
    }
}
