package uk.co.instanto.tearay.processor.visitor;

import uk.co.instanto.tearay.processor.model.BeanDefinition;

public interface BeanVisitor {
    void visit(BeanDefinition bean);
}
