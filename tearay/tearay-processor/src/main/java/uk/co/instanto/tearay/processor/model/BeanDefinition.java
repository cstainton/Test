package uk.co.instanto.tearay.processor.model;

import javax.lang.model.element.ExecutableElement;
import javax.lang.model.element.TypeElement;
import javax.lang.model.element.VariableElement;
import java.util.List;
import java.util.Map;

public class BeanDefinition {
    private final TypeElement typeElement;
    private final boolean isSingleton;
    private final boolean isTemplated;
    private final List<VariableElement> injectionPoints;
    private final List<ExecutableElement> postConstructMethods;
    private final Map<String, TypeElement> resolutionMap;

    public BeanDefinition(TypeElement typeElement, boolean isSingleton, boolean isTemplated,
                          List<VariableElement> injectionPoints, List<ExecutableElement> postConstructMethods,
                          Map<String, TypeElement> resolutionMap) {
        this.typeElement = typeElement;
        this.isSingleton = isSingleton;
        this.isTemplated = isTemplated;
        this.injectionPoints = injectionPoints;
        this.postConstructMethods = postConstructMethods;
        this.resolutionMap = resolutionMap;
    }

    public TypeElement getTypeElement() {
        return typeElement;
    }

    public boolean isSingleton() {
        return isSingleton;
    }

    public boolean isTemplated() {
        return isTemplated;
    }

    public List<VariableElement> getInjectionPoints() {
        return injectionPoints;
    }

    public List<ExecutableElement> getPostConstructMethods() {
        return postConstructMethods;
    }

    public Map<String, TypeElement> getResolutionMap() {
        return resolutionMap;
    }
}
