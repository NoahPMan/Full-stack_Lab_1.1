import { useMemo, useState } from "react";
import { employeeRepo } from "../repos/employeeRepo";
import DepartmentSection from "./Department";
import AddEmployeeForm from "./AddEmployeeForm";

export default function Directory() {
  const [refreshKey, setRefreshKey] = useState(0);
  const departments = useMemo(() => employeeRepo.getDepartments(), []);
  const employees = useMemo(() => employeeRepo.getEmployees(), [refreshKey]);

  const sections = useMemo(() => {
    const map = new Map<
      string,
      { id: string; name: string; employees: { firstName: string; lastName: string }[] }
    >();
    departments.forEach(d => map.set(d.id, { id: d.id, name: d.name, employees: [] }));
    employees.forEach(e => {
      const bucket = map.get(e.departmentId);
      if (bucket) bucket.employees.push({ firstName: e.firstName, lastName: e.lastName });
    });
    return Array.from(map.values());
  }, [departments, employees]);

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