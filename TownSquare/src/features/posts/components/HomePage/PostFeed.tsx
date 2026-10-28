import React, { useEffect, useState } from "react";
import { listPosts } from "../../api/post-api";
import type { Post } from "../../types/Post";
import PostList from "./PostList";
import PostFeedHeader from "./PostHeader";
const PostFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    console.log("Home component mounted");
    const fetchPostsFromAPI = () => {
      listPosts().then((data) => {
        console.log("Fetched posts:", data);
        setPosts(data);
      });
    };

    fetchPostsFromAPI();
  }, []);
  return (
    <div className="post-feed">
      <PostFeedHeader />
      <PostList posts={posts} />
    </div>
  );
};

export default PostFeed;
