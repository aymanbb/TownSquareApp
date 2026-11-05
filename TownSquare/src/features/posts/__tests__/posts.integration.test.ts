// Integrasjonstester for posts: controller → service → repository → D1 (lokal test-database).
import { beforeEach, describe, expect, it } from "vitest";
import { postController } from "@/features/posts/controller/post.controller";
import { createPost, createRealm, createUser, resetDb } from "../../../../test/helpers";

describe("Posts (controller → service → repository → D1)", () => {
  let userId: string;
  let realmId: number;

  beforeEach(async () => {
    await resetDb();
    userId = await createUser();
    realmId = (await createRealm(userId)).id;
  });

  it("list returnerer en tom liste når det ikke finnes innlegg", async () => {
    const result = await postController.list();

    expect(result).toEqual({ success: true, data: [] });
  });

  it("list returnerer alle innlegg som Post-objekter", async () => {
    await createPost(userId, realmId, "Første");
    await createPost(userId, realmId, "Andre");

    const result = await postController.list();

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
    const created = await createPost(userId, realmId, "Hent meg");

    const result = await postController.get(created.id);

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toMatchObject({ id: created.id, title: "Hent meg" });
  });

  it("get gir feil når innlegget ikke finnes", async () => {
    const result = await postController.get(9999);

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.code).toBe(500);
  });

  it("listByRealm returnerer bare innlegg fra riktig realm", async () => {
    const otherRealm = await createRealm(userId, "Annen realm");
    await createPost(userId, realmId, "I realm 1");
    await createPost(userId, otherRealm.id, "I realm 2");

    const result = await postController.listByRealm(realmId);

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data?.map((p) => p.title)).toEqual(["I realm 1"]);
  });
});
