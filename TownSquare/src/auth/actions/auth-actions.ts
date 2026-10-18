// src/features/auth/actions/auth.ts
"use server";

import { auth } from "@/auth/auth";
import { getRequestInfo } from "rwsdk/worker";
import { z } from "zod";

// zod scheme for user registration. bekrefter også om passordene matcher.
const registerSchema = z
  .object({
    userName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// definerer en funksjon for registrering av brukere
export async function register(
  _prev: {
    ok: boolean;
    error?: string;
    fieldErrors?: Record<string, string>;
  },
  formData: FormData,
) {
  // validerer skjemaet mot registerSchema
  const parsed = registerSchema.safeParse({
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // sjekker om valideringen feilet
  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: Object.fromEntries(
        parsed.error.issues.map((i) => [i.path[0], i.message]),
      ),
    };
  }

  const { request, response } = getRequestInfo();
  try {
    const { headers } = await auth.api.signUpEmail({
      body: {
        name: parsed.data.userName,
        email: parsed.data.email,
        password: parsed.data.password,
      },
      headers: request.headers,
      returnHeaders: true,
    });
    for (const [key, value] of headers.entries()) {
      response.headers.append(key, value);
    }
    response.headers.set("Location", "/");
    return { ok: true, message: "Registration successful!" };
  } catch (error) {
    return { ok: false, error: "Registration failed." };
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function login(
  _prev: { ok: boolean; error?: string; fieldErrors?: Record<string, string> },
  formData: FormData,
) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: Object.fromEntries(
        parsed.error.issues.map((i) => [i.path[0], i.message]),
      ),
    };
  }

  const { request, response } = getRequestInfo();

  try {
    const { headers } = await auth.api.signInEmail({
      body: parsed.data,
      headers: request.headers,
      returnHeaders: true,
    });
    // better-auth gir oss Set-Cookie-headerne tilbake. Vi må selv
    // kopiere dem over på svaret som går til nettleseren, ellers blir
    // ikke brukeren logget inn.
    for (const [key, value] of headers.entries()) {
      response.headers.append(key, value);
    }
    response.headers.set("Location", "/");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: "Ugyldig e-post eller passord" };
  }
}

export async function logout() {
  "use server";
  const { request, response } = getRequestInfo();
  const { headers } = await auth.api.signOut({
    headers: request.headers,
    returnHeaders: true,
  });
  // signOut setter en Set-Cookie som tømmer sesjonen. Vi kopierer den
  // over på svaret på samme måte som ved innlogging.
  for (const [key, value] of headers.entries()) {
    response.headers.append(key, value);
  }
  response.headers.set("Location", "/login");
  return { ok: true };
}
