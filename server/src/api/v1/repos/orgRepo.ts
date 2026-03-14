export type OrgRole = { id: string; roleName: string; assignee?: { firstName: string; lastName: string } };

let roles: OrgRole[] = [
  { id: "role-1", roleName: "CEO" },
  { id: "role-2", roleName: "CFO" },
  { id: "role-3", roleName: "CTO" },
  { id: "role-4", roleName: "COO" }
];

const makeId = () => `role-${Math.random().toString(36).slice(2, 8)}`;

export function getRoles() {
  return roles.map(r => ({ ...r, assignee: r.assignee ? { ...r.assignee } : undefined }));
}

export function getRoleByName(roleName: string) {
  return roles.find(r => r.roleName.toLowerCase() === roleName.toLowerCase());
}

export function assignPerson(roleName: string, firstName: string, lastName: string) {
  const found = getRoleByName(roleName);
  if (found) {
    const updated = { ...found, assignee: { firstName, lastName } };
    roles = roles.map(r => (r.id === found.id ? updated : r));
    return { ...updated };
  }
  const created = { id: makeId(), roleName, assignee: { firstName, lastName } };
  roles = [...roles, created];
  return { ...created };
}