// Hjelpefunksjoner for å tømme og fylle test-databasen.
import { db } from "@/db";
import { user } from "@/db/schema/auth";
import { realm, userFollowsRealm } from "@/db/schema/realm-schema";
import { post } from "@/db/schema/post-schema";
import { comment } from "@/db/schema/comment-schema";

/** Sletter alle rader, slik at hver test starter med en tom database. */
export async function resetDb() {
  await db.delete(comment);
  await db.delete(userFollowsRealm);
  await db.delete(post);
  await db.delete(realm);
  await db.delete(user);
}

export async function createUser(id = "user-1", name = "testbruker") {
  const now = new Date();
  await db.insert(user).values({
    id,
    name,
    email: `${name}@example.com`,
    emailVerified: false,
    createdAt: now,
    updatedAt: now,
  });
  return id;
}

export async function createRealm(ownerId: string, name = "Testrealm") {
  return db
    .insert(realm)
    .values({ name, description: "En realm for testing", owner_id: ownerId })
    .returning()
    .get();
}

export async function createPost(authorId: string, realmId: number, title = "Testinnlegg") {
  return db
    .insert(post)
    .values({ author_id: authorId, realm_id: realmId, title, content: "Innhold" })
    .returning()
    .get();
}
