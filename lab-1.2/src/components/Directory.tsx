import { useEffect, useMemo, useState } from "react";
import { employeeRepo, type Department, type Employee } from "../repos/employeeRepo";
import DepartmentSection from "./Department";
import AddEmployeeForm from "./AddEmployeeForm";

export default function Directory() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    employeeRepo
      .getDepartments()
      .then(setDepartments)
      .catch(e => setError(e?.message ?? "Failed to load departments"));
  }, []);

  useEffect(() => {
    employeeRepo
      .getEmployees()
      .then(setEmployees)
      .catch(e => setError(e?.message ?? "Failed to load employees"));
  }, [refreshKey]);

  const sections = useMemo(() => {
    const map = new Map<string, { id: string; name: string; employees: { firstName: string; lastName: string }[] }>();
    departments.forEach(d => map.set(d.id, { id: d.id, name: d.name, employees: [] }));
    employees.forEach(e => {
      const bucket = map.get(e.departmentId);
      if (bucket) bucket.employees.push({ firstName: e.firstName, lastName: e.lastName });
    });
    return Array.from(map.values());
  }, [departments, employees]);

  if (error) return <main id="employee-directory"><div role="alert" style={{ padding: 16 }}>{error}</div></main>;
  if (departments.length === 0 && employees.length === 0) return <main id="employee-directory"><div style={{ padding: 16 }}>Loading…</div></main>;

  return (
    <main id="employee-directory">
      {sections.map(section => (
        <DepartmentSection
          key={section.id}
          name={section.name}
          employees={section.employees}
        />
      ))}
      <AddEmployeeForm onAdded={() => setRefreshKey(k => k + 1)} />
    </main>
  );
}
