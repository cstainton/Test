package uk.co.instanto.tearay.processor.model;

import javax.lang.model.element.VariableElement;
import javax.lang.model.type.TypeMirror;

public class InjectionPoint {
    private final VariableElement field;
    private final TypeMirror type;

    public InjectionPoint(VariableElement field, TypeMirror type) {
        this.field = field;
        this.type = type;
    }

    public VariableElement getField() {
        return field;
    }

    public TypeMirror getType() {
        return type;
    }
}
