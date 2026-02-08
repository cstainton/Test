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
    private final List<InjectionPoint> injectionPoints;
    private final List<ExecutableElement> postConstructMethods;
    private final List<ExecutableElement> observerMethods;
    private final Map<String, TypeElement> resolutionMap;
    private final String qualifier;

    public BeanDefinition(TypeElement typeElement, boolean isSingleton, boolean isTemplated,
                          List<InjectionPoint> injectionPoints, List<ExecutableElement> postConstructMethods,
                          List<ExecutableElement> observerMethods,
                          Map<String, TypeElement> resolutionMap, String qualifier) {
        this.typeElement = typeElement;
        this.isSingleton = isSingleton;
        this.isTemplated = isTemplated;
        this.injectionPoints = injectionPoints;
        this.postConstructMethods = postConstructMethods;
        this.observerMethods = observerMethods;
        this.resolutionMap = resolutionMap;
        this.qualifier = qualifier;
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

    public List<InjectionPoint> getInjectionPoints() {
        return injectionPoints;
    }

    public List<ExecutableElement> getPostConstructMethods() {
        return postConstructMethods;
    }

    public List<ExecutableElement> getObserverMethods() {
        return observerMethods;
    }

    public Map<String, TypeElement> getResolutionMap() {
        return resolutionMap;
    }
}
