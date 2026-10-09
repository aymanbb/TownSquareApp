import { dummyUsers } from "./dummyData";
import type { User } from "../types/User";
import { error } from "node:console";

export interface IUserRepository {
  create: (user: User) => Promise<any>;
  remove: (id: string) => Promise<any>;
  update: (id: string, task: any) => Promise<any>;
  get: (id: string) => Promise<User>;
  list: () => Promise<User[]>;
  isAdmin: (id: string) => Promise<boolean>;
}

export function createUserRepository(db: User[] = dummyUsers): IUserRepository {
  // Save all the data inside a variable.
  return {
    create: async (user) => {
      // We check if the user given in the parameter already exists this is to remove duplicates.
      db.map((existingUsers) => {
        if (existingUsers === user) {
          throw new Error("Cannot add the same user twice");
        } else if (existingUsers.id === user.id) {
          throw new Error("Cannot add the same user twice");
        }
      });

      db.push(user);
      return user;
    },
    remove: async (id: string) => {
      // remove user
      // Returns new list but with the chosen id

      // We check if datasize is 0
      if (db.length === 0) {
        throw new Error("There are no Users to remove");
      }
      const newData = db.filter((user) => user.id !== id);

      // We check if there were any changes in the data
      if (db.length === newData.length) {
        throw new Error("No user with that id");
      }
      db = newData;
    },
    update: async (id: string, task: any) => {
      throw new Error("Function not implemented.");
    },
    get: async (id: string) => {
      // We make an async function for finding a specific user.
      const user = db.find((user) => user.id === id);

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    },
    list: async () => {
      return db;
    },
    isAdmin: async (id: string) => {
      const user = db.find((user) => user.id === id);
      return user?.role === "admin";
    },
  };
}

export const userRepository = createUserRepository(dummyUsers);
