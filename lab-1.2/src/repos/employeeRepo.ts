const BASE = import.meta.env.VITE_API_BASE_URL as string;

export type Department = { id: string; name: string };
export type Employee = { id: string; firstName: string; lastName: string; departmentId: string };

function baseUrl() {
  const b = (BASE ?? "").trim();
  return b.endsWith("/") ? b.slice(0, -1) : b;
}

export const employeeRepo = {
  async getDepartments(): Promise<Department[]> {
    const res = await fetch(`${baseUrl()}/api/v1/employees/departments`);
    if (!res.ok) throw new Error("Failed to fetch departments");
    return res.json();
  },

  async getEmployees(): Promise<Employee[]> {
    const res = await fetch(`${baseUrl()}/api/v1/employees`);
    if (!res.ok) throw new Error("Failed to fetch employees");
    return res.json();
  },

  async createEmployee(input: Omit<Employee, "id">, token: string) {
    const res = await fetch(`${baseUrl()}/api/v1/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(input)
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      if (data && typeof data === "object") throw data;
      throw new Error("Failed to create employee");
    }

    return data;
  }
};
