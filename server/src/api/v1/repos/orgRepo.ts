import { prisma } from "../../../prisma";

export function getRoles() {
  return prisma.role.findMany({
    orderBy: { roleName: "asc" },
    include: { assignee: true }
  });
}

export function getRoleByName(roleName: string) {
  return prisma.role.findUnique({
    where: { roleName },
    include: { assignee: true }
  });
}

export async function assignPerson(roleName: string, firstName: string, lastName: string) {
  const role = await prisma.role.findUnique({
    where: { roleName },
    include: { assignee: true }
  });

  if (!role) {
    const person = await prisma.person.create({ data: { firstName, lastName } });
    return prisma.role.create({
      data: { roleName, assigneeId: person.id },
      include: { assignee: true }
    });
  }

  if (role.assigneeId) return null;

  const person = await prisma.person.create({ data: { firstName, lastName } });
  return prisma.role.update({
    where: { roleName },
    data: { assigneeId: person.id },
    include: { assignee: true }
  });
}
``