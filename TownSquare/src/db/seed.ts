// src/db/seed.ts
// denne filen brukes til å seed'e testdata i databasen

import { defineScript } from "rwsdk/worker";
import { auth } from "@/auth/config/auth-config";
import { db } from "@/db";
import { user } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { post } from "./schema/post-schema";
import { realm } from "./schema/realm-schema";
import { comment } from "./schema/comment-schema";

const testUsers = [
  {
    name: "jorgen",
    email: "jorgen@example.com",
    password: "passord123",
    role: "admin",
    level: 10,
  },
  {
    name: "ayman",
    email: "ayman@example.com",
    password: "passord123",
    role: "user",
    level: 1,
  },
  {
    name: "sarah",
    email: "sarah@example.com",
    password: "passord123",
    role: "user",
    level: 1,
  },
];

export default defineScript(async () => {
  // 1. Brukere – ta vare på ID-ene så realms, posts og kommentarer kan peke på dem
  const userIds: Record<string, string> = {};

  for (const u of testUsers) {
    const existing = await db
      .select()
      .from(user)
      .where(eq(user.email, u.email))
      .get();
    if (existing) {
      userIds[u.name] = existing.id;
      console.log(`Finnes allerede: ${u.email}`);
      continue;
    }

    const { user: created } = await auth.api.signUpEmail({
      body: {
        name: u.name,
        email: u.email,
        password: u.password,
      },
    });
    userIds[u.name] = created.id;

    if (u.role === "admin") {
      await db
        .update(user)
        .set({ role: "admin" })
        .where(eq(user.id, created.id));
    }

    await db
      .update(user)
      .set({ level: u.level })
      .where(eq(user.id, created.id));
    console.log(`Opprettet: ${u.email} (${u.role})`);
  }

  // Hopp over resten hvis testdata allerede er seedet
  const existingRealm = await db.select().from(realm).limit(1).get();
  if (existingRealm) {
    console.log(
      "Realms finnes allerede – hopper over realms, posts og kommentarer",
    );
    return;
  }

  // 2. Realms
  const [realm1, realm2] = await db
    .insert(realm)
    .values([
      {
        name: "realm1",
        description: "This is the first test realm",
        owner_id: userIds.jorgen,
      },
      {
        name: "realm2",
        description: "This is the second test realm",
        owner_id: userIds.jorgen,
      },
    ])
    .returning();
  console.log("Opprettet realms");

  // 3. Posts
  const [post1] = await db
    .insert(post)
    .values([
      {
        title: "Første post",
        content: "Innhold i første post",
        realm_id: realm1.id,
        author_id: userIds.jorgen,
      },
      {
        title: "Andre post",
        content: "Innhold i andre post",
        realm_id: realm2.id,
        author_id: userIds.ayman,
      },
    ])
    .returning();
  console.log("Opprettet posts");

  // 4. Kommentarer – svaret trenger ID-en til kommentaren det svarer på
  const [firstComment] = await db
    .insert(comment)
    .values([
      {
        title: "First comment",
        content: "This is the first test comment",
        post_id: post1.id,
        author_id: userIds.ayman,
      },
      {
        title: "Second comment",
        content: "This is the second test comment",
        post_id: post1.id,
        author_id: userIds.sarah,
      },
    ])
    .returning();

  await db.insert(comment).values({
    title: "Reply to first comment",
    content: "This is a reply to the first comment",
    post_id: post1.id,
    author_id: userIds.jorgen,
    parentComment_id: firstComment.id,
  });
  console.log("Opprettet kommentarer");

  console.log("Seeding ferdig");
});
