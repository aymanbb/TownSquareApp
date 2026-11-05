import { route } from "rwsdk/router";
import { realmsController } from "../controller/realms-controller";
import { postController } from "@/features/posts/controller/post.controller";
import { Realm } from "../types/Realm";

export const realmRoutes = [
  // /api/v1/realms - list / create / follow
  route("/api/v1/realms", {
    get: async () => {
      return realmsController.list();
    },
    post: async ({ request }) => {
      const url = new URL(request.url);
      const followRealmParam = url.searchParams.get("followRealm");

      // Hvis followRealm query param er satt: "follow realm"
      if (followRealmParam) {
        console.log("(routes) followRealmParam:", followRealmParam);
        const body = (await request.json()) as { userId: string };
        return realmsController.follow(body.userId, followRealmParam);
      }

      // Ellers: "create realm"
      const realmForm: Partial<Realm> = await request.json();
      return realmsController.create(realmForm);
    },
  }),

  // /api/v1/realms/check-follow?realmId=...
  route("/api/v1/realms/check-follow", {
    post: async ({ request }) => {
      const url = new URL(request.url);
      const realmId = url.searchParams.get("realmId");

      if (!realmId) {
        return new Response(
          JSON.stringify({ message: "Missing realmId" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      const body = (await request.json()) as { userId: string };
      const userId = body.userId;

      if (!userId) {
        return new Response(
          JSON.stringify({ message: "Missing userId" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      return realmsController.checkFollow(userId, realmId);
    },
  }),

  // /api/v1/realms/:realmId - get single realm
  route("/api/v1/realms/:realmId", async ({ params }) => {
    const id = Number(params.realmId);

    if (!Number.isFinite(id)) {
      return new Response(
        JSON.stringify({ message: "Invalid realm id" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return realmsController.get(id);
  }),

  // /api/v1/realms/posts/:realmId - posts by realm
  route("/api/v1/realms/posts/:realmId", {
    get: async ({ params }) =>
      Response.json(
        await postController.listByRealm(Number(params.realmId)),
      ),
  }),
];
