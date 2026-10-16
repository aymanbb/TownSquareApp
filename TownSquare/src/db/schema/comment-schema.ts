import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
export const comment = sqliteTable("comment", {
  id: int("id").primaryKey(),
  content: text("content").notNull(),
});
