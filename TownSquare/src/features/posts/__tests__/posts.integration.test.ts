// Integrasjonstester for posts: controller → service → repository → D1 (lokal test-database).
import { beforeEach, describe, expect, it } from "vitest";
import { postController } from "@/features/posts/controller/post.controller";
import {
  createPost,
  createRealm,
  createUser,
  resetDb,
} from "../../../../test/helpers";

describe("Posts (controller → service → repository → D1)", () => {
  let userId: string;
  let realmId: number;

  beforeEach(async () => {
    // Arrange: reset database and create user and realm
    // mock data for tests: create user and realm in the local test database
    await resetDb();
    userId = await createUser();
    realmId = (await createRealm(userId)).id;
  });

  it("list returnerer en tom liste når det ikke finnes innlegg", async () => {
    // Arrange & Act
    const result = await postController.list();

    // Assert
    expect(result).toEqual({ success: true, data: [] });
  });

  it("list returnerer alle innlegg som Post-objekter", async () => {
    // Arrange: create posts in the database
    await createPost(userId, realmId, "Første");
    await createPost(userId, realmId, "Andre");

    // Act: retrieve the list of posts from the controller
    const result = await postController.list();

    // Assert
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toHaveLength(2);
    expect(result.data?.map((p) => p.title)).toEqual(["Første", "Andre"]);
    expect(result.data?.[0]).toMatchObject({
      authorId: userId,
      realmId,
      content: "Innhold",
      likes: 0,
      dislikes: 0,
    });
  });

  it("get returnerer riktig innlegg", async () => {
    // Arrange: create a post in the database to be retrieved
    const created = await createPost(userId, realmId, "Hent meg");

    // Act: retrieve the post by its ID from the controller
    const result = await postController.get(created.id);

    // Assert: the retrieved post matches the created post
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toMatchObject({ id: created.id, title: "Hent meg" });
  });

  it("get gir feil når innlegget ikke finnes", async () => {
    // Arrange & Act: attempt to retrieve a non-existent post from the controller
    const result = await postController.get(9999);

    // Assert
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.code).toBe(500);
  });

  it("listByRealm returnerer bare innlegg fra riktig realm", async () => {
    // Arrange: create posts in different realms
    const otherRealm = await createRealm(userId, "Annen realm");
    await createPost(userId, realmId, "I realm 1");
    await createPost(userId, otherRealm.id, "I realm 2");

    // Act: retrieve the list of posts for the specified realm from the controller
    const result = await postController.listByRealm(realmId);

    // Assert: only posts from the specified realm are returned
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data?.map((p) => p.title)).toEqual(["I realm 1"]);
  });
});
