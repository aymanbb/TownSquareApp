import { route } from "rwsdk/router";
import { postController } from "@/features/posts/controller/post.controller";
import type { Post } from "@/features/posts/types/Post";

export const postRoutes = [
  route("/api/v1/posts", {
    get: async () => {
      // Controller returns Response
      return postController.list();
    },
    post: async ({ request }) => {
      const body = (await request.json()) as Partial<Post>;
      // Controller returns Response
      return postController.create(body);
    },
  }),

  route("/api/v1/posts/:id", {
    get: async ({ params }) => {
      const id = Number(params.id);

      if (!Number.isFinite(id)) {
        return new Response(
          JSON.stringify({ message: "Invalid post id" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      return postController.get(id);
    },
  }),
];
