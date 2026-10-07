import type { User } from "../types/User";

export interface IUserRepository {
  create: (user: User) => Promise<any>;
  remove: (id: string) => Promise<any>;
  update: (id: string, task: any) => Promise<any>;
  get: (id: string) => Promise<User>;
  list: () => Promise<User[]>;
  isAdmin: (id: string) => Promise<boolean>;
}
