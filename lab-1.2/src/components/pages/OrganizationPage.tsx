import { useQuery, useQueryClient } from "@tanstack/react-query";
import { orgRepo, type OrgRole } from "../../repos/orgRepo";
import OrgAddPersonForm from "../OrgAddPersonForm";
import "./OrganizationPage.css";

export default function OrganizationPage() {
  const queryClient = useQueryClient();

  const {
    data: roles = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["roles"],
    queryFn: orgRepo.getRoles
  });

  const message = (error as any)?.message ?? "Failed to load roles";

  return (
    <main className= "org" >
    <h1 className="org__title" > Organization </h1>

  {
    isLoading ? (
      <div>Loading roles…</div>
      ) : isError ? (
      <div className= "org__error" role = "alert" >
        { message }
        </div>
      ) : (
      <div className= "org__list" >
      {
        roles.map((r: OrgRole) => (
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

    < OrgAddPersonForm
  onAdded = {() => {
    queryClient.invalidateQueries({ queryKey: ["roles"] });
  }
}
      />
  </main>
  );
}