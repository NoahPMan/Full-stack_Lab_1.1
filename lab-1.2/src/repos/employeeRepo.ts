const BASE = import.meta.env.VITE_API_BASE_URL as string;

export type Department = { id: string; name: string };
export type Employee = { id: string; firstName: string; lastName: string; departmentId: string };

export const employeeRepo = {
  async getDepartments(): Promise<Department[]> {
    const res = await fetch(`${BASE}/api/v1/employees/departments`);
    if (!res.ok) throw new Error("Failed to fetch departments");
    return res.json();
  },

  async getEmployees(): Promise<Employee[]> {
    const res = await fetch(`${BASE}/api/v1/employees`);
    if (!res.ok) throw new Error("Failed to fetch employees");
    return res.json();
  },

  async createEmployee(input: Omit<Employee, "id">) {
    const res = await fetch(`${BASE}/api/v1/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input)
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  }
};