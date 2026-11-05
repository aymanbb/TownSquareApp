import { Post } from "../types/Post";
import type { IPostRepository } from "../repository/post.repository";
import { postRepository } from "../repository/post.repository";

export interface IPostService {
  create(post: Partial<Post>): Promise<Post>;
  remove(id: number): Promise<any>;
  update(id: number, post: Post): Promise<any>;
  get(id: number): Promise<Post>;
  list(): Promise<Post[]>;
  listByRealm(realmId: number): Promise<Post[]>;
}

export function createPostService(repository: IPostRepository): IPostService {
  return {
    async list(): Promise<Post[]> {
      try {
        return await repository.list();
      } catch (e) {
        console.error("PostService.list error:", e);
        throw new Error("Failed to list posts");
      }
    },

    async listByRealm(realmId: number): Promise<Post[]> {
      if (!Number.isFinite(realmId)) {
        throw new Error("Realm ID must be a number.");
      }

      try {
        const posts = await repository.listByRealm(realmId);
        console.log("SERVICE: ", posts);
        return posts;
      } catch (e) {
        console.error("PostService.listByRealm error:", e);
        if (e instanceof Error) {
          throw e;
        }
        throw new Error("Failed to list posts for realm");
      }
    },

    async get(id: number): Promise<Post> {
      if (!Number.isFinite(id)) {
        throw new Error("ID must be a number.");
      }

      try {
        return await repository.get(id);
      } catch (e) {
        console.error("PostService.get error:", e);
        if (e instanceof Error) {
          throw e;
        }
        throw new Error("Failed to fetch post");
      }
    },

    async create(postForm: Partial<Post>): Promise<Post> {
      if (!postForm.title || !postForm.content) {
        throw new Error("Title and content are required.");
      }
      if (!postForm.authorId || !postForm.realmId) {
        throw new Error("authorId and realmId are required.");
      }

      try {
        return await repository.create(postForm);
      } catch (e) {
        console.error("PostService.create error:", e);
        if (e instanceof Error) {
          throw e;
        }
        throw new Error("Failed to create post");
      }
    },

    async remove(id: number): Promise<any> {
      if (!Number.isFinite(id)) {
        throw new Error("ID must be a number.");
      }

      try {
        return await repository.remove(id);
      } catch (e) {
        console.error("PostService.remove error:", e);
        if (e instanceof Error) {
          throw e;
        }
        throw new Error("Failed to remove post");
      }
    },

    async update(id: number, postValue: Post): Promise<any> {
      if (!Number.isFinite(id)) {
        throw new Error("ID must be a number.");
      }
      if (!postValue.title || !postValue.content) {
        throw new Error("Title and content are required.");
      }

      try {
        return await repository.update(id, postValue);
      } catch (e) {
        console.error("PostService.update error:", e);
        if (e instanceof Error) {
          throw e;
        }
        throw new Error("Failed to update post");
      }
    },
  };
}

export const postService = createPostService(postRepository);
