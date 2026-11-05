import React from "react";
import Buffering from "@/features/global/components/Buffering";
import PostList from "./PostList";
import PostFeedHeader from "./PostHeader";
import { useFetch } from "@/features/utils/useFetch";
import { listPostsByRealm } from "../../api/post-api";
import type { Post } from "../../types/Post";

type RealmPostFeedProps = {
  realmId: number;
};

export const RealmPostFeed: React.FC<RealmPostFeedProps> = ({ realmId }) => {
  const { data, loading, error } = useFetch<Post[]>(
    () => listPostsByRealm(realmId),
    [],
  );

  if (loading) return <Buffering />;
  if (error) return <p>{error}</p>;

  return (
    <div className="post-feed">
      <PostFeedHeader />
      <PostList posts={data} />
    </div>
  );
};

export default RealmPostFeed;
