import { employeeRepo } from "../repos/employeeRepo";
import type { Employee } from "../repos/employeeRepo";

export type CreateEmployeeInput = {
  firstName: string;
  lastName: string;
  departmentId: string;
};

export type ServiceError = {
  field: "firstName" | "departmentId" | "general";
  message: string;
};

export type CreateEmployeeResult =
  | { ok: true; employee: Employee }
  | { ok: false; errors: ServiceError[] };

export const employeeService = {
  createEmployee(input: CreateEmployeeInput): CreateEmployeeResult {
    const errors: ServiceError[] = [];

    const deptExists = employeeRepo.getDepartments().some(d => d.id === input.departmentId);
    if (!deptExists) {
      errors.push({ field: "departmentId", message: "Department does not exist." });
    }

    const first = input.firstName?.trim() ?? "";
    if (first.length < 3) {
      errors.push({ field: "firstName", message: "First name must be at least 3 characters." });
    }

    if (errors.length) {
      return { ok: false, errors };
    }

    const employee = employeeRepo.createEmployee({
      firstName: first,
      lastName: (input.lastName ?? "").trim(),
      departmentId: input.departmentId,
    });

    return { ok: true, employee };
  },
};