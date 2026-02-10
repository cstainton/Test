package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.api.wire.Proto;
import uk.co.instanto.tearay.api.wire.ProtoField;
import java.util.List;

@Proto
public class UserDTO {
    @ProtoField(id = 1)
    public String name;

    @ProtoField(id = 2)
    public int age;

    @ProtoField(id = 3)
    public boolean active;

    @ProtoField(id = 4)
    public List<String> tags;

    public UserDTO() {}
}
