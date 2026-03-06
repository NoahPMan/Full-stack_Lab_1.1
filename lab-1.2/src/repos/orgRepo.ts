export type OrgRole = {
  id: string;
  roleName: string;
  assignee?: { firstName: string; lastName: string };
};

const makeId = () => `role-${Math.random().toString(36).slice(2, 8)}`;

let roles: OrgRole[] = [
  { id: makeId(), roleName: "CEO" },
  { id: makeId(), roleName: "CFO" },
  { id: makeId(), roleName: "CTO" },
  { id: makeId(), roleName: "COO" },
];

export const orgRepo = {
  getRoles(): OrgRole[] {
    return roles.map(r => ({ ...r, assignee: r.assignee ? { ...r.assignee } : undefined }));
  },

  getRoleByName(roleName: string): OrgRole | undefined {
    return roles.find(r => r.roleName.toLowerCase() === roleName.toLowerCase());
  },

  upsertRole(roleName: string): OrgRole {
    const existing = orgRepo.getRoleByName(roleName);
    if (existing) return { ...existing, assignee: existing.assignee ? { ...existing.assignee } : undefined };
    const created: OrgRole = { id: makeId(), roleName };
    roles = [...roles, created];
    return { ...created };
  },

  assignPerson(roleName: string, firstName: string, lastName: string): OrgRole {
    const existing = orgRepo.getRoleByName(roleName);
    if (existing) {
      const updated: OrgRole = { ...existing, assignee: { firstName, lastName } };
      roles = roles.map(r => (r.id === existing.id ? updated : r));
      return { ...updated, assignee: updated.assignee ? { ...updated.assignee } : undefined };
    }
    const created: OrgRole = {
      id: makeId(),
      roleName,
      assignee: { firstName, lastName },
    };
    roles = [...roles, created];
    return { ...created, assignee: created.assignee ? { ...created.assignee } : undefined };
  },

  clearAssignee(roleId: string): void {
    roles = roles.map(r => (r.id === roleId ? { ...r, assignee: undefined } : r));
  },
};