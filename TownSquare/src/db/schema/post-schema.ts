import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const post = sqliteTable("post", {
  id: int("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
});
