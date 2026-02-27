export type Department = { id: string; name: string };
export type Employee = { id: string; firstName: string; lastName: string; departmentId: string };

export type GroupedSeed = {
  name: string;
  employees: { firstName: string; lastName: string }[];
}[];

const deptIdFromName = (name: string) =>
  `dep-${name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;

const makeEmpId = () => `emp-${Math.random().toString(36).slice(2, 8)}`;

let departments: Department[] = [];
let employees: Employee[] = [];

export function hydrateFromGroupedSeed(seed: GroupedSeed) {
  const deptList: Department[] = [];
  const empList: Employee[] = [];

  seed.forEach(group => {
    const id = deptIdFromName(group.name);
    const dept: Department = { id, name: group.name };
    deptList.push(dept);

    group.employees.forEach(p => {
      empList.push({
        id: makeEmpId(),
        firstName: p.firstName,
        lastName: p.lastName,
        departmentId: id,
      });
    });
  });

  departments = deptList;
  employees = empList;
}

export const employeeRepo = {
  getDepartments(): Department[] {
    return departments.map(d => ({ ...d }));
  },

  getEmployees(): Employee[] {
    return employees.map(e => ({ ...e }));
  },

  getEmployeesByDepartment(departmentId: string): Employee[] {
    return employees.filter(e => e.departmentId === departmentId).map(e => ({ ...e }));
  },

  createEmployee(input: Omit<Employee, 'id'>): Employee {
    const newEmp: Employee = { id: makeEmpId(), ...input };
    employees = [...employees, newEmp];
    return { ...newEmp };
  },
};