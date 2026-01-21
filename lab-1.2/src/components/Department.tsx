import type { Employee } from "../data/types";

interface Props {
  name: string;
  employees: Employee[];
}

export default function Department({ name, employees }: Props) {
  return (
    <section>
      <h2>{name}</h2>
      <ul>
        {employees.map((e, i) => (
          <li key={i}>
            {e.lastName ? `${e.firstName} ${e.lastName}` : e.firstName}
          </li>
        ))}
      </ul>
    </section>
  );
}