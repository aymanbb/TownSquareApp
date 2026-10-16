import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const realm = sqliteTable("realm", {
  id: int("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});
