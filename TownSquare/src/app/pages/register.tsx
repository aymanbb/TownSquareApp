import React, { useState, useActionState } from "react";
import { createAuthClient } from "better-auth/react";
import { register, type AuthActionState } from "@/auth/actions/auth-actions";
// This is a placeholder for the Register page. You can replace this with your actual Register page content.

// Initial state for the registration form.

const authActionInitialState: AuthActionState = {
  ok: false,
  error: undefined,
  message: undefined,
  fieldErrors: undefined,
};
export const Register = () => {
  // denne gjør at siden ikke refresher når skjemaet sendes inn
  const [state, formAction, isPending] = useActionState(
    register,
    authActionInitialState,
  );
  return (
    <>
      <h1>Register</h1>
      <p>Register page content goes here.</p>
      <form action={formAction}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={state.fieldErrors?.username ?? ""}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        {state.fieldErrors?.username && <p>{state.fieldErrors.username}</p>}
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.fieldErrors?.email ?? ""}
          onChange={() => {}}
          required
        />
        {state.fieldErrors?.email && <p>{state.fieldErrors.email}</p>}
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={state.fieldErrors?.password ?? ""}
          onChange={() => {}}
          required
        />
        {state.fieldErrors?.password && <p>{state.fieldErrors.password}</p>}
        <br />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={state.fieldErrors?.confirmPassword ?? ""}
          onChange={() => {}}
          required
        />
        {state.fieldErrors?.confirmPassword && (
          <p>{state.fieldErrors.confirmPassword}</p>
        )}
        <br />
        <button type="submit" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </>
  );
};

export default Register;
