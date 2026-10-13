export type User = {
  id: number;
  role: "user" | "admin";
  username: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: Date;
  level: number;
};
