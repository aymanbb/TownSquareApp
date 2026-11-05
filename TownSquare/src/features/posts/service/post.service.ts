import { Post } from "../types/Post";
import type { IPostRepository } from "../repository/post.repository";
import { postRepository } from "../repository/post.repository";

export interface IPostService {
  create: (post: Partial<Post>) => Promise<Post>;
  remove: (id: number) => Promise<any>;
  update: (id: number, post: Post) => Promise<any>;
  get: (id: number) => Promise<Post>;
  list: () => Promise<Post[]>;
  listByRealm: (realmId: number) => Promise<Post[]>;
}

export function createPostService(_repository: IPostRepository): IPostService {
  return {
    create: async (postForm: Partial<Post>) => {
      if (!postForm.title || !postForm.content) {
        throw new Error("Title and content are required.");
      }

      if (!postForm.authorId || !postForm.realmId) {
        throw new Error("authorId and realmId are required.");
      }

      return _repository.create({
        title: postForm.title,
        content: postForm.content,
        authorId: postForm.authorId,
        realmId: postForm.realmId,
      });
    },

    remove: async (id: number) => {
      return _repository.remove(id);
    },

    update: async (id: number, post: Post) => {
      return _repository.update(id, post);
    },

    get: async (id: number) => {
      return _repository.get(id);
    },

    list: async () => {
      const result = await _repository.list();
      return result;
    },

    listByRealm: async (realmId: number) => {
      const result = await _repository.listByRealm(realmId);
      return result;
    },
  };
}

export const postService = createPostService(postRepository);
