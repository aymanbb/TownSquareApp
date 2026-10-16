import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { user } from "./user-schema";

export const message = sqliteTable("message", {
  id: int("id").primaryKey({ autoIncrement: true }).notNull(),
  content: text("content").notNull(),
  date: text("date").notNull(),
  from: text("from")
    .notNull()
    .references(() => user.id),
});
