export type Department = { id: string; name: string };
export type Employee = { id: string; firstName: string; lastName: string; departmentId: string };

export const departments: Department[] = [
  { id: "dep-administration", name: "Administration" },
  { id: "dep-audit", name: "Audit" }
];

export let employees: Employee[] = [
  { id: "emp-1", firstName: "Zoë", lastName: "Robins", departmentId: "dep-administration" }
];

export function makeEmpId() {
  return `emp-${Math.random().toString(36).slice(2, 8)}`;
}

export function replaceData(d: Department[], e: Employee[]) {
  departments.splice(0, departments.length, ...d);
  employees.splice(0, employees.length, ...e);
}