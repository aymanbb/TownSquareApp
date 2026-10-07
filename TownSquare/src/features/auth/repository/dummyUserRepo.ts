import { dummyUsers } from "./dummyData";
import { IUserRepository } from "./auth.repository";
import type { User } from "../types/User";
import { error } from "node:console";

export function createDummyUserRepo(db: User[] = dummyUsers): IUserRepository {
  // Save all the data inside a variable.
  let data = db;
  return {
    create: async (user) => {
      // We check if the user given in the parameter already exists this is to remove duplicates.
      data.map((existingUsers) => {
        if (existingUsers === user) {
          throw new Error("Cannot add the same user twice");
        } else if (existingUsers.id === user.id) {
          throw new Error("Cannot add the same user twice");
        }
      });

      data.push(user);
      return user;
    },
    remove: async (id: string) => {
      // remove user
      // Returns new list but with the chosen id

      // We check if datasize is 0
      if (data.length === 0) {
        throw new Error("There are no Users to remove");
      }
      const newData = data.filter((user) => user.id !== id);

      // We check if there were any changes in the data
      if (data.length === newData.length) {
        throw new Error("No user with that id");
      }
      data = newData;
    },
    update: async (id: string, task: any) => {
      throw new Error("Function not implemented.");
    },
    get: async (id: string) => {
      // We make an async function for finding a specific user.
      const user = data.find((user) => user.id === id);

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    },
    list: async () => {
      return data;
    },
    isAdmin: async (id: string) => {
      const user = data.find((user) => user.id === id);
      return user?.role === "admin";
    },
  };
}
