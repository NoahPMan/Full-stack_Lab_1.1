import { employees, departments, makeEmpId } from "./memory";

export function getDepartments() {
    return departments.map(d => ({ ...d }));
}

export function getEmployees() {
    return employees.map(e => ({ ...e }));
}

export function createEmployee(input: { firstName: string; lastName: string; departmentId: string }) {
    const emp = { id: makeEmpId(), ...input };
    employees.push(emp);
    return { ...emp };
}