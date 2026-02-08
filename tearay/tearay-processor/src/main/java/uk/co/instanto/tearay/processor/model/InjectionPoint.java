package uk.co.instanto.tearay.processor.model;

import javax.lang.model.element.VariableElement;
import javax.lang.model.type.TypeMirror;
import java.util.Set;
import java.util.Collections;

public class InjectionPoint {
    private final VariableElement field;
    private final TypeMirror type;
    private final Set<String> qualifiers;

    public InjectionPoint(VariableElement field, TypeMirror type, Set<String> qualifiers) {
        this.field = field;
        this.type = type;
        this.qualifiers = qualifiers != null ? qualifiers : Collections.emptySet();
    }

    public InjectionPoint(VariableElement field, TypeMirror type) {
        this(field, type, Collections.emptySet());
    }

    public VariableElement getField() {
        return field;
    }

    public TypeMirror getType() {
        return type;
    }

    public Set<String> getQualifiers() {
        return qualifiers;
    }
}
