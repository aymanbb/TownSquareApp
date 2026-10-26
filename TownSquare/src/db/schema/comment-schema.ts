import {
  sqliteTable,
  text,
  int,
  AnySQLiteColumn,
} from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { post } from "./post-schema";
import { relations } from "drizzle-orm/relations";
import { sql } from "drizzle-orm";

export const comment = sqliteTable("comment", {
  id: int("id").primaryKey({ autoIncrement: true }).notNull(),
  author_id: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content"),
  likes: int("likes").notNull().default(0),
  dislikes: int("dislikes").notNull().default(0),
  parentComment_id: int("parent_comment_id").references(
    (): AnySQLiteColumn => comment.id,
    { onDelete: "cascade" },
  ),
  post_id: int("post_id")
    .notNull()
    .references(() => post.id, { onDelete: "cascade" }),
  created_at: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const commentRelations = relations(comment, ({ one }) => ({
  author: one(user, {
    fields: [comment.author_id],
    references: [user.id],
  }),
  post: one(post, {
    fields: [comment.post_id],
    references: [post.id],
  }),
  parentComment: one(comment, {
    fields: [comment.parentComment_id],
    references: [comment.id],
  }),
}));
