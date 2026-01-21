import type { Department } from "../data/types";
import data from "../data/employees.json";
import DepartmentSection from "./Department";

const departments = data as Department[];

export default function Directory() {
  return (
    <main id="employee-directory">
      {departments.map((d, i) => (
        <DepartmentSection key={i} name={d.name} employees={d.employees} />
      ))}
    </main>
  );
}