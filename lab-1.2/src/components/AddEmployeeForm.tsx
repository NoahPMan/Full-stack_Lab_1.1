import { useEffect, useState } from "react";
import "./AddEmployeeForm.css";
import { useFormInput } from "../hooks/useFormInput";
import { employeeRepo, type Department } from "../repos/employeeRepo";
import { employeeService } from "../services/employeeService";

type Props = { onAdded?: () => void };

export default function AddEmployeeForm({ onAdded }: Props) {
  const [deps, setDeps] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const firstName = useFormInput<string>("");
  const lastName = useFormInput<string>("");
  const departmentId = useFormInput<string>("");

  useEffect(() => {
    let mounted = true;
    employeeRepo
      .getDepartments()
      .then(d => {
        if (!mounted) return;
        setDeps(d);
        setLoading(false);
        if (d.length && !departmentId.value) departmentId.setValue(d[0].id);
      })
      .catch(e => {
        if (!mounted) return;
        setLoadError(e?.message ?? "Failed to load departments");
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const uiValid =
      firstName.validate(v => (!v || v.trim().length === 0 ? "First name is required." : null)) &&
      departmentId.validate(v => (!v ? "Please select a department." : null));

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
    departmentId.setValue(deps[0]?.id ?? "");
    firstName.clearMessages();
    departmentId.clearMessages();

    if (onAdded) onAdded();
  }

  return (
    <section className= "add-employee" >
    <h2 className="add-employee__title" > Add Employee </h2>

      < form className = "add-employee__form" onSubmit = { handleSubmit } >
        <div className="add-employee__field" >
          <label className="add-employee__label" htmlFor = "firstName" > First Name </label>
            < input
  id = "firstName"
  className = "add-employee__input"
  value = { firstName.value }
  onChange = { firstName.onChange }
  placeholder = "e.g., Noah"
    />
  {
    firstName.messages.map((msg, i) => (
      <div key= { i } className = "add-employee__errors" role = "alert" > { msg } </div>
    ))
  }
    </div>

    < div className = "add-employee__field" >
      <label className="add-employee__label" htmlFor = "lastName" > Last Name </label>
        < input
  id = "lastName"
  className = "add-employee__input"
  value = { lastName.value }
  onChange = { lastName.onChange }
  placeholder = "e.g., Manaigre"
    />
    </div>

    < div className = "add-employee__field" >
      <label className="add-employee__label" htmlFor = "department" > Department </label>

  {
    loading ? (
      <div>Loading departments…</div>
          ) : loadError ? (
      <div className= "add-employee__errors" role = "alert" > { loadError } </div>
          ) : (
      <select
              id= "department"
    className = "add-employee__select"
    value = { departmentId.value }
    onChange = { departmentId.onChange }
      >
    {
      deps.map(d => (
        <option key= { d.id } value = { d.id } > { d.name } </option>
      ))
    }
      </select>
          )
  }

  {
    departmentId.messages.map((msg, i) => (
      <div key= { i } className = "add-employee__errors" role = "alert" > { msg } </div>
    ))
  }
  </div>

    < button className = "add-employee__button" type = "submit" disabled = { loading || !!loadError
}>
  Add
  </button>
  </form>
  </section>
  );
}