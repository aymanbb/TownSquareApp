// Her setter vi opp REST-api routes for å ha alle routes knyttet til måltider og matvarer
// på et sted. Har også aktuelle interruptors (mellomvare)

import { route } from "rwsdk/router";
import { postController } from "@/features/posts/controller/post.controller";

export const postRoutes = [
  route("/api/v1/posts", {
    get: async () => Response.json(await postController.list()),
  }),
  route("/api/v1/posts/:id", {
    get: async ({ params }) =>
      Response.json(await postController.get(Number(params.id))),
  }),
  route("/api/v1/posts/realm/:realmId", {
    get: async ({ params }) =>
      Response.json(await postController.listByRealm(Number(params.realmId))),
  })
];
