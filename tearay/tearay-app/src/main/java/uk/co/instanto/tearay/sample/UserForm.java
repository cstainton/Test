package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.api.validation.*;
import uk.co.instanto.tearay.api.Dependent;

@Validatable
@Dependent
public class UserForm {
    @NotNull
    @Size(min=3, max=20, message="Username must be between 3 and 20 chars")
    private String username;

    @Pattern(regexp="^[^@]+@[^@]+\\.[^@]+$", message="Invalid email format")
    private String email;

    @Min(value=18, message="Must be at least 18")
    @Max(value=99, message="Must be under 99")
    private int age;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}
