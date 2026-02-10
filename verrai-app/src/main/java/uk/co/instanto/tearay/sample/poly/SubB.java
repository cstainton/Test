package uk.co.instanto.tearay.sample.poly;

import uk.co.instanto.tearay.api.wire.Proto;
import uk.co.instanto.tearay.api.wire.ProtoField;

@Proto
public class SubB extends Base {
    @ProtoField
    public boolean bValue;

    public SubB() {}
}
