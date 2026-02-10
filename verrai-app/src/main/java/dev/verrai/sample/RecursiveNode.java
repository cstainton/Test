package dev.verrai.sample;

import dev.verrai.api.wire.Proto;
import dev.verrai.api.wire.ProtoField;
import java.util.List;

@Proto
public class RecursiveNode {
    @ProtoField(id = 1)
    public String name;

    @ProtoField(id = 2)
    public List<RecursiveNode> children;

    public RecursiveNode() {}
}
