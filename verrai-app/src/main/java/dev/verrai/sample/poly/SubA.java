package dev.verrai.sample.poly;

import dev.verrai.api.wire.Proto;
import dev.verrai.api.wire.ProtoField;

@Proto
public class SubA extends Base {
    @ProtoField
    public int aValue;

    public SubA() {}
}
