package uk.co.instanto.tearay.processor.model;

import javax.lang.model.element.VariableElement;
import javax.lang.model.type.TypeMirror;

public class InjectionPoint {
    private final VariableElement field;
    private final TypeMirror type;
    private final String qualifier;

    public InjectionPoint(VariableElement field, TypeMirror type, String qualifier) {
        this.field = field;
        this.type = type;
        this.qualifier = qualifier;
    }

    public VariableElement getField() {
        return field;
    }

    public TypeMirror getType() {
        return type;
    }

    public String getQualifier() {
        return qualifier;
    }
}
