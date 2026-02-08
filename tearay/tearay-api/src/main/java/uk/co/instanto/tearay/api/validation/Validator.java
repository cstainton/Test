package uk.co.instanto.tearay.api.validation;

import java.util.Set;

public interface Validator<T> {
    Set<ConstraintViolation> validate(T object);
}
