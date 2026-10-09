import {
  userRepository,
  type IUserRepository,
} from "@/features/auth/repository/auth-repository";
import type { User } from "../types/User";
import { create } from "node:domain";

export interface IUserService {
  create: (user: User) => Promise<any>;
  remove: (id: string) => Promise<any>;
  update: (id: string, task: any) => Promise<any>;
  get: (id: string) => Promise<User>;
  list: () => Promise<User[]>;
  isAdmin: (id: string) => Promise<boolean>;
  sortByLevel: () => Promise<User[]>;
}

export function createUserService(repository: IUserRepository): IUserService {
  return {
    create: async (user: User) => repository.create(user),
    remove: async (id: string) => repository.remove(id),
    update: async (id: string, task: any) => repository.update(id, task),
    get: async (id: string) => repository.get(id),
    list: async () => repository.list(),
    isAdmin: async (id: string) => {
      const user = await repository.get(id);
      return Boolean((user as any)?.isAdmin ?? false);
    },
    sortByLevel: async () => {
      return await repository.sortByLevel();
    },
  };
}

export const userService = createUserService(userRepository);
