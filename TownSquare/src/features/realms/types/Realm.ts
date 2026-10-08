import type { Post } from "../../posts/types/Post";

export type Realm = {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  createdAt: string;
  updatedAt?: string;
  //posts: Post[];
};
