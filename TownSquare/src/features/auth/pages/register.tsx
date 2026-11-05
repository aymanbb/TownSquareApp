"use client";

import Buffering from "@/features/global/components/Buffering";
import { useState, FormEvent } from "react";
import { z } from "zod";
import { registerFormSchema } from "@/features/auth/zod/schemas";
import { authClient } from "@/auth/config/auth-client";
// This is a placeholder for the Register page. You can replace this with your actual Register page content.

// Initial state for the registration form.

// Mørkt panel med pergament-tekstur, gyllen ramme og hard skygge under
const panel =
  "relative w-full max-w-sm mx-auto border-2 border-black p-7 " +
  "bg-[url('/assets/textures/png/ScrollTexture.png')] bg-cover bg-center" +
  " [image-rendering:pixelated] " +
  "shadow-[inset_0_0_0_3px_#8A6A3B,inset_0_0_0_5px_#1A120B,0_6px_0_#000]";

// Små nagler i hjørnene
const rivet =
  "absolute h-2 w-2 bg-[#C9A24A] border border-black shadow-[inset_-1px_-1px_0_#6B4A1B]";

// Pergamentfelt med mørk tekst
const input =
  "w-full bg-[#D8C79E] px-2 py-1.5 text-[#2B1D0E] border-2 border-[#1A120B] outline-none " +
  "shadow-[inset_2px_2px_0_#9C8656] font-['Pixelify_Sans'] " +
  "focus:border-amber-400 focus:bg-[#E6D7AE]";

// Minecraft-knapp som trykkes inn
const button =
  "flex w-full items-center justify-center py-2 bg-[#6F6F6F] border-2 border-black text-white " +
  "shadow-[inset_2px_2px_0_#AAAAAA,inset_-2px_-2px_0_#4A4A4A] " +
  "[text-shadow:2px_2px_0_#3F3F3F] cursor-pointer " +
  "hover:bg-[#7E88BF] hover:shadow-[inset_2px_2px_0_#BEC6F0,inset_-2px_-2px_0_#4E5788] " +
  "disabled:cursor-not-allowed disabled:bg-[#2C2C2C] disabled:text-[#A0A0A0] " +
  "disabled:shadow-none disabled:[text-shadow:none]";

const label = "mb-1 block text-sm text-[#FFFF00] [text-shadow:1px_1px_0_#000]";
const fieldError = "mt-1 text-xs text-[#FF6B6B] [text-shadow:1px_1px_0_#000]";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string[] | undefined>
  >({});

  const { signUp } = authClient;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // hindrer at siden refresher når skjemaet sendes inn
    e.preventDefault();
    setError("");

    const result = registerFormSchema.safeParse({
      name: username,
      email,
      password,
      confirmPassword,
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
    setLoading(false);

    if (error) return setError(error.message ?? "Registrering feilet");
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen w-full h-full items-center justify-center px-4 font-['Pixelify_Sans']">
      <div className={panel}>
        {/* Nagler */}
        <span className={`${rivet} left-2 top-2`} />
        <span className={`${rivet} right-2 top-2`} />
        <span className={`${rivet} bottom-2 left-2`} />
        <span className={`${rivet} bottom-2 right-2`} />

        <h1 className="mb-1 text-center font-['Cinzel_Decorative'] text-3xl font-black text-amber-400 [-webkit-text-stroke:0.5px_#6B3B0C] [text-shadow:2px_2px_0_#6B3B0C,3px_4px_2px_#000]">
          Register
        </h1>
        <p className="mb-2 text-center font-['Almendra'] text-[#E8D9B5]">
          Begin your adventure
        </p>
        <div className="mx-auto mb-6 h-0.5 w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className={label}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={input}
            />
            {fieldErrors?.name && (
              <p className={fieldError}>{fieldErrors.name.join(", ")}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={input}
            />
            {fieldErrors?.email && (
              <p className={fieldError}>{fieldErrors.email.join(", ")}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className={label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={input}
            />
            {fieldErrors?.password && (
              <p className={fieldError}>{fieldErrors.password.join(", ")}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className={label}>
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={input}
            />
            {fieldErrors?.confirmPassword && (
              <p className={fieldError}>
                {fieldErrors.confirmPassword.join(", ")}
              </p>
            )}
          </div>

          {error && (
            <p className="border-2 border-[#7A1A1A] bg-[#3A0E0E] px-2 py-1 text-sm text-[#FF6B6B]">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className={button}>
            {loading ? <Buffering /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
