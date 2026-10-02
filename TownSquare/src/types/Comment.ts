export type Comment = {
  id: string;
  content: string;
  authorId: string;
  realmId: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  replies: Comment[];
  repliesCount: number;
};
