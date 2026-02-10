package uk.co.instanto.tearay.api.binding.converters;

import uk.co.instanto.tearay.api.binding.Converter;

public class StringDoubleConverter implements Converter<Double, String> {
    @Override
    public Double toModel(String widgetValue) {
        if (widgetValue == null || widgetValue.trim().isEmpty()) {
            return null;
        }
        try {
            return Double.parseDouble(widgetValue);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    @Override
    public String toWidget(Double modelValue) {
        return modelValue == null ? "" : modelValue.toString();
    }
}
