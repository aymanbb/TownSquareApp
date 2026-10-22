"use client";
import { user } from "@/db/schema/auth";
import React, { useState, FormEvent } from "react";
import { authClient } from "@/auth/auth-client";

// This is a placeholder for the Login page. You can replace this with your actual Login page content.
export const Login = () => {
  // denne gjør at siden ikke refresher når skjemaet sendes inn
  // use the authClient instance for authentication actions

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    setLoading(true);
    const { error } = await authClient.signIn.email({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setError(error.message ?? "Innlogging feilet");
      return;
    }

    setSuccess(true);
    window.location.href = "/";
  };
  return (
    <>
      <h1>Login</h1>
      <p>Login page content goes here.</p>
      <form onSubmit={handleSubmit}>
        {/* {state.fieldErrors?.username && <p>{state.fieldErrors.username}</p>} */}
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* {state.fieldErrors?.email && <p>{state.fieldErrors.email}</p>} */}
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* {state.fieldErrors?.password && <p>{state.fieldErrors.password}</p>} */}
        <br />

        <button type="submit">Login</button>
      </form>
    </>
  );
};

// Add state for username if needed
