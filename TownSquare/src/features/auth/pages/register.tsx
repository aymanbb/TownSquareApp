import Buffering from "@/features/global/components/Buffering";
import { useState, FormEvent } from "react";
import { z } from "zod";
import { registerFormSchema } from "@/features/auth/zod/schemas";
import { authClient } from "@/auth/config/auth-client";
// This is a placeholder for the Register page. You can replace this with your actual Register page content.

// Initial state for the registration form.

export const Register = () => {
  // denne gjør at siden ikke refresher når skjemaet sendes inn
  // use the authClient instance for authentication actions

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string[] | undefined>
  >({});

  const { signUp } = authClient;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const result = registerFormSchema.safeParse({
      name: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
    if (!result.success) {
      setFieldErrors(z.flattenError(result.error).fieldErrors);
      return;
    }
    setFieldErrors({});

    setLoading(true);
    const { error } = await signUp.email({
      name: result.data.name,
      email: result.data.email,
      password: result.data.password,
    });
    console.log("SIGNUP ERROR:", JSON.stringify(error, null, 2)); // ← ny linje
    setLoading(false);

    if (error) return setError(error.message ?? "Registrering feilet");
    window.location.href = "/";
  };
  return (
    <>
      <h1>Register</h1>
      <p>Register page content goes here.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {fieldErrors?.name && <p>{fieldErrors.name.join(", ")}</p>}
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
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {fieldErrors?.confirmPassword && (
          <p>{fieldErrors.confirmPassword.join(", ")}</p>
        )}
        <br />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <button type="submit" disabled={loading}>
          {" "}
          {loading ? <Buffering /> : "Register"}
        </button>
      </form>
    </>
  );
};

export default Register;
