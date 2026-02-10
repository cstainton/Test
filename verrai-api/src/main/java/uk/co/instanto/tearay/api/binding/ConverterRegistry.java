package uk.co.instanto.tearay.api.binding;

import uk.co.instanto.tearay.api.binding.converters.*;
import java.util.HashMap;
import java.util.Map;

public class ConverterRegistry {
    private static final Map<String, Converter<?, ?>> converters = new HashMap<>();

    static {
        register(Integer.class, String.class, new StringIntegerConverter());
        register(int.class, String.class, new StringIntegerConverter());
        register(Boolean.class, String.class, new StringBooleanConverter());
        register(boolean.class, String.class, new StringBooleanConverter());
        register(Long.class, String.class, new StringLongConverter());
        register(long.class, String.class, new StringLongConverter());
        register(Double.class, String.class, new StringDoubleConverter());
        register(double.class, String.class, new StringDoubleConverter());
    }

    public static <M, W> void register(Class<M> modelType, Class<W> widgetType, Converter<M, W> converter) {
        converters.put(key(modelType, widgetType), converter);
    }

    @SuppressWarnings("unchecked")
    public static <M, W> Converter<M, W> get(Class<M> modelType, Class<W> widgetType) {
        return (Converter<M, W>) converters.get(key(modelType, widgetType));
    }

    private static String key(Class<?> modelType, Class<?> widgetType) {
        return modelType.getName() + "->" + widgetType.getName();
    }
}
