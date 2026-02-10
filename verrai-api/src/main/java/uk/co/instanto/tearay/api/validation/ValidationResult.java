package uk.co.instanto.tearay.api.validation;

import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

public class ValidationResult {
    private final boolean valid;
    private final List<String> messages;

    public ValidationResult(boolean valid, List<String> messages) {
        this.valid = valid;
        this.messages = messages == null ? Collections.emptyList() : Collections.unmodifiableList(messages);
    }

    public static ValidationResult valid() {
        return new ValidationResult(true, null);
    }

    public static ValidationResult invalid(List<String> messages) {
        return new ValidationResult(false, messages);
    }

    public static ValidationResult invalid(String message) {
        List<String> list = new ArrayList<>();
        list.add(message);
        return new ValidationResult(false, list);
    }

    public boolean isValid() {
        return valid;
    }

    public List<String> getMessages() {
        return messages;
    }
}
