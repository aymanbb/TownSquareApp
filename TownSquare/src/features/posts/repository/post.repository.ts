import { Post } from "../types/Post";
import { db } from "@/db";
import { post } from "@/db/schema/post-schema";
import { eq } from "drizzle-orm";



export interface IPostRepository {
  create: (post: Partial<Post>) => Promise<Post>;
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

export function createPostRepository(_db: typeof db): IPostRepository {
  return {
    create: async (postForm) => {
      if (!postForm.title || !postForm.content) {
        throw new Error("Title and content are required.");
      }
      if (!postForm.authorId || !postForm.realmId) {
        throw new Error("authorId and realmId are required.");
      }

      try {
        const now = new Date().toISOString();

        const inserted = await _db
          .insert(post)
          .values({
            title: postForm.title,
            content: postForm.content,
            author_id: String(postForm.authorId),
            realm_id: Number(postForm.realmId),
            created_at: now,
            likes: 0,
            dislikes: 0,
          })
          .returning()
          .get();

        return toPost(inserted);
      } catch (e) {
        console.error("PostRepository.create error:", e);
        throw new Error("Failed to create post");
      }
    },

    remove: async (id: number) => {
      throw new Error("Not implemented");
    },

    update: async (id: number, postValue: Post) => {
      throw new Error("Not implemented");
    },

    get: async (id: number) => {
      try {
        const row = await _db
          .select()
          .from(post)
          .where(eq(post.id, id))
          .get();

        if (!row) {
          throw new Error("Post not found");
        }

        return toPost(row);
      } catch (e) {
        if (e instanceof Error) {
          console.error("PostRepository.get error:", e);
          // Behold spesifikke meldinger som "Post not found"
          throw e;
        }

        console.error("PostRepository.get unknown error:", e);
        throw new Error("Failed to get post");
      }
    },

    list: async () => {
      try {
        const rows = await _db.select().from(post).all();
        return rows.map(toPost);
      } catch (e) {
        console.error("PostRepository.list error:", e);
        throw new Error("Failed to list posts");
      }
    },

    listByRealm: async (realmId: number) => {
      try {
        const rows = await _db
          .select()
          .from(post)
          .where(eq(post.realm_id, realmId))
          .all();
        console.log("REPO ROWS: ", rows);
        console.log("REPO TOPOST: ", rows.map(toPost));
        return rows.map(toPost);
      } catch (e) {
        console.error("PostRepository.listByRealm error:", e);
        throw new Error("Failed to list posts for realm");
      }
    },
  };
}

export const postRepository = createPostRepository(db);
