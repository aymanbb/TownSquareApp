import { dummyUsers } from "./dummyData";
import { db } from "@/db";
import { user } from "@/db/schema/auth";
import { post } from "@/db/schema/post-schema";
import { eq, desc } from "drizzle-orm";
import type { User } from "../types/User";
import { error } from "node:console";

export interface IUserRepository {
  remove: (id: string) => Promise<any>;
  update: (id: string, task: any) => Promise<any>;
  get: (id: string) => Promise<Partial<User>>;
  list: () => Promise<Partial<User>[]>;
  isAdmin: (id: string) => Promise<boolean>;
  sortByLevel: () => Promise<Partial<User>[]>;
}

type UserRow = typeof user.$inferSelect;

const toUser = (row: UserRow): Partial<User> => ({
  id: row.id,
  name: row.name,
  email: row.email,
  role: row.role ?? "user",
  level: row.level,
});

export function createUserRepository(_db: typeof db): IUserRepository {
  // Save all the data inside a variable.
  return {
    remove: async (id: string) => {
      throw new Error("Function not implemented.");
    },
    update: async (id: string, task: any) => {
      throw new Error("Function not implemented.");
    },
    get: async (id: string) => {
      // We make an async function for finding a specific user.
      const result = await db.select().from(user).where(eq(user.id, id)).get();

      if (!result) {
        throw new Error("User not found");
      }

      return toUser(result);
    },
    list: async () => {
      return (await db.select().from(user).all()).map(toUser);
    },
    isAdmin: async (id: string) => {
      const result = await db.select().from(user).where(eq(user.id, id)).get();
      if (!result) {
        throw new Error("User not found");
      }
      return result.role === "admin";
    },
    sortByLevel: async () => {
      // Henter ut alle brukere sortert etter nivå (level) i stigende rekkefølge.
      return (await db.select().from(user).orderBy(desc(user.level)).all()).map(
        toUser,
      );
    },
  };
}

export const userRepository = createUserRepository(db);
