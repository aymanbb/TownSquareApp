import React from "react";
import type { Post } from "../../types/Post";
import { fetchRealm } from "@/features/realms/api/realms-api";
import { useFetch } from "@/features/utils/useFetch";
import { getUser } from "@/features/auth/api/user-api";

interface PostCardProps {
  post: Post;
}

const mcButton =
  "border-2 border-black bg-[#6F6F6F] px-4 py-3 text-white " +
  "shadow-[inset_2px_2px_0_#AAAAAA,inset_-2px_-2px_0_#4A4A4A] " +
  "[text-shadow:2px_2px_0_#3F3F3F] font-['Pixelify_Sans'] [image-rendering:pixelated]";

const slotStyle =
  "relative h-14 w-14 shrink-0 bg-[#8B8B8B] p-1 cursor-pointer " +
  "shadow-[inset_2px_2px_0_#373737,inset_-2px_-2px_0_#FFFFFF]";

const stackCount =
  "absolute bottom-0 right-1 text-lg leading-none text-white " +
  "[text-shadow:2px_2px_0_#3F3F3F] font-['Pixelify_Sans'] pointer-events-none";

export const PostCard = ({ post }: PostCardProps) => {
  // Realm
  const {
    data: realm,
    loading: realmLoading,
    error: realmError,
  } = useFetch(() => fetchRealm(post.realmId), null, [post.realmId]);

  // Author
  const {
    data: author,
    loading: authorLoading,
    error: authorError,
  } = useFetch(() => getUser(post.authorId), null, [post.authorId]);

  if (realmLoading || authorLoading) return <p>Loading...</p>;
  if (realmError) return <p>Error: {realmError}</p>;
  if (authorError) return <p>Error: {authorError}</p>;

  const realmName = realm?.name ?? `Realm ${post.realmId}`;
  const authorName =
    (author as any)?.name ??
    (author as any)?.username ??
    post.authorId;

  return (
    <article className={`flex gap-4 items-stretch ${mcButton}`}>
      {/* Venstre kolonne: likes/dislikes */}
      <div className="flex flex-col gap-2 justify-around">
        <button
          type="button"
          aria-label={`Lik (${post.likes})`}
          className={`${slotStyle} hover:bg-green-500`}
        >
          <img
            src="/assets/icons/svg/Like.svg"
            alt=""
            className="h-full w-full object-contain [image-rendering:pixelated]"
          />
          <span className={stackCount}>{post.likes}</span>
        </button>
        <button
          type="button"
          aria-label={`Mislik (${post.dislikes})`}
          className={`${slotStyle} hover:bg-red-500`}
        >
          <img
            src="/assets/icons/svg/Dislike.svg"
            alt=""
            className="h-full w-full object-contain [image-rendering:pixelated]"
          />
          <span className={stackCount}>{post.dislikes}</span>
        </button>
      </div>

      {/* Midtkolonne: author + tittel + innhold */}
      <div className="flex w-full flex-col gap-2">
        {/* Øverste linje: author + realm */}
        <div className="flex justify-between items-center text-xs text-[#E0E0E0]">
          <span>
            Author:{" "}
            <span className="text-white">
              {authorName}
            </span>
          </span>
          <span className="italic">
            realm/{realmName}
          </span>
        </div>

        {/* Tittel-boks (liten, dented, litt mørkere) */}
        <div
          className="
            rounded
            bg-[#5A5A5A]
            px-3 py-2
            border border-black
            shadow-[inset_2px_2px_0_#3C3C3C,inset_-2px_-2px_0_#777777]
          "
        >
          <h3 className="m-0 text-sm uppercase tracking-wide text-[#FFFFAA]">
            {post.title}
          </h3>
        </div>

        {/* Innholds-boks (større, dented) */}
        <div
          className="
            rounded
            bg-[#555555]
            px-3 py-3
            border border-black
            shadow-[inset_2px_2px_0_#3C3C3C,inset_-2px_-2px_0_#777777]
          "
        >
          <p className="m-0 text-sm leading-relaxed text-white">
            {post.content}
          </p>
        </div>
      </div>

      {/* Høyre kolonne: knapp til realm */}
      <div className="flex flex-col justify-center gap-2">
        <button
          type="button"
          aria-label={`Gå til riket (${post.realmId})`}
          className={
            "h-32 w-32 shrink-0 bg-[#8B8B8B] p-1 cursor-pointer " +
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
      </div>
    </article>
  );
};
