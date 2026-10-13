import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  role: text("role", {
    enum: ["user", "admin"],
  })
    .notNull()
    .default("user"),

  username: text("username").notNull().unique(),

  email: text("email").notNull().unique(),

  displayName: text("displayName").notNull().unique(),

  avatarUrl: text("avatarUrl"),

  bio: text("bio"),

  createdAt: text("created_at")
    .notNull()
    .default("CURRENT_TIMESTAMP"),

  level: integer("level"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;