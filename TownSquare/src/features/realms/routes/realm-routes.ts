import { route } from "rwsdk/router";
import { realmsController } from "../controller/realms-controller";
import { Realm } from "../types/Realm";

export const realmRoutes = [
  route("/api/v1/realms", {
    get: async () => realmsController.list(),
    post: async ({ request }) => {
      const url = new URL(request.url);
      const followRealmParam = url.searchParams.get("followRealm");

      if (followRealmParam) {
        const userId = (await request.json()) as { userId: string };
        return realmsController.follow(userId.userId, followRealmParam);
      }

      const realmForm: Partial<Realm> = await request.json();
      return realmsController.create(realmForm);
    },
  }),

    route("/api/v1/realms/check-follow", {
    post: async ({ request }) => {
      const url = new URL(request.url);
      const realmId = url.searchParams.get("realmId");
      if (!realmId) {
        return new Response(
          JSON.stringify({
            success: false,
            error: { message: "Missing realmId", code: 400 },
          }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      const body = (await request.json()) as { userId: string };
      const userId = body.userId;

      return realmsController.checkFollow(userId, realmId);
    },
  }),

  route("/api/v1/realms/:realmId", async ({ params }) => {
    const id = Number(params.realmId);
    if (!Number.isFinite(id)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: { message: "Invalid realm id", code: 400 },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
    return realmsController.get(id);
  }),
];
