// Enhetstester for Zod-skjemaene som validerer login- og registreringsskjemaet.
// Dette er de første sjekkene brukeren møter, og feil her stopper hele innloggingen.
import { describe, expect, it } from "vitest";
import { registerFormSchema, signInSchema } from "@/features/auth/zod/schemas";

const gyldigRegistrering = {
  name: "eventyrer",
  email: "eventyrer@example.com",
  password: "hemmelig123",
  confirmPassword: "hemmelig123",
};

describe("registerFormSchema", () => {
  it("godtar gyldig input", () => {
    expect(registerFormSchema.safeParse(gyldigRegistrering).success).toBe(true);
  });

  it("trimmer brukernavnet", () => {
    const result = registerFormSchema.parse({
      ...gyldigRegistrering,
      name: "  eventyrer  ",
    });
    expect(result.name).toBe("eventyrer");
  });

  it("avviser når passordene ikke er like, og peker på confirmPassword", () => {
    const result = registerFormSchema.safeParse({
      ...gyldigRegistrering,
      confirmPassword: "noeAnnet123",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({
      path: ["confirmPassword"],
      message: "Passordene er ikke like",
    });
  });

  it.each([
    ["for kort brukernavn", { name: "ab" }],
    ["brukernavn med bare mellomrom", { name: "     " }],
    ["ugyldig e-post", { email: "ikke-en-epost" }],
    ["for kort passord", { password: "kort", confirmPassword: "kort" }],
  ])("avviser %s", (_beskrivelse, endring) => {
    const result = registerFormSchema.safeParse({
      ...gyldigRegistrering,
      ...endring,
    });
    expect(result.success).toBe(false);
  });
});

describe("signInSchema", () => {
  it("godtar e-post og passord", () => {
    expect(
      signInSchema.safeParse({ email: "a@example.com", password: "x" }).success,
    ).toBe(true);
  });

  it("krever at passordet ikke er tomt", () => {
    const result = signInSchema.safeParse({ email: "a@example.com", password: "" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Skriv inn passord");
  });
});
