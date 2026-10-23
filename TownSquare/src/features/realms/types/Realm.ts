import type { Post } from "../../posts/types/Post";

export type Realm = {
  id: number;
  name: string;
  description: string | null;
  ownerId: string;
  createdAt: string;
};
