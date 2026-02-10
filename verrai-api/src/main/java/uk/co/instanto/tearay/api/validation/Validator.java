package uk.co.instanto.tearay.api.validation;

public interface Validator<T> {
    ValidationResult validate(T value);
}
