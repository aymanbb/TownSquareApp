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
