"use client";
import { user } from "@/db/schema/auth";
import React, { useState, FormEvent } from "react";
import { z } from "zod";
import { authClient } from "@/auth/config/auth-client";
import { signInSchema } from "@/features/auth/zod/schemas";
// This is a placeholder for the Login page. You can replace this with your actual Login page content.

// Minecraft GUI-panel: lys grå med lys kant oppe/venstre og mørk kant nede/høyre
// Mørkt treverk-panel med gyllen ramme og hard skygge under
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

// Brun knapp som trykkes inn
const button =
  "w-full py-2 bg-[#6F6F6F] border-2 border-black text-white " +
  "shadow-[inset_2px_2px_0_#AAAAAA,inset_-2px_-2px_0_#4A4A4A] " +
  "[text-shadow:2px_2px_0_#3F3F3F] cursor-pointer " +
  "hover:bg-[#7E88BF] hover:shadow-[inset_2px_2px_0_#BEC6F0,inset_-2px_-2px_0_#4E5788] " +
  "disabled:cursor-not-allowed disabled:bg-[#2C2C2C] disabled:text-[#A0A0A0] " +
  "disabled:shadow-none disabled:[text-shadow:none]";

const label = "mb-1 block text-sm text-[#FFFF00] [text-shadow:1px_1px_0_#000]";
const fieldError = "mt-1 text-xs text-[#FF6B6B] [text-shadow:1px_1px_0_#000]";

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
    // declare the signIn function from the authClient instance.
    const { signIn } = authClient;
    const result = signInSchema.safeParse({ email, password });
    if (!result.success) {
      setFieldErrors(z.flattenError(result.error).fieldErrors);
      return;
    }
    setFieldErrors({});
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
    <div className="flex min-h-screen w-full h-full items-center justify-center px-4 font-['Pixelify_Sans']">
      <div className={panel}>
        {/* Nagler */}
        <span className={`${rivet} left-2 top-2`} />
        <span className={`${rivet} right-2 top-2`} />
        <span className={`${rivet} bottom-2 left-2`} />
        <span className={`${rivet} bottom-2 right-2`} />

        <h1 className="mb-1 text-center font-['Cinzel_Decorative'] text-3xl font-black text-amber-400 [-webkit-text-stroke:0.5px_#6B3B0C] [text-shadow:2px_2px_0_#6B3B0C,3px_4px_2px_#000]">
          Login
        </h1>
        <p className="mb-2 text-center font-['Almendra'] text-[#E8D9B5]">
          Welcome back, adventurer
        </p>
        <div className="mx-auto mb-6 h-0.5 w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          {error && (
            <p className="border-2 border-[#7A1A1A] bg-[#3A0E0E] px-2 py-1 text-sm text-[#FF6B6B]">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className={button}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Add state for username if needed
