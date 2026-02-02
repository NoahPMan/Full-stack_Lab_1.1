import { useState } from "react";
import "./AddEmployeeForm.css";

type Props = {
  departmentNames: string[];
  onAddEmployee: (firstName: string, lastName: string, departmentName: string) => void;
};

export default function AddEmployeeForm({ departmentNames, onAddEmployee }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departmentName, setDepartmentName] = useState(departmentNames[0] ?? "");
  const [errors, setErrors] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: string[] = [];

    if (firstName.trim().length < 3) {
      newErrors.push("First name must be at least 3 characters.");
    }

    if (!departmentNames.includes(departmentName)) {
      newErrors.push("Please select a valid department.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddEmployee(firstName.trim(), lastName.trim(), departmentName);

    setErrors([]);
    setFirstName("");
    setLastName("");
    setDepartmentName(departmentNames[0] ?? "");
  }

  return (
    <section className="add-employee">
      <h2 className="add-employee__title">Add Employee</h2>

      {errors.length > 0 && (
        <div className="add-employee__errors" role="alert">
          <ul>
            {errors.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <form className="add-employee__form" onSubmit={handleSubmit}>
        <div className="add-employee__field">
          <label className="add-employee__label" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            className="add-employee__input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="e.g., Noah"
          />
        </div>

        <div className="add-employee__field">
          <label className="add-employee__label" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            className="add-employee__input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          >
            {departmentNames.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
        </div>

        <button className="add-employee__button" type="submit">
          Add
        </button>
      </form>
    </section>
  );
}
