import { Post } from "../types/Post";
import type { IPostRepository } from "../repository/post.repository";
import { postRepository } from "../repository/post.repository";

export interface IPostService {
  create: (post: Post) => Promise<any>;
  remove: (id: number) => Promise<any>;
  update: (id: number, post: Post) => Promise<any>;
  get: (id: number) => Promise<Post>;
  list: () => Promise<Post[]>;
  listByRealm: (realmId: number) => Promise<Post[]>;
}

export function createPostService(_repository: IPostRepository): IPostService {
  return {
    create: async (post: Post) => {
      return _repository.create(post);
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
