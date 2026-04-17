import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { employeeRepo, type Department, type Employee } from "../repos/employeeRepo";
import DepartmentSection from "./Department";
import AddEmployeeForm from "./AddEmployeeForm";

export default function Directory() {
  const queryClient = useQueryClient();

  const {
    data: departments = [],
    isLoading: depsLoading,
    isError: depsIsError,
    error: depsError
  } = useQuery({
    queryKey: ["departments"],
    queryFn: employeeRepo.getDepartments
  });

  const {
    data: employees = [],
    isLoading: empLoading,
    isError: empIsError,
    error: empError
  } = useQuery({
    queryKey: ["employees"],
    queryFn: employeeRepo.getEmployees
  });

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

  const anyLoading = depsLoading || empLoading;
  const anyError = (depsIsError && depsError) || (empIsError && empError);

  if (anyError) {
    const message =
      (depsError as any)?.message ??
      (empError as any)?.message ??
      "Failed to load employee directory";
    return (
      <main id= "employee-directory" >
      <div role="alert" style = {{ padding: 16 }
  }>
    { message }
    </div>
    </main>
    );
}

if (anyLoading && departments.length === 0 && employees.length === 0) {
  return (
    <main id= "employee-directory" >
    <div style={ { padding: 16 } }> Loading…</div>
      </main>
    );
}

return (
  <main id= "employee-directory" >
  {
    sections.map(section => (
      <DepartmentSection key= { section.id } name = { section.name } employees = { section.employees } />
      ))
  }

  < AddEmployeeForm
onAdded = {() => {
  queryClient.invalidateQueries({ queryKey: ["employees"] });
}}
      />
  </main>
  );
}