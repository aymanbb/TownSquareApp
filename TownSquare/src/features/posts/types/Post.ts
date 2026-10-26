export type Post = {
  id: number;
  authorId: string;
  realmId: number;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  comments?: Comment[];
  commentsCount?: number;
};
