"use client";
import { user } from "@/db/schema/auth";
import React, { useState, FormEvent } from "react";
import { z } from "zod";
import { authClient } from "@/auth/auth-client";
import { signUpSchema } from "@/features/auth/zod/schemas";
// This is a placeholder for the Login page. You can replace this with your actual Login page content.
export const Login = () => {
  // denne gjør at siden ikke refresher når skjemaet sendes inn
  // use the authClient instance for authentication actions

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string[] | undefined>
  >({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const { signIn } = authClient;
    const result = signUpSchema.safeParse({
      email: email,
      password: password,
    });
    if (!result.success) {
      setFieldErrors(z.flattenError(result.error).fieldErrors);
      return;
    }
    setLoading(true);
    const { error } = await signIn.email({
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
        {/* {fieldErrors?.username && <p>{fieldErrors.username.join(", ")}</p>} */}
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
        {fieldErrors?.email && <p>{fieldErrors.email.join(", ")}</p>}
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
        {fieldErrors?.password && <p>{fieldErrors.password.join(", ")}</p>}
        <br />
        {error && <p>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </>
  );
};

// Add state for username if needed
