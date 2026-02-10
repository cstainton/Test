package dev.verrai.api.binding;

import java.util.HashMap;
import java.util.Map;

/**
 * Registry for type converters.
 */
public class ConverterRegistry {
    private static final Map<String, Converter<?, ?>> converters = new HashMap<>();

    static {
        // Integer <-> String
        register(Integer.class, String.class, new Converter<Integer, String>() {
            @Override
            public Integer toModel(String widgetValue) {
                if (widgetValue == null || widgetValue.isEmpty()) return null;
                try { return Integer.valueOf(widgetValue); } catch (NumberFormatException e) { return null; }
            }
            @Override
            public String toWidget(Integer modelValue) {
                return modelValue == null ? "" : modelValue.toString();
            }
        });

        // Double <-> String
        register(Double.class, String.class, new Converter<Double, String>() {
             @Override
             public Double toModel(String widgetValue) {
                 if (widgetValue == null || widgetValue.isEmpty()) return null;
                 try { return Double.valueOf(widgetValue); } catch (NumberFormatException e) { return null; }
             }
             @Override
             public String toWidget(Double modelValue) {
                 return modelValue == null ? "" : modelValue.toString();
             }
        });

        // Long <-> String
        register(Long.class, String.class, new Converter<Long, String>() {
             @Override
             public Long toModel(String widgetValue) {
                 if (widgetValue == null || widgetValue.isEmpty()) return null;
                 try { return Long.valueOf(widgetValue); } catch (NumberFormatException e) { return null; }
             }
             @Override
             public String toWidget(Long modelValue) {
                 return modelValue == null ? "" : modelValue.toString();
             }
        });

        // Boolean <-> String
        register(Boolean.class, String.class, new Converter<Boolean, String>() {
             @Override
             public Boolean toModel(String widgetValue) {
                 if (widgetValue == null) return null;
                 return Boolean.valueOf(widgetValue);
             }
             @Override
             public String toWidget(Boolean modelValue) {
                 return modelValue == null ? "false" : modelValue.toString();
             }
        });
    }

    public static <M, W> void register(Class<M> modelType, Class<W> widgetType, Converter<M, W> converter) {
        converters.put(getKey(modelType, widgetType), converter);
    }

    @SuppressWarnings("unchecked")
    public static <M, W> Converter<M, W> get(Class<M> modelType, Class<W> widgetType) {
        return (Converter<M, W>) converters.get(getKey(modelType, widgetType));
    }

    private static String getKey(Class<?> modelType, Class<?> widgetType) {
        return modelType.getName() + "->" + widgetType.getName();
    }
}
