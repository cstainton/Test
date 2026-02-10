package dev.verrai.sample;

import dev.verrai.api.wire.Proto;
import dev.verrai.api.wire.ProtoField;
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
