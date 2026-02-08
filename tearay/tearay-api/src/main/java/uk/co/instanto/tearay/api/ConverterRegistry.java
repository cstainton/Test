package uk.co.instanto.tearay.api;

import java.util.HashMap;
import java.util.Map;

public class ConverterRegistry {

    private static final Map<Class<?>, Map<Class<?>, Converter<?, ?>>> converters = new HashMap<>();

    static {
        // Model: Integer, Widget: String (e.g. TextBox)
        register(Integer.class, String.class, new Converter<Integer, String>() {
            @Override
            public Integer toModelValue(String widgetValue) {
                if (widgetValue == null || widgetValue.isEmpty()) return null;
                try {
                    return Integer.parseInt(widgetValue);
                } catch (NumberFormatException e) {
                    return null;
                }
            }

            @Override
            public String toWidgetValue(Integer modelValue) {
                return modelValue == null ? "" : modelValue.toString();
            }
        });

        // Model: String, Widget: Integer (e.g. Slider)
        register(String.class, Integer.class, new Converter<String, Integer>() {
            @Override
            public String toModelValue(Integer widgetValue) {
                return widgetValue == null ? null : widgetValue.toString();
            }

            @Override
            public Integer toWidgetValue(String modelValue) {
                if (modelValue == null || modelValue.isEmpty()) return null;
                try {
                    return Integer.parseInt(modelValue);
                } catch (NumberFormatException e) {
                    return null;
                }
            }
        });

        // Model: Long, Widget: String
        register(Long.class, String.class, new Converter<Long, String>() {
            @Override
            public Long toModelValue(String widgetValue) {
                 if (widgetValue == null || widgetValue.isEmpty()) return null;
                 try {
                    return Long.parseLong(widgetValue);
                } catch (NumberFormatException e) {
                    return null;
                }
            }

            @Override
            public String toWidgetValue(Long modelValue) {
                return modelValue == null ? "" : modelValue.toString();
            }
        });

        // Model: Double, Widget: String
        register(Double.class, String.class, new Converter<Double, String>() {
            @Override
            public Double toModelValue(String widgetValue) {
                 if (widgetValue == null || widgetValue.isEmpty()) return null;
                 try {
                    return Double.parseDouble(widgetValue);
                } catch (NumberFormatException e) {
                    return null;
                }
            }

            @Override
            public String toWidgetValue(Double modelValue) {
                return modelValue == null ? "" : modelValue.toString();
            }
        });

         // Model: Boolean, Widget: String
        register(Boolean.class, String.class, new Converter<Boolean, String>() {
            @Override
            public Boolean toModelValue(String widgetValue) {
                 return Boolean.parseBoolean(widgetValue);
            }

            @Override
            public String toWidgetValue(Boolean modelValue) {
                return modelValue == null ? "false" : modelValue.toString();
            }
        });
    }

    public static <M, W> void register(Class<M> modelType, Class<W> widgetType, Converter<M, W> converter) {
        converters.computeIfAbsent(modelType, k -> new HashMap<>()).put(widgetType, converter);
    }

    @SuppressWarnings("unchecked")
    public static <M, W> Converter<M, W> find(Class<M> modelType, Class<W> widgetType) {
        Map<Class<?>, Converter<?, ?>> widgetMap = converters.get(modelType);
        if (widgetMap != null) {
            Converter<?, ?> converter = widgetMap.get(widgetType);
            if (converter != null) {
                return (Converter<M, W>) converter;
            }
        }
        return null;
    }
}
