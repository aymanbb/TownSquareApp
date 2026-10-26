import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { relations, sql } from "drizzle-orm";

export const message = sqliteTable("message", {
  id: int("id").primaryKey({ autoIncrement: true }).notNull(),
  content: text("content").notNull(),
  from: text("from_user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  to: text("to_user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  created_at: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

// En melding har en avsender og en mottaker, begge er brukere.
// Melding tabellen skal kunne ha en avsender og en mottaker, begge er brukere.
// message mange til en.
export const messageRelations = relations(message, ({ one }) => ({
  fromUser: one(user, {
    fields: [message.from],
    references: [user.id],
    relationName: "messageAuthor",
  }),
  toUser: one(user, {
    fields: [message.to],
    references: [user.id],
    relationName: "messageReceiver",
  }),
}));

// Relasjoner for user, user skal kunne ha flere meldinger, både som avsender og mottaker
export const UserRelations = relations(user, ({ many }) => ({
  author: many(message, {
    relationName: "messageAuthor",
  }),
  receiver: many(message, {
    relationName: "messageReceiver",
  }),
}));
