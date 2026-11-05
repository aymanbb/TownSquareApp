import { IPostService, postService } from "../service/post.service";
import type { Post } from "../types/Post";
import type { Result } from "../utils/Result";

export interface IPostController {
  create: (post: Partial<Post>) => Promise<Response>;
  remove: (id: number) => Promise<Result<void>>;
  update: (id: number, post: Post) => Promise<Result<Post>>;
  get: (id: number) => Promise<Result<Post>>;
  list: () => Promise<Result<Post[]>>;
  listByRealm: (realmId: number) => Promise<Result<Post[]>>;
}

export function createPostController(_service: IPostService): IPostController {
  return {
    async create(postForm: Partial<Post>): Promise<Response> {
      try {
        const created = await _service.create(postForm);
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
    remove: async (id: number) => {
      return _service.remove(id);
    },
    update: async (id: number, post: Post) => {
      return _service.update(id, post);
    },
    get: async (id: number) => {
      try {
        const post = await _service.get(id);

        const result: Result<Post> = {
          success: true,
          data: post,
        };

        return result;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          error: { message: "Kunne ikke hente poster", code: 500 },
        };
      }
    },
    list: async () => {
      try {
        const postList = await _service.list();
        const result: Result<Post[]> = {
          success: true,
          data: postList,
        };
        return result;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          error: { message: "Kunne ikke hente poster", code: 500 },
        };
      }
    },
    listByRealm: async (realmId: number) => {
      try {
        const postList = await _service.listByRealm(realmId);

        const result: Result<Post[]> = {
          success: true,
          data: postList,
        };

        return result;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          error: { message: "Kunne ikke hente poster", code: 500 },
        };
      }
    },
  };
}

export const postController = createPostController(postService);
