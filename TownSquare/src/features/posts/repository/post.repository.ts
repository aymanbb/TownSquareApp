import { Post } from "../types/Post";
import { db } from "@/db";
import { post } from "@/db/schema/post-schema";
export interface IpostRepository {
  create: (post: Post) => Promise<any>;
  remove: (id: number) => Promise<any>;
  update: (id: number, post: Post) => Promise<any>;
  get: (id: number) => Promise<Post>;
  list: () => Promise<Post[]>;
  listByRealm: (realmId: number) => Promise<Post[]>;
}

type PostRow = typeof post.$inferSelect;

const toPost = (row: PostRow): Post => ({
  id: row.id,
  authorId: row.author_id,
  realmId: row.realm_id,
  title: row.title,
  content: row.content ?? "",
  createdAt: row.created_at,
  likes: row.likes,
  dislikes: row.dislikes,
});

export function createPostRepository(_db: typeof db): IpostRepository {
  // Implementation goes here
  return {
    create: async (value: Post) => {
      throw new Error("Not implemented");
    },
    remove: async (id: number) => {
      throw new Error("Not implemented");
    },
    update: async (id: number, post: Post) => {
      throw new Error("Not implemented");
    },
    get: async (id: number) => {
      throw new Error("Not implemented");
    },
    list: async () => {
      const rows = await _db.select().from(post).all();
      return rows.map(toPost);
    },
    listByRealm: async (realmId: number) => {
      throw new Error("Not implemented");
    },
  };
}
