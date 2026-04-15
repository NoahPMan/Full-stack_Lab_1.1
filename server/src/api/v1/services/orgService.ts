import * as repo from "../repos/orgRepo";

export async function listRoles() {
  return repo.getRoles();
}

export async function addPersonToRole(input: { firstName: string; lastName: string; roleName: string }) {
  const errors: { field: "firstName" | "roleName" | "general"; message: string }[] = [];

  const first = (input.firstName ?? "").trim();
  if (first.length < 3) errors.push({ field: "firstName", message: "First name must be at least 3 characters." });

  const roleName = (input.roleName ?? "").trim();
  if (!roleName) errors.push({ field: "roleName", message: "Role is required." });

  if (errors.length) return { ok: false, errors };

  const existing = await repo.getRoleByName(roleName);
  if (existing?.assigneeId) {
    return { ok: false, errors: [{ field: "roleName", message: "This role is already occupied." }] };
  }

  const role = await repo.assignPerson(roleName, first, (input.lastName ?? "").trim());
  if (!role) {
    return { ok: false, errors: [{ field: "roleName", message: "This role is already occupied." }] };
  }

  return { ok: true, role };
}