export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  realmId: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: Comment[];
  commentsCount: number;
};
