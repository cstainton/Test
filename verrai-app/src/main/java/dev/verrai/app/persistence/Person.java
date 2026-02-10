package dev.verrai.app.persistence;

import dev.verrai.api.persistence.Entity;
import dev.verrai.api.persistence.Id;
import dev.verrai.api.persistence.GeneratedValue;

@Entity
public class Person {
    @Id
    @GeneratedValue
    private Integer id;

    private String name;
    private int age;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}
