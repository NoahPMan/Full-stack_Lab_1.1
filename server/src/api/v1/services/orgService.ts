import { getRoles, getRoleByName, assignPerson } from "../repos/orgRepo";

export function listRoles() {
  return getRoles();
}

export function addPersonToRole(input: { firstName: string; lastName: string; roleName: string }) {
  const first = input.firstName?.trim() ?? "";
  if (first.length < 3) return { ok: false, errors: [{ field: "firstName", message: "First name must be at least 3 characters." }] };
  const roleName = input.roleName?.trim();
  if (!roleName) return { ok: false, errors: [{ field: "roleName", message: "Role is required." }] };
  const existing = getRoleByName(roleName);
  if (existing?.assignee) return { ok: false, errors: [{ field: "roleName", message: "This role is already occupied." }] };
  const role = assignPerson(roleName, first, (input.lastName ?? "").trim());
  return { ok: true, role };
}