import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { realm } from "./realm-schema";
import { relations } from "drizzle-orm/relations";
import { comment } from "./comment-schema";

export const post = sqliteTable("posts", {
  id: int("id").primaryKey({ autoIncrement: true }).notNull(),
  author_id: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  realm_id: int("realm_id")
    .notNull()
    .references(() => realm.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content"),
  likes: int("likes").notNull().default(0),
  dislikes: int("dislikes").notNull().default(0),
  created_at: text("created_at").notNull().default(new Date().toISOString()),
});

// Koblingstabeller for å holde styr på hvilke brukere som liker eller misliker hvilke innlegg
export const userLikesPost = sqliteTable("user_likes_post", {
  user_id: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  post_id: int("post_id")
    .notNull()
    .references(() => post.id, { onDelete: "cascade" }),
});

export const userDislikesPost = sqliteTable("user_dislikes_post", {
  user_id: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  post_id: int("post_id")
    .notNull()
    .references(() => post.id, { onDelete: "cascade" }),
});

export const userLikesPostRelations = relations(userLikesPost, ({ one }) => ({
  user: one(user, {
    fields: [userLikesPost.user_id],
    references: [user.id],
    relationName: "userLikesPostUser",
  }),
  post: one(post, {
    fields: [userLikesPost.post_id],
    references: [post.id],
    relationName: "userLikesPostPost",
  }),
}));

export const userDislikesPostRelations = relations(
  userDislikesPost,
  ({ one }) => ({
    user: one(user, {
      fields: [userDislikesPost.user_id],
      references: [user.id],
      relationName: "userDislikesPostUser",
    }),
    post: one(post, {
      fields: [userDislikesPost.post_id],
      references: [post.id],
      relationName: "userDislikesPostPost",
    }),
  }),
);

export const postsRelations = relations(post, ({ one, many }) => ({
  author: one(user, {
    fields: [post.author_id],
    references: [user.id],
    relationName: "postAuthor",
  }),
  toRealm: one(realm, {
    fields: [post.realm_id],
    references: [realm.id],
    relationName: "postRealm",
  }),
  toComments: many(comment, {
    relationName: "postComments",
  }),

  likedByUsers: many(userLikesPost, {
    relationName: "postLikedByUsers",
  }),
  dislikedByUsers: many(userDislikesPost, {
    relationName: "postDislikedByUsers",
  }),
}));
