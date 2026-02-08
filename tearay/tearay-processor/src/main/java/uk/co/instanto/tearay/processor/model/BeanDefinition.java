package uk.co.instanto.tearay.processor.model;

import javax.lang.model.element.ExecutableElement;
import javax.lang.model.element.TypeElement;
import javax.lang.model.element.VariableElement;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class BeanDefinition {
    private final TypeElement typeElement;
    private final boolean isSingleton;
    private final boolean isTemplated;
    private final List<InjectionPoint> injectionPoints;
    private final List<ExecutableElement> postConstructMethods;
    private final Map<String, String> resolutionMap;
    private final Set<String> qualifiers;
    private final List<ExecutableElement> producerMethods;
    private final List<ExecutableElement> observesMethods;

    public BeanDefinition(TypeElement typeElement, boolean isSingleton, boolean isTemplated,
                          List<InjectionPoint> injectionPoints, List<ExecutableElement> postConstructMethods,
                          Map<String, String> resolutionMap, Set<String> qualifiers,
                          List<ExecutableElement> producerMethods, List<ExecutableElement> observesMethods) {
        this.typeElement = typeElement;
        this.isSingleton = isSingleton;
        this.isTemplated = isTemplated;
        this.injectionPoints = injectionPoints;
        this.postConstructMethods = postConstructMethods;
        this.resolutionMap = resolutionMap;
        this.qualifiers = qualifiers != null ? qualifiers : Collections.emptySet();
        this.producerMethods = producerMethods != null ? producerMethods : Collections.emptyList();
        this.observesMethods = observesMethods != null ? observesMethods : Collections.emptyList();
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

    public Map<String, String> getResolutionMap() {
        return resolutionMap;
    }

    public Set<String> getQualifiers() {
        return qualifiers;
    }

    public List<ExecutableElement> getProducerMethods() {
        return producerMethods;
    }

    public List<ExecutableElement> getObservesMethods() {
        return observesMethods;
    }
}
