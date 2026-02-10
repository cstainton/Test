package dev.verrai.api.i18n;

/**
 * Helper class for internationalization.
 */
public class I18nHelper {

    /**
     * Formats a message pattern with arguments.
     * Replaces {0}, {1}, etc. with the string representation of the corresponding argument.
     *
     * @param pattern the message pattern
     * @param args    the arguments
     * @return the formatted string
     */
    public static String format(String pattern, Object... args) {
        if (pattern == null) {
            return "";
        }
        if (args == null || args.length == 0) {
            return pattern;
        }

        String result = pattern;
        for (int i = 0; i < args.length; i++) {
            String token = "{" + i + "}";
            String value = args[i] == null ? "null" : args[i].toString();
            // Simple replace. For more complex cases, a proper parser is needed,
            // but for TeaVM and simple use cases, this is a start.
            // Note: This does not handle escaped braces or nested braces.
            result = result.replace(token, value);
        }
        return result;
    }
}
