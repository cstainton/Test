package uk.co.instanto.integration.service.dto;

import uk.co.instanto.tearay.rpc.common.annotation.Portable;

@Portable

public class Organization {
    private String name;
    private Department primaryDepartment;

    public Organization() {
    }

    public Organization(String name, Department primaryDepartment) {
        this.name = name;
        this.primaryDepartment = primaryDepartment;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Department getPrimaryDepartment() {
        return primaryDepartment;
    }

    public void setPrimaryDepartment(Department primaryDepartment) {
        this.primaryDepartment = primaryDepartment;
    }

    @Override
    public String toString() {
        return "Organization{name='" + name + "', primaryDepartment=" + primaryDepartment + "}";
    }
}
