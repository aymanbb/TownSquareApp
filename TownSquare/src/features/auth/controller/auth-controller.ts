// Inneholder
import {
  userService,
  type IUserService,
} from "@/features/auth/service/auth-service";

import type { User } from "../types/User";
export interface IUserController {
  create: (user: User) => Promise<any>;
  remove: (id: string) => Promise<any>;
  update: (id: string, task: any) => Promise<any>;
  get: (id: string) => Promise<User>;
  list: () => Promise<User[]>;
  isAdmin: (id: string) => Promise<boolean>;
  sortByLevel: () => Promise<User[]>;
}

export function createUserController(service: IUserService): IUserController {
  return {
    create: async (user: User) => service.create(user),
    remove: async (id: string) => service.remove(id),
    update: async (id: string, task: any) => service.update(id, task),
    get: async (id: string) => service.get(id),
    list: async () => service.list(),
    isAdmin: async (id: string) => service.isAdmin(id),
    sortByLevel: async () => service.sortByLevel(),
  };
}

export const userController = createUserController(userService);
