import type { Post } from "./Post";

export type Realm = {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  posts: Post[];
};
