import { getDepartments, getEmployees, createEmployee } from "../repos/employeeRepo";

export function listEmployees() {
  return getEmployees();
}

export function listDepartments() {
  return getDepartments();
}

export function addEmployee(input: { firstName: string; lastName: string; departmentId: string }) {
  const first = input.firstName?.trim() ?? "";
  if (first.length < 3) return { ok: false, errors: [{ field: "firstName", message: "First name must be at least 3 characters." }] };
  const deptExists = getDepartments().some(d => d.id === input.departmentId);
  if (!deptExists) return { ok: false, errors: [{ field: "departmentId", message: "Department does not exist." }] };
  const employee = createEmployee({ firstName: first, lastName: (input.lastName ?? "").trim(), departmentId: input.departmentId });
  return { ok: true, employee };
}
``