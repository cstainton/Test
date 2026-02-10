package dev.verrai.processor.visitor;

import dev.verrai.processor.model.PageDefinition;

public interface PageVisitor {
    void visit(PageDefinition page);
}
