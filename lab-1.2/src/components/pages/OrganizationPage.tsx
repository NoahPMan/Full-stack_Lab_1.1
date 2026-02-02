import { leadership } from "../../data/roles";
import "./OrganizationPage.css";

export default function OrganizationPage() {
  return (
    <main className="org">
      <h1 className="org__title">Organization</h1>

      <div className="org__list">
        {leadership.map((r) => (
          <div className="org__row" key={`${r.name}-${r.role}`}>
            <div className="org__name">{r.name}</div>
            <div className="org__role">{r.role}</div>
          </div>
        ))}
      </div>
    </main>
  );
}