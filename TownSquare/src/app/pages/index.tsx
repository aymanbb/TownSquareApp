"use client";
import { Welcome } from "./welcome.js";
import Buffering from "@/features/global/components/Buffering";
import { useEffect, useState } from "react";
import { listPosts } from "@/features/posts/api/post-api";
import type { Post } from "@/features/posts/types/Post";

export const Home = () => {
  // _Feel free to delete this element and its import_
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
    <>
      <Buffering />
      <Welcome />
      <div>
        <h2>Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {post.title} av {post.authorId}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
