import { IPostService, postService } from "../service/post.service";
import type { Post } from "../types/Post";

export interface IPostController {
  list(): Promise<Response>;
  listByRealm(realmId: number): Promise<Response>;
  get(id: number): Promise<Response>;
  create(post: Partial<Post>): Promise<Response>;
  remove(id: number): Promise<Response>;
  update(id: number, post: Post): Promise<Response>;
}

export function createPostController(service: IPostService): IPostController {
  return {
    async list(): Promise<Response> {
      try {
        const posts = await service.list();

        return new Response(JSON.stringify(posts), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        console.error("PostController.list error:", e);

        const message =
          e instanceof Error ? e.message : "Failed to list posts";

        return new Response(JSON.stringify({ message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    },

    async listByRealm(realmId: number): Promise<Response> {
      try {
        const posts = await service.listByRealm(realmId);
        console.log(posts);

        return new Response(JSON.stringify(posts), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        console.error("PostController.listByRealm error:", e);

        const message =
          e instanceof Error ? e.message : "Failed to list posts for realm";

        let status = 500;
        if (message === "Realm ID must be a number.") {
          status = 400;
        }

        return new Response(JSON.stringify({ message }), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      }
    },

    async get(id: number): Promise<Response> {
      try {
        const post = await service.get(id);

        return new Response(JSON.stringify(post), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        console.error("PostController.get error:", e);

        const message =
          e instanceof Error ? e.message : "Failed to fetch post";

        let status = 500;
        if (message === "ID must be a number.") {
          status = 400;
        } else if (message === "Post not found") {
          status = 404;
        }

        return new Response(JSON.stringify({ message }), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      }
    },

    async create(postForm: Partial<Post>): Promise<Response> {
      try {
        const created = await service.create(postForm);

        return new Response(JSON.stringify(created), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        console.error("PostController.create error:", e);

        const message =
          e instanceof Error ? e.message : "Failed to create post";

        let status = 500;
        if (
          message === "Title and content are required." ||
          message === "authorId and realmId are required."
        ) {
          status = 400;
        }

        return new Response(JSON.stringify({ message }), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      }
    },

    async remove(id: number): Promise<Response> {
      try {
        await service.remove(id);

        return new Response(
          JSON.stringify({ message: "Post removed successfully" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      } catch (e) {
        console.error("PostController.remove error:", e);

        const message =
          e instanceof Error ? e.message : "Failed to remove post";

        let status = 500;
        if (message === "ID must be a number.") {
          status = 400;
        } else if (message === "Post not found") {
          status = 404;
        }

        return new Response(JSON.stringify({ message }), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      }
    },

    async update(id: number, postValue: Post): Promise<Response> {
      try {
        const updated = await service.update(id, postValue);

        return new Response(JSON.stringify(updated), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        console.error("PostController.update error:", e);

        const message =
          e instanceof Error ? e.message : "Failed to update post";

        let status = 500;
        if (
          message === "ID must be a number." ||
          message === "Title and content are required."
        ) {
          status = 400;
        } else if (message === "Post not found") {
          status = 404;
        }

        return new Response(JSON.stringify({ message }), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      }
    },
  };
}

export const postController = createPostController(postService);
