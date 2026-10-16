// src/db/schema/user-schema.ts

import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userProfiles = sqliteTable("user_profiles", {
  id: integer().primaryKey({ autoIncrement: true }),

  // Referanse til bruker-ID-en fra Better Auth.
  userId: text().notNull().unique(),

  bio: text(),
});

export type UserProfile = typeof userProfiles.$inferSelect;
export type NewUserProfile = typeof userProfiles.$inferInsert;
