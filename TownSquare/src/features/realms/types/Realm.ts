import type { Post } from "../../posts/types/Post";

export type Realm = {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string | null;
  //posts: Post[];
};
