package uk.co.instanto.tearay.processor.visitor;

import uk.co.instanto.tearay.processor.model.PageDefinition;

public interface PageVisitor {
    void visit(PageDefinition page);
}
