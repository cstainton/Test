package uk.co.instanto.tearay.api.validation;

public class ConstraintViolation {
    private final String propertyPath;
    private final String message;
    private final Object invalidValue;

    public ConstraintViolation(String propertyPath, String message, Object invalidValue) {
        this.propertyPath = propertyPath;
        this.message = message;
        this.invalidValue = invalidValue;
    }

    public String getPropertyPath() {
        return propertyPath;
    }

    public String getMessage() {
        return message;
    }

    public Object getInvalidValue() {
        return invalidValue;
    }

    @Override
    public String toString() {
        return "ConstraintViolation{" +
                "property='" + propertyPath + '\'' +
                ", message='" + message + '\'' +
                ", value=" + invalidValue +
                '}';
    }
}
