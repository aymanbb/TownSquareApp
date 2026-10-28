import type { Post } from "../../types/Post";
import { PostCard } from "./PostCard";
import React from "react";

interface postListProps {
  posts: Post[];
}

export const PostList = ({ posts }: postListProps) => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
export default PostList;
