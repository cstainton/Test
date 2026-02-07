package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.api.wire.Proto;
import uk.co.instanto.tearay.api.wire.ProtoField;
import java.util.List;

@Proto
public class UserDTO {
    @ProtoField
    public String name;

    @ProtoField
    public int age;

    @ProtoField
    public boolean active;

    @ProtoField
    public List<String> tags;

    public UserDTO() {}
}
