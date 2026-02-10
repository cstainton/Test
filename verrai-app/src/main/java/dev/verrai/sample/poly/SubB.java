package dev.verrai.sample.poly;

import dev.verrai.api.wire.Proto;
import dev.verrai.api.wire.ProtoField;

@Proto
public class SubB extends Base {
    @ProtoField
    public boolean bValue;

    public SubB() {}
}
