import * as repo from "../repos/employeeRepo";

export async function listDepartments() {
  return repo.getDepartments();
}

export async function listEmployees() {
  return repo.getEmployees();
}

export async function addEmployee(input: { firstName: string; lastName: string; departmentId: string }) {
  const errors: { field: "firstName" | "departmentId" | "general"; message: string }[] = [];

  const first = (input.firstName ?? "").trim();
  if (first.length < 3) {
    errors.push({ field: "firstName", message: "First name must be at least 3 characters." });
  }

  const deptId = (input.departmentId ?? "").trim();
  if (!deptId) {
    errors.push({ field: "departmentId", message: "Department does not exist." });
  } else {
    const deptExists = (await repo.getDepartments()).some(d => d.id === deptId);
    if (!deptExists) {
      errors.push({ field: "departmentId", message: "Department does not exist." });
    }
  }

  if (errors.length) return { ok: false, errors };

  const employee = await repo.createEmployee({
    firstName: first,
    lastName: (input.lastName ?? "").trim(),
    departmentId: deptId
  });

  return { ok: true, employee };
}