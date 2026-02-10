package uk.co.instanto.integration.service.dto;

import java.util.ArrayList;
import java.util.List;
import uk.co.instanto.tearay.rpc.common.annotation.Portable;

@Portable
public class Department {
    private String name;
    private Employee manager;
    private List<Employee> employees = new ArrayList<>();

    public Department() {
    }

    public Department(String name, Employee manager) {
        this.name = name;
        this.manager = manager;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Employee getManager() {
        return manager;
    }

    public void setManager(Employee manager) {
        this.manager = manager;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    @Override
    public String toString() {
        return "Department{name='" + name + "', manager=" + manager + ", employees=" + employees + "}";
    }
}
