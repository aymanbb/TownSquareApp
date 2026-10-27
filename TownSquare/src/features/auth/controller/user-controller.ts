// Inneholder
import {
  userService,
  type IUserService,
} from "@/features/auth/service/user-service";

import type { Result } from "@/features/utils/Result";
import type { User } from "../types/User";
export interface IUserController {
  remove: (id: string) => Promise<Result<void>>;
  update: (id: string, task: any) => Promise<Result<User>>;
  get: (id: string) => Promise<Result<Partial<User>>>;
  list: () => Promise<Result<Partial<User>[]>>;
  isAdmin: (id: string) => Promise<Result<boolean>>;
  sortByLevel: () => Promise<Result<Partial<User>[]>>;
}

export function createUserController(_service: IUserService): IUserController {
  return {
    remove: async (id: string) => _service.remove(id),
    update: async (id: string, task: any) => _service.update(id, task),
    get: async (id: string) => {
      try {
        const user = await _service.get(id);
        const result: Result<Partial<User>> = { success: true, data: user };
        return result;
      } catch (error) {
        return {
          success: false,
          error: { message: "Kunne ikke hente poster", code: 500 },
        };
      }
    },
    list: async () => {
      try {
        const users = await _service.list();
        const result: Result<Partial<User>[]> = { success: true, data: users };
        return result;
      } catch (error) {
        return {
          success: false,
          error: { message: "Kunne ikke hente poster", code: 500 },
        };
      }
    },
    isAdmin: async (id: string) => {
      try {
        const isAdmin = await _service.isAdmin(id);
        const result: Result<boolean> = { success: true, data: isAdmin };
        return result;
      } catch (error) {
        return {
          success: false,
          error: { message: "Kunne ikke hente admin-status", code: 500 },
        };
      }
    },
    sortByLevel: async () => {
      try {
        const users = await _service.sortByLevel();
        const result: Result<Partial<User>[]> = { success: true, data: users };
        return result;
      } catch (error) {
        return {
          success: false,
          error: {
            message: "Kunne ikke sortere brukere etter nivå",
            code: 500,
          },
        };
      }
    },
  };
}

export const userController = createUserController(userService);
