package uk.co.instanto.tearay.sample.poly;

import uk.co.instanto.tearay.api.wire.Proto;
import uk.co.instanto.tearay.api.wire.ProtoField;

@Proto(subTypes = {SubA.class, SubB.class}, typeField = "type")
public abstract class Base {
    @ProtoField
    public String baseName;
}
