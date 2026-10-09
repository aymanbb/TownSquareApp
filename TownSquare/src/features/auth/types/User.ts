export type User = {
  id: string;
  role: "user" | "admin";
  username: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  level: number;
};

// what is to be stored on the server, only User objects can be sent to client, UserRecord cannot go beyond the service layer
export type UserRecord = User & { passwordHash: string };

// what is sent to the server when creating an account
export type NewUserRecord = Pick<UserRecord, "username" | "email" | "displayName" | "createdAt" | "passwordHash">;