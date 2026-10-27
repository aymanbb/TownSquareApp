import {
  userRepository,
  type IUserRepository,
} from "@/features/auth/repository/user-repository";
import type { User } from "../types/User";

export interface IUserService {
  remove: (id: string) => Promise<any>;
  update: (id: string, task: any) => Promise<any>;
  get: (id: string) => Promise<Partial<User>>;
  list: () => Promise<Partial<User>[]>;
  isAdmin: (id: string) => Promise<boolean>;
  sortByLevel: () => Promise<Partial<User>[]>;
}

export function createUserService(_repository: IUserRepository): IUserService {
  return {
    remove: async (id: string) => _repository.remove(id),
    update: async (id: string, task: any) => _repository.update(id, task),
    get: async (id: string) => _repository.get(id),
    list: async () => _repository.list(),
    isAdmin: async (id: string) => {
      const user = await _repository.get(id);
      return Boolean((user as any)?.isAdmin ?? false);
    },
    sortByLevel: async () => {
      return await _repository.sortByLevel();
    },
  };
}

export const userService = createUserService(userRepository);
