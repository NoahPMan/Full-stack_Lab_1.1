import { useMemo, useState } from "react";
import type { Department, Employee } from "../data/types";
import data from "../data/employees.json";
import DepartmentSection from "./Department";
import AddEmployeeForm from "./AddEmployeeForm";

const initialDepartments = data as Department[];

export default function Directory() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  const departmentNames = useMemo(() => departments.map((d) => d.name), [departments]);

  function handleAddEmployee(firstName: string, lastName: string, departmentName: string) {
    setDepartments((prev) => {
      const deptIndex = prev.findIndex((d) => d.name === departmentName);
      if (deptIndex === -1) return prev;

      const newEmployee: Employee = {
        firstName,
        lastName: lastName.length > 0 ? lastName : "Employee",
      };

      const updated = [...prev];
      const targetDept = updated[deptIndex];

      updated[deptIndex] = {
        ...targetDept,
        employees: [...targetDept.employees, newEmployee],
      };

      return updated;
    });
  }

  return (
    <main id="employee-directory">
      {departments.map((d, i) => (
        <DepartmentSection key={i} name={d.name} employees={d.employees} />
      ))}

      <AddEmployeeForm departmentNames={departmentNames} onAddEmployee={handleAddEmployee} />
    </main>
  );
}
``
