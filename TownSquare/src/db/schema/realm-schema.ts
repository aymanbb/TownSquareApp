import { sqliteTable, text, int, SQLiteColumn } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { relations, sql } from "drizzle-orm";

export const realm = sqliteTable("realm", {
  id: int("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  owner_id: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  created_at: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

// Koblingstabell mellom brukere og realm
export const userFollowsRealm = sqliteTable("user_follows_realm", {
  id: int("id").primaryKey({ autoIncrement: true }).notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  realm_id: text("realm_id")
    .notNull()
    .references(() => realm.id, { onDelete: "cascade" }),
  created_at: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

// Relasjoner for realm
export const realmRelations = relations(realm, ({ one, many }) => ({
  // Hver realm har én eier
  owner: one(user, {
    fields: [realm.owner_id],
    references: [user.id],
  }),

  // En realm kan ha mange følgere
  followers: many(userFollowsRealm),
}));

// Relasjoner for koblingstabellen
export const userFollowsRealmRelations = relations(
  userFollowsRealm,
  ({ one }) => ({
    user: one(user, {
      fields: [userFollowsRealm.user_id],
      references: [user.id],
    }),

    realm: one(realm, {
      fields: [userFollowsRealm.realm_id],
      references: [realm.id],
    }),
  }),
);
