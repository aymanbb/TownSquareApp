// Enhetstester for post-servicen.
// Repositoryet byttes ut med en falsk versjon (vi.fn), så vi tester bare logikken i servicen –
// ingen database er involvert.
import { describe, expect, it, vi } from "vitest";
import { createPostService } from "@/features/posts/service/post.service";
import type { IPostRepository } from "@/features/posts/repository/post.repository";
import type { Post } from "@/features/posts/types/Post";

const lagretPost: Post = {
  id: 1,
  authorId: "user-1",
  realmId: 1,
  title: "Tittel",
  content: "Innhold",
  createdAt: "2026-01-01",
  likes: 0,
  dislikes: 0,
};

function lagFalskRepository(): IPostRepository {
  return {
    create: vi.fn(async () => lagretPost),
    remove: vi.fn(),
    update: vi.fn(),
    get: vi.fn(async () => lagretPost),
    list: vi.fn(async () => [lagretPost]),
    listByRealm: vi.fn(async () => [lagretPost]),
  };
}

describe("postService.create", () => {
  it("sender en gyldig post videre til repositoryet", async () => {
    const repo = lagFalskRepository();
    const service = createPostService(repo);

    const result = await service.create({
      title: "Tittel",
      content: "Innhold",
      authorId: "user-1",
      realmId: 1,
    });

    expect(result).toEqual(lagretPost);
    expect(repo.create).toHaveBeenCalledWith({
      title: "Tittel",
      content: "Innhold",
      authorId: "user-1",
      realmId: 1,
    });
  });

  it("fjerner felter klienten ikke skal kunne sette (f.eks. likes)", async () => {
    const repo = lagFalskRepository();
    const service = createPostService(repo);

    await service.create({
      title: "Tittel",
      content: "Innhold",
      authorId: "user-1",
      realmId: 1,
      likes: 9999,
    });

    expect(repo.create).toHaveBeenCalledWith(
      expect.not.objectContaining({ likes: 9999 }),
    );
  });

  it.each([
    [{ content: "Innhold", authorId: "u", realmId: 1 }, "Title and content are required."],
    [{ title: "Tittel", authorId: "u", realmId: 1 }, "Title and content are required."],
    [{ title: "Tittel", content: "Innhold", realmId: 1 }, "authorId and realmId are required."],
    [{ title: "Tittel", content: "Innhold", authorId: "u" }, "authorId and realmId are required."],
  ])("avviser ugyldig input %o", async (input, melding) => {
    const repo = lagFalskRepository();
    const service = createPostService(repo);

    await expect(service.create(input)).rejects.toThrow(melding);
    // Ugyldige poster skal aldri nå databasen
    expect(repo.create).not.toHaveBeenCalled();
  });
});

describe("postService.listByRealm", () => {
  it("spør repositoryet om riktig realm", async () => {
    const repo = lagFalskRepository();
    const service = createPostService(repo);

    const result = await service.listByRealm(42);

    expect(repo.listByRealm).toHaveBeenCalledWith(42);
    expect(result).toEqual([lagretPost]);
  });
});
