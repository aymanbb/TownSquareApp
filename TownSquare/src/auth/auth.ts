// Denne filen konfigurerer Better Auth for autentisering i applikasjonen.
// src/auth/auth.ts
import { env } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";

import { db } from "@/db";

if (!env.BETTER_AUTH_SECRET) {
  throw new Error(
    "BETTER_AUTH_SECRET er ikke satt. Konfigurer i .dev.vars (lokalt) eller " +
      "som Cloudflare-secret (prod) med `wrangler secret put BETTER_AUTH_SECRET`.",
  );
}

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite" }),
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,

  logger: { level: "debug" }, // ← ny
  onAPIError: { throw: true },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  user: {
    additionalFields: {
      // Egne felter på user-tabellen kan defineres her.
      // Eksempel: bio: { type: "string", required: false }
    },
  },

  plugins: [
    admin(), // Gir oss roller (user / admin), ban, impersonate, set-role
  ],
});

export type Session = typeof auth.$Infer.Session;
