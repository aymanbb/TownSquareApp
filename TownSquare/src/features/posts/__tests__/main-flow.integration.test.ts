// Integrasjonstest av hovedflyten: opprett realm → følg den → skriv en post → posten vises i feedene.
//
// Testen går gjennom de ekte API-rutene (route → controller → service → repository → D1),
// akkurat slik frontenden bruker dem. Det fanger feil i selve rutene – f.eks. en handler
// som glemmer `return` – som tester direkte mot controlleren ikke ser.
import { beforeEach, describe, expect, it } from "vitest";
import type { RequestInfo } from "rwsdk/worker";
import type { MethodHandlers } from "rwsdk/router";
import { postRoutes } from "@/features/posts/routes/post-routes";
import { realmRoutes } from "@/features/realms/routes/realm-routes";
import { createUser, resetDb } from "../../../../test/helpers";

type Method = "get" | "post";

/** Finner ruten for `path` og kaller handleren slik rwsdk ville gjort. */
async function callApi(
  method: Method,
  path: string,
  { params = {}, body }: { params?: Record<string, string>; body?: unknown } = {},
): Promise<Response> {
  const routePath = path.split("?")[0];
  // rwsdk lagrer stiene med skråstrek på slutten ("/api/v1/posts/")
  const definition = [...postRoutes, ...realmRoutes].find(
    (r) => r.path.replace(/\/$/, "") === routePath,
  );
  if (!definition) throw new Error(`Fant ingen rute for ${routePath}`);

  // API-rutene våre er enten én funksjon eller et objekt med én funksjon per HTTP-metode
  type Handler = (info: RequestInfo) => unknown;
  const handler = (
    typeof definition.handler === "function"
      ? definition.handler
      : (definition.handler as MethodHandlers)[method]
  ) as Handler | undefined;
  if (!handler) throw new Error(`${method.toUpperCase()} ${routePath} finnes ikke`);

  const request = new Request(`http://localhost${path}`, {
    method: method.toUpperCase(),
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const response = await handler({ request, params } as unknown as RequestInfo);
  // En API-rute må alltid svare med en Response – ellers får frontenden en 500.
  expect(response, `${method.toUpperCase()} ${path} returnerte ikke en Response`).toBeInstanceOf(Response);
  return response as Response;
}

describe("Hovedflyt: realm → følg → post → feed", () => {
  let userId: string;

  beforeEach(async () => {
    await resetDb();
    userId = await createUser("user-1", "eventyrer");
  });

  it("en bruker kan lage en realm, følge den og poste i den", async () => {
    // 1. Opprett realm
    const createRealmRes = await callApi("post", "/api/v1/realms", {
      body: { name: "Tavernaen", description: "For eventyrere", ownerId: userId },
    });
    expect(createRealmRes.status).toBe(201);
    const realm = (await createRealmRes.json()) as { id: number; name: string };
    expect(realm.name).toBe("Tavernaen");

    // 2. Følg realmen, og sjekk at follow-statusen er oppdatert
    const followRes = await callApi("post", `/api/v1/realms?followRealm=${realm.id}`, {
      body: { userId },
    });
    expect(followRes.status).toBe(200);

    const checkRes = await callApi("post", `/api/v1/realms/check-follow?realmId=${realm.id}`, {
      body: { userId },
    });
    expect(await checkRes.json()).toEqual({ isFollowing: true });

    // 3. Skriv en post i realmen
    const createPostRes = await callApi("post", "/api/v1/posts", {
      body: { title: "Hei alle", content: "Første post!", authorId: userId, realmId: realm.id },
    });
    expect(createPostRes.status).toBe(201);
    const post = (await createPostRes.json()) as { id: number };

    // 4. Posten vises i hovedfeeden ...
    const feedRes = await callApi("get", "/api/v1/posts");
    expect(feedRes.status).toBe(200);
    const feed = (await feedRes.json()) as { success: boolean; data: { id: number; title: string }[] };
    expect(feed.success).toBe(true);
    expect(feed.data).toEqual([expect.objectContaining({ id: post.id, title: "Hei alle" })]);

    // ... og i realmens egen feed
    const realmFeedRes = await callApi("get", "/api/v1/realms/posts/:realmId", {
      params: { realmId: String(realm.id) },
    });
    const realmFeed = (await realmFeedRes.json()) as { data: { id: number }[] };
    expect(realmFeed.data.map((p) => p.id)).toEqual([post.id]);
  });

  it("en ugyldig post avvises med 400 og havner ikke i feeden", async () => {
    const realm = (await (
      await callApi("post", "/api/v1/realms", { body: { name: "Tom realm", ownerId: userId } })
    ).json()) as { id: number };

    const res = await callApi("post", "/api/v1/posts", {
      body: { title: "", content: "", authorId: userId, realmId: realm.id },
    });
    expect(res.status).toBe(400);

    const feed = (await (await callApi("get", "/api/v1/posts")).json()) as { data: unknown[] };
    expect(feed.data).toEqual([]);
  });
});
