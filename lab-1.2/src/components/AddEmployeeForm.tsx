import React, { useMemo } from "react";
import "./AddEmployeeForm.css";
import { useFormInput } from "../hooks/useFormInput";
import { employeeRepo } from "../repos/employeeRepo";
import { employeeService } from "../services/employeeService";

type Props = {
  onAdded?: () => void;
};

export default function AddEmployeeForm({ onAdded }: Props) {
  const departments = useMemo(() => employeeRepo.getDepartments(), []);
  const firstName = useFormInput<string>("");
  const lastName = useFormInput<string>("");
  const departmentId = useFormInput<string>(departments[0]?.id ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const uiValid =
      firstName.validate(v =>
        !v || v.trim().length === 0 ? "First name is required." : null
      ) &&
      departmentId.validate(v =>
        !v ? "Please select a department." : null
      );

    if (!uiValid) return;
    const result = employeeService.createEmployee({
      firstName: firstName.value,
      lastName: lastName.value,
      departmentId: departmentId.value,
    });

    if (!result.ok) {
      result.errors.forEach(err => {
        if (err.field === "firstName") {
          firstName.clearMessages();
          firstName.validate(() => err.message);
        } else if (err.field === "departmentId") {
          departmentId.clearMessages();
          departmentId.validate(() => err.message);
        }
      });
      return;
    }
    firstName.setValue("");
    lastName.setValue("");
    departmentId.setValue(departments[0]?.id ?? "");
    firstName.clearMessages();
    departmentId.clearMessages();

    if (onAdded) onAdded();
  }

  return (
    <section className="add-employee">
      <h2 className="add-employee__title">Add Employee</h2>

      <form className="add-employee__form" onSubmit={handleSubmit}>
        <div className="add-employee__field">
          <label className="add-employee__label" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            className="add-employee__input"
            value={firstName.value}
            onChange={firstName.onChange}
            placeholder="e.g., Noah"
          />
          {/* Field-level messages (plural) */}
          {firstName.messages.map((msg, i) => (
            <div key={i} className="add-employee__errors" role="alert">
              {msg}
            </div>
          ))}
        </div>

        <div className="add-employee__field">
          <label className="add-employee__label" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            className="add-employee__input"
            value={lastName.value}
            onChange={lastName.onChange}
            placeholder="e.g., Manaigre"
          />
        </div>

        <div className="add-employee__field">
          <label className="add-employee__label" htmlFor="department">
            Department
          </label>
          <select
            id="department"
            className="add-employee__select"
            value={departmentId.value}
            onChange={departmentId.onChange}
          >
            {departments.map(dep => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </select>
          {departmentId.messages.map((msg, i) => (
            <div key={i} className="add-employee__errors" role="alert">
              {msg}
            </div>
          ))}
        </div>

        <button className="add-employee__button" type="submit">
          Add
        </button>
      </form>
    </section>
  );
}