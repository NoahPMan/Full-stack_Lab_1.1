import { orgRepo, type OrgRole } from "../repos/orgRepo";

export type CreateOrgPersonInput = {
  firstName: string;
  lastName: string;
  roleName: string;
};

export type OrgServiceError = {
  field: "firstName" | "roleName" | "general";
  message: string;
};

export type CreateOrgPersonResult =
  | { ok: true; role: OrgRole }
  | { ok: false; errors: OrgServiceError[] };

export const orgService = {
  createPersonForRole(input: CreateOrgPersonInput): CreateOrgPersonResult {
    const errors: OrgServiceError[] = [];

    const first = input.firstName?.trim() ?? "";
    if (first.length < 3) {
      errors.push({ field: "firstName", message: "First name must be at least 3 characters." });
    }

    const roleName = input.roleName?.trim();
    if (!roleName) {
      errors.push({ field: "roleName", message: "Role is required." });
    }

    const existing = roleName ? orgRepo.getRoleByName(roleName) : undefined;
    if (existing?.assignee) {
      errors.push({ field: "roleName", message: "This role is already occupied." });
    }

    if (errors.length) return { ok: false, errors };

    const role = orgRepo.assignPerson(roleName!, first, (input.lastName ?? "").trim());
    return { ok: true, role };
  },
};