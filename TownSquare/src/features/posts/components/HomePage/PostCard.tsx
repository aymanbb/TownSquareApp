import React, { useState, useEffect } from "react";
import type { Post } from "../../types/Post";
import { fetchRealm } from "@/features/realms/api/realms-api";
import { useFetch } from "@/features/utils/useFetch";
interface PostCardProps {
  post: Post;
}
const mcButton =
  "border-2 border-black bg-[#6F6F6F] px-4 py-2 text-white " +
  "shadow-[inset_2px_2px_0_#AAAAAA,inset_-2px_-2px_0_#4A4A4A] " +
  "[text-shadow:2px_2px_0_#3F3F3F] font-['Pixelify_Sans'] [image-rendering:pixelated]";

const mcButtonInteractive =
  mcButton +
  " cursor-pointer hover:bg-[#7E88BF] " +
  "hover:shadow-[inset_2px_2px_0_#BEC6F0,inset_-2px_-2px_0_#4E5788] " +
  "active:shadow-[inset_-2px_-2px_0_#AAAAAA,inset_2px_2px_0_#4A4A4A]";

const slotStyle =
  "relative h-11 w-11 sm:h-14 sm:w-14 shrink-0 bg-[#8B8B8B] p-1 cursor-pointer " +
  "shadow-[inset_2px_2px_0_#373737,inset_-2px_-2px_0_#FFFFFF]";

// Tallet nede i høyre hjørne, som antall items i en stack
const stackCount =
  "absolute bottom-0 right-1 text-lg leading-none text-white " +
  "[text-shadow:2px_2px_0_#3F3F3F] font-['Pixelify_Sans'] pointer-events-none";

export const PostCard = ({ post }: PostCardProps) => {
  const [realmName, setRealmName] = useState<string | null>(null);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);

  const [, setTic] = useState(0);
  const handleLike = () => {
    setLikesCount(likesCount + 1);
    //setTic((t) => t + 1);
  };

  const handleDislike = () => {
    setDislikesCount(dislikesCount + 1);
    //setTic((t) => t + 1);
  };

  const { data, error, loading } = useFetch(
    () => fetchRealm(post.realmId),
    null,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (data && !realmName) {
    setRealmName(data?.name ?? null);
  }

  return (
    <article
      className={`flex flex-wrap gap-3 sm:flex-nowrap sm:gap-4 ${mcButton}`}
    >
      <div className="flex flex-col gap-2 justify-around">
        <button
          type="button"
          aria-label={`Lik (${post.likes})`}
          className={`${slotStyle} hover:bg-green-500`}
          onClick={handleLike}
        >
          <img
            src="/assets/icons/svg/Like.svg"
            alt=""
            className="h-full w-full object-contain [image-rendering:pixelated]"
          />
          <span className={stackCount}>{likesCount}</span>
        </button>
        <button
          type="button"
          aria-label={`Mislik (${post.dislikes})`}
          className={`${slotStyle} hover:bg-red-500`}
          onClick={handleDislike}
        >
          <img
            src="/assets/icons/svg/Dislike.svg"
            alt=""
            className="h-full w-full object-contain [image-rendering:pixelated]"
          />
          <span className={stackCount}>{dislikesCount}</span>
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 break-words">
        <h3>
          {post.title} – postet i {realmName}
        </h3>
        <p>{post.content}</p>
      </div>

      <div className="flex w-full items-center gap-2 sm:w-auto sm:flex-col sm:justify-center">
        <button
          type="button"
          aria-label={`Gå til riket (${post.realmId})`}
          className={
            `h-12 w-12 sm:h-28 sm:w-28 lg:h-40 lg:w-40 shrink-0 bg-[#8B8B8B] p-1 cursor-pointer ` +
            "shadow-[inset_2px_2px_0_#373737,inset_-2px_-2px_0_#FFFFFF] hover:bg-blue-500"
          }
          onClick={() => (window.location.href = `/realms/${post.realmId}`)}
        >
          <img
            src="/assets/icons/svg/CastleIcon.svg"
            alt="Realm icon"
            className="h-full w-full object-contain [image-rendering:pixelated]"
          />
        </button>
        <p className="block min-w-0 break-words sm:text-center">
          realm/{realmName}
        </p>
      </div>
    </article>
  );
};
