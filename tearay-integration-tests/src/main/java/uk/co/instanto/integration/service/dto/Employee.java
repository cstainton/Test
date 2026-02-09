package uk.co.instanto.integration.service.dto;

import java.util.Arrays;
import uk.co.instanto.tearay.rpc.common.annotation.Portable;

@Portable
public class Employee {
    private String name;
    private Address address;
    private String[] tags;

    public Employee() {
    }

    public Employee(String name, Address address) {
        this.name = name;
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String[] getTags() {
        return tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "Employee{name='" + name + "', address=" + address + ", tags=" + Arrays.toString(tags) + "}";
    }
}
