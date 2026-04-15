import { prisma } from "../../../prisma";

export function getDepartments() {
  return prisma.department.findMany({ orderBy: { name: "asc" } });
}

export function getEmployees() {
  return prisma.employee.findMany({
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }]
  });
}

export function createEmployee(input: { firstName: string; lastName: string; departmentId: string }) {
  return prisma.employee.create({ data: input });
}
