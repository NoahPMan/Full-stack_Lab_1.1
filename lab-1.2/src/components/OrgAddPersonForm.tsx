import React, { useState } from "react";
import { SignedIn, SignedOut, SignInButton, useAuth } from "@clerk/clerk-react";
import { useFormInput } from "../hooks/useFormInput";
import { orgService } from "../services/orgService";
import { orgRepo } from "../repos/orgRepo";

type Props = { onAdded?: () => void };

export default function OrgAddPersonForm({ onAdded }: Props) {
  const { getToken } = useAuth();

  const firstName = useFormInput<string>("");
  const lastName = useFormInput<string>("");
  const roleName = useFormInput<string>("");

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const uiValid =
      firstName.validate(v => (!v || v.trim().length === 0 ? "First name is required." : null)) &&
      roleName.validate(v => (!v || v.trim().length === 0 ? "Role is required." : null));

    if (!uiValid) return;

    const res = orgService.createPersonForRole({
      firstName: firstName.value,
      lastName: lastName.value,
      roleName: roleName.value
    });

    if (!res.ok) {
      res.errors.forEach(err => {
        if (err.field === "firstName") {
          firstName.clearMessages();
          firstName.validate(() => err.message);
        } else if (err.field === "roleName") {
          roleName.clearMessages();
          roleName.validate(() => err.message);
        }
      });
      return;
    }

    const token = await getToken();
    if (!token) {
      setSubmitError("You must be logged in to assign roles.");
      return;
    }

    setSubmitting(true);
    try {
      await orgRepo.assignPerson(
        roleName.value.trim(),
        firstName.value.trim(),
        lastName.value.trim(),
        token
      );
    } catch (err: any) {
      setSubmitError(err?.message ?? "Failed to assign person");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);

    firstName.setValue("");
    lastName.setValue("");
    roleName.setValue("");
    firstName.clearMessages();
    roleName.clearMessages();

    if (onAdded) onAdded();
  }

  return (
    <>
    <SignedOut>
    <div
          style= {{
    maxWidth: 420,
      padding: 12,
        border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 8
  }
}
        >
  <p>You must be logged in to create new entries.</p>
    < SignInButton mode = "modal" >
      <button type="button" className = "btn btn-primary" >
        Log in
        </button>
        </SignInButton>
        </div>
        </SignedOut>

        < SignedIn >
        <form onSubmit={ handleSubmit } style = {{ maxWidth: 420 }}>
          <div style={ { marginBottom: 12 } }>
            <label>First Name </label>
              < input
className = "form-control"
value = { firstName.value }
onChange = { firstName.onChange }
placeholder = "e.g., Noah"
  />
{
  firstName.messages.map((m, i) => (
    <div key= { i } style = {{ color: "#ff6b6b", fontSize: 12 }} >
  { m }
  </div>
            ))}
</div>

  < div style = {{ marginBottom: 12 }}>
    <label>Last Name </label>
      < input
className = "form-control"
value = { lastName.value }
onChange = { lastName.onChange }
placeholder = "e.g., Manaigre"
  />
  </div>

  < div style = {{ marginBottom: 12 }}>
    <label>Role </label>
    < input
className = "form-control"
value = { roleName.value }
onChange = { roleName.onChange }
placeholder = "e.g., CTO"
  />
{
  roleName.messages.map((m, i) => (
    <div key= { i } style = {{ color: "#ff6b6b", fontSize: 12 }} >
  { m }
  </div>
            ))}
</div>

{
  submitError ? (
    <div style= {{ color: "#ff6b6b", fontSize: 12, marginBottom: 12 }
} role = "alert" >
  { submitError }
  </div>
          ) : null}

<button type="submit" className = "btn btn-primary" disabled = { submitting } >
  { submitting? "Adding...": "Add to Role" }
  </button>
  </form>
  </SignedIn>
  </>
  );
}