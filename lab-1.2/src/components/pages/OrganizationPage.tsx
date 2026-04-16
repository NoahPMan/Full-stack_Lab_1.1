import { useEffect, useState } from "react";
import { orgRepo, type OrgRole } from "../../repos/orgRepo";
import OrgAddPersonForm from "../OrgAddPersonForm";
import "./OrganizationPage.css";

export default function OrganizationPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [roles, setRoles] = useState<OrgRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError(null);

    orgRepo
      .getRoles()
      .then(data => {
        if (!mounted) return;
        setRoles(data);
        setLoading(false);
      })
      .catch(e => {
        if (!mounted) return;
        setError(e?.message ?? "Failed to load roles");
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [refreshKey]);

  return (
    <main className= "org" >
    <h1 className="org__title" > Organization </h1>

  {
    loading ? (
      <div>Loading roles…</div>
      ) : error ? (
      <div className= "org__error" role = "alert" >
        { error }
        </div>
      ) : (
      <div className= "org__list" >
      {
        roles.map(r => (
          <div className= "org__row" key = { r.id } >
          <div className="org__name" >
          { r.assignee ? `${r.assignee.firstName} ${r.assignee.lastName}` : "Unassigned" }
          </div>
        < div className = "org__role" > { r.roleName } </div>
        </div>
        ))
      }
      </div>
      )
  }

  <hr />
    < OrgAddPersonForm onAdded = {() => setRefreshKey(k => k + 1)
} />
  </main>
  );
}