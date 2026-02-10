package dev.verrai.api.validation;

public interface Validator<T> {
    ValidationResult validate(T value);
}
