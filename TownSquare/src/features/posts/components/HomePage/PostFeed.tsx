import React, { useEffect, useState } from "react";
import Buffering from "@/features/global/components/Buffering";
import { listPosts } from "../../api/post-api";
import type { Post } from "../../types/Post";
import PostList from "./PostList";
import PostFeedHeader from "./PostHeader";

import { useFetch } from "@/features/utils/useFetch";
export const PostFeed = () => {
  //const [posts, setPosts] = useState<Post[]>([]);
  const { data, loading, error } = useFetch(listPosts, []);

  if (loading) return <Buffering />;
  if (error) return <p>{error}</p>;

  return (
    <div className="post-feed">
      <PostFeedHeader />
      <PostList posts={data} />
    </div>
  );
};

export default PostFeed;
