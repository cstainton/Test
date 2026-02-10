package dev.verrai.processor.visitor;

import dev.verrai.processor.model.BeanDefinition;

public interface BeanVisitor {
    void visit(BeanDefinition bean);
}
