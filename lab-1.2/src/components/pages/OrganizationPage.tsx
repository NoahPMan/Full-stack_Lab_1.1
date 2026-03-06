import { useMemo, useState } from "react";
import { orgRepo } from "../../repos/orgRepo";
import OrgAddPersonForm from "../OrgAddPersonForm";
import "./OrganizationPage.css";

export default function OrganizationPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const roles = useMemo(() => orgRepo.getRoles(), [refreshKey]);

  return (
    <main className= "org" >
    <h1 className="org__title" > Organization </h1>

      < div className = "org__list" >
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

        < hr />
        <OrgAddPersonForm onAdded={ () => setRefreshKey(k => k + 1) } />
          </main>
  );
}