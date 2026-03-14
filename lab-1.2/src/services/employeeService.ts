export type CreateEmployeeInput = {
  firstName: string;
  lastName: string;
  departmentId: string;
};

export type ServiceError = {
  field: "firstName" | "departmentId" | "general";
  message: string;
};

export type ValidateResult =
  | { ok: true }
  | { ok: false; errors: ServiceError[] };

export const employeeService = {
  validate(input: CreateEmployeeInput): ValidateResult {
    const errors: ServiceError[] = [];
    const first = (input.firstName ?? "").trim();

    if (first.length < 3) {
      errors.push({ field: "firstName", message: "First name must be at least 3 characters." });
    }
    if (!input.departmentId) {
      errors.push({ field: "departmentId", message: "Please select a department." });
    }

    if (errors.length) return { ok: false, errors };
    return { ok: true };
  }
};