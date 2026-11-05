// Her setter vi opp REST-api routes for å ha alle routes knyttet til måltider og matvarer
// på et sted. Har også aktuelle interruptors (mellomvare)

import { route } from "rwsdk/router";
import { postController } from "@/features/posts/controller/post.controller";
import { Post } from "@/features/posts/types/Post";

export const postRoutes = [
  route("/api/v1/posts", {
    get: async () => {
      Response.json(await postController.list())
    },
    post: async ({ request }) => {
      const body = (await request.json()) as Partial<Post>;
      return postController.create(body);
    },
  }),
  route("/api/v1/posts/:id", {
    get: async ({ params }) =>
      Response.json(await postController.get(Number(params.id))),
  }),
];
