package uk.co.instanto.tearay.api.binding.converters;

import uk.co.instanto.tearay.api.binding.Converter;

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
