package dev.verrai.api.binding.converters;

import dev.verrai.api.binding.Converter;

public class StringLongConverter implements Converter<Long, String> {
    @Override
    public Long toModel(String widgetValue) {
        if (widgetValue == null || widgetValue.trim().isEmpty()) {
            return null;
        }
        try {
            return Long.parseLong(widgetValue);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    @Override
    public String toWidget(Long modelValue) {
        return modelValue == null ? "" : modelValue.toString();
    }
}
