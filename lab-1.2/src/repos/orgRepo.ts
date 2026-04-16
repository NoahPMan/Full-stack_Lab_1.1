const BASE = import.meta.env.VITE_API_BASE_URL as string;

export type OrgRole = {
  id: string;
  roleName: string;
  assignee?: { firstName: string; lastName: string };
};

function baseUrl() {
  const b = (BASE ?? "").trim();
  return b.endsWith("/") ? b.slice(0, -1) : b;
}

export const orgRepo = {
  async getRoles(): Promise<OrgRole[]> {
    const res = await fetch(`${baseUrl()}/api/v1/org/roles`);
    if (!res.ok) throw new Error("Failed to fetch roles");
    return res.json();
  },

  async assignPerson(roleName: string, firstName: string, lastName: string, token: string): Promise<OrgRole> {
    const res = await fetch(`${baseUrl()}/api/v1/org/roles/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ roleName, firstName, lastName })
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      if (data && typeof data === "object") throw data;
      throw new Error("Failed to assign person");
    }

    return data;
  }
};
