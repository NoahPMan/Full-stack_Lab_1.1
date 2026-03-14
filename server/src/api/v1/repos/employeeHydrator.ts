import { type Department, type Employee, replaceData } from "./memory";

export type GroupedSeed = {
    name: string;
    employees: { firstName: string; lastName: string }[];
}[];

const deptIdFromName = (name: string) =>
    `dep-${name
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}`;

const makeEmpId = () => `emp-${Math.random().toString(36).slice(2, 8)}`;

export function hydrateFromGroupedSeed(seed: GroupedSeed) {
    const depts: Department[] = [];
    const emps: Employee[] = [];

    seed.forEach(group => {
        const id = deptIdFromName(group.name);
        depts.push({ id, name: group.name });
        group.employees.forEach(p => {
            emps.push({ id: makeEmpId(), firstName: p.firstName, lastName: p.lastName, departmentId: id });
        });
    });

    replaceData(depts, emps);
}