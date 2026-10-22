// src/db/seed.ts
// denne filen brukes til å seed'e testbrukere i databasen

import { defineScript } from "rwsdk/worker";
import { auth } from "@/auth/auth";
import { db } from "@/db";
import { user } from "@/db/schema/auth";
import { eq } from "drizzle-orm";

const testUsers = [
  {
    name: "jorgen",
    email: "jorgen@example.com",
    password: "passord123",
    role: "admin",
  },
  {
    name: "ayman",
    email: "ayman@example.com",
    password: "passord123",
    role: "user",
  },
  {
    name: "sarah",
    email: "sarah@example.com",
    password: "passord123",
    role: "user",
  },
];

export default defineScript(async () => {
  for (const u of testUsers) {
    const existing = await db
      .select()
      .from(user)
      .where(eq(user.email, u.email))
      .get();
    if (existing) {
      console.log(`Finnes allerede: ${u.email}`);
      continue;
    }

    const { user: created } = await auth.api.signUpEmail({
      body: { name: u.name, email: u.email, password: u.password },
    });

    if (u.role === "admin") {
      await db
        .update(user)
        .set({ role: "admin" })
        .where(eq(user.id, created.id));
    }

    console.log(`Opprettet: ${u.email} (${u.role})`);
  }

  console.log("Seeding ferdig");
});
