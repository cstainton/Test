package uk.co.instanto.integration.service.dto;

import uk.co.instanto.tearay.rpc.common.annotation.Event;

/**
 * Event published when a new employee is hired.
 */
@Event
public class EmployeeHiredEvent {
    private Employee employee;
    private Department department;
    private long hireDate;

    public EmployeeHiredEvent() {
    }

    public EmployeeHiredEvent(Employee employee, Department department, long hireDate) {
        this.employee = employee;
        this.department = department;
        this.hireDate = hireDate;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public long getHireDate() {
        return hireDate;
    }

    public void setHireDate(long hireDate) {
        this.hireDate = hireDate;
    }

    @Override
    public String toString() {
        return "EmployeeHiredEvent{employee=" + employee + ", department=" + department + ", hireDate=" + hireDate
                + "}";
    }
}
