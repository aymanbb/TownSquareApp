import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const post = sqliteTable("posts", {
  id: int("id").primaryKey({ autoIncrement: true }).notNull(),
  title: text("title").notNull(),
  content: text("content"),
  likes: int("likes").notNull().default(0),
  dislikes: int("dislikes").notNull().default(0),
  created_at: text("created_at").notNull().default(new Date().toISOString()),
});
