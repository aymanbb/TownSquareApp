import type { User, UserRecord, NewUserRecord } from "../types/User";

export interface IUserRepository {
  create: (user: NewUserRecord) => Promise<UserRecord>;
  remove: (id: string) => Promise<any>;
  update: (id: string, task: any) => Promise<any>;
  get: (id: string) => Promise<User>;
  list: () => Promise<User[]>;
  isAdmin: (id: string) => Promise<boolean>;
  findByUsername: (username: string) => Promise<UserRecord | null>
  findByEmail: (email: string) => Promise<UserRecord | null>
}
