package dev.verrai.sample.poly;

import dev.verrai.api.wire.Proto;
import dev.verrai.api.wire.ProtoField;

@Proto(subTypes = {SubA.class, SubB.class}, typeField = "type")
public abstract class Base {
    @ProtoField
    public String baseName;
}
