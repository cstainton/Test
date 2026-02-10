package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.api.wire.Proto;
import uk.co.instanto.tearay.api.wire.ProtoField;
import java.util.List;

@Proto
public class RecursiveNode {
    @ProtoField(id = 1)
    public String name;

    @ProtoField(id = 2)
    public List<RecursiveNode> children;

    public RecursiveNode() {}
}
