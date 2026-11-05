import type { Post } from "../../types/Post";
import { PostCard } from "./PostCard";
import React from "react";
import { ScrollView } from "@/features/global/components/ScrollView";
interface postListProps {
  posts: Post[];
}

export const PostList = ({ posts }: postListProps) => {
  return (
    <ScrollView className=" h-150 flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ScrollView>
  );
};
export default PostList;
