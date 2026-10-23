import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().trim().min(3, "Brukernavn må ha minst 3 tegn"),
  email: z.email("Ugyldig e-post"),
  password: z.string().min(8, "Passord må ha minst 8 tegn"),
});

export const registerFormSchema = signUpSchema
  .extend({ confirmPassword: z.string() })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passordene er ikke like",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.email("Ugyldig e-post"),
  password: z.string().min(1, "Skriv inn passord"),
});
