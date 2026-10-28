"use client";
import PostFeed from "@/features/posts/components/HomePage/PostFeed";
import { Welcome } from "./welcome.js";
import Buffering from "@/features/global/components/Buffering";
import { useEffect, useState } from "react";
import { listPosts } from "@/features/posts/api/post-api";
import type { Post } from "@/features/posts/types/Post";

export const Home = () => {
  // _Feel free to delete this element and its import_

  return (
    <>
      <PostFeed />
    </>
  );
};
