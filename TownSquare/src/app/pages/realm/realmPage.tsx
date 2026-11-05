"use client";

import { fetchRealm } from "@/features/realms/api/realms-api";
import { useState } from "react";
import { Realm } from "@/features/realms/types/Realm";
import { useFetch } from "@/features/utils/useFetch";
import RealmPostFeed from "@/features/posts/components/HomePage/PostsByRealm";
import { authClient } from "@/auth/config/auth-client";
import { CreatePostForm } from "@/features/posts/components/HomePage/CreatePostForm";
import type { Post } from "@/features/posts/types/Post";

type RealmPageProps = {
  realmId: string;
};

export const RealmPage = ({ realmId }: RealmPageProps) => {
  const [postError, setPostError] = useState<string | null>(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [feedRefreshKey, setFeedRefreshKey] = useState(0);

  const { data: session } = authClient.useSession();
  const user = session?.user ?? null;

  const {
    data: realm,
    loading,
    error,
  } = useFetch<Realm | null>(
    () => fetchRealm(Number(realmId)),
    null,
    [realmId],
  );

  if (loading) {
    return (
      <div className="mt-8 text-center text-sm text-stone-700 font-serif">
        Loading realm...
      </div>
    );
  }

  if (error || !realm) {
    return (
      <div className="mt-8 text-center text-sm text-red-700 font-serif">
        {error || "Realm not found."}
      </div>
    );
  }

  const realmBoxStyle =
    "flex w-full items-start gap-5 px-5 py-4 " +
    "bg-[#6F6F6F] border-2 border-black rounded-none " +
    "shadow-[inset_2px_2px_0_#AAAAAA,inset_-2px_-2px_0_#4A4A4A] " +
    "font-['Pixelify_Sans'] text-white [text-shadow:2px_2px_0_#3F3F3F] " +
    "[image-rendering:pixelated] select-none";

  const realmSlotStyle =
    "h-16 w-16 shrink-0 bg-[#8B8B8B] p-1 " +
    "shadow-[inset_2px_2px_0_#373737,inset_-2px_-2px_0_#FFFFFF]";

  const handlePostCreated = (_post: Post) => {
    // 2) Skjul skjemaet
    setShowCreatePost(false);
    // Nullstill eventuell feilmelding
    setPostError(null);
    // 2) Tving RealmPostFeed til å refetche ved å endre key
    setFeedRefreshKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col items-center mt-8 px-4 gap-4">
      {/* Plain container (no tavern bg) */}
      <section className="w-full max-w-4xl">
        {/* Realm info box styled like UserCard */}
        <div className={realmBoxStyle}>
          {/* Left: icon slot */}
          <div className={realmSlotStyle}>
            <img
              src="/assets/icons/svg/Golden_Crown.svg"
              alt="Realm icon"
              className="h-full w-full object-contain [image-rendering:pixelated]"
            />
          </div>

          {/* Middle: name, description, info, rules */}
          <div className="min-w-0 flex-1">
            <h1 className="m-0 truncate text-2xl uppercase tracking-wide text-[#FFFF55] [text-shadow:2px_2px_0_#3F3F15]">
              {realm.name}
            </h1>

            <p className="mt-1 text-xs text-[#E0E0E0]">
              Realm overview · created for adventurers and builders
            </p>

            <div className="mt-3 rounded bg-[#5E5E5E]/70 px-3 py-2">
              <h2 className="mb-1 text-[10px] uppercase tracking-widest text-[#E0E0E0]">
                Description
              </h2>
              <p className="m-0 text-sm text-white">
                {realm.description ||
                  "No description has been set for this realm yet."}
              </p>
            </div>

            <div className="mt-3 flex flex-col gap-2 md:flex-row">
              <div className="flex-1 rounded bg-[#5E5E5E]/70 px-3 py-2">
                <h3 className="mb-1 text-[10px] uppercase tracking-widest text-[#E0E0E0]">
                  Realm info
                </h3>
                <ul className="m-0 list-none space-y-1 text-sm text-white">
                  <li>
                    <span className="text-[#E0E0E0]">Members:</span>{" "}
                    <span>
                      Member count: {/* realm.memberCount ?? 0 */}
                    </span>
                  </li>
                  <li>
                    <span className="text-[#E0E0E0]">Created:</span>{" "}
                    <span>
                      {realm.createdAt
                        ? new Date(realm.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </li>
                  <li>
                    <span className="text-[#E0E0E0]">Realm level:</span>{" "}
                    <span>
                      Level: {/* realm.level ?? 1 */}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex-1 rounded bg-[#5E5E5E]/70 px-3 py-2">
                <h3 className="mb-1 text-[10px] uppercase tracking-widest text-[#E0E0E0]">
                  Tavern rules
                </h3>
                <p className="m-0 text-sm text-white leading-relaxed">
                  Keep chat friendly, no griefing, and respect other builders.
                  This realm is meant to feel like an old Minecraft server
                  tavern: trade, talk, and show off your builds without ruining
                  the fun for others.
                </p>
              </div>
            </div>
          </div>

          {/* Right: level block */}
          <div className="flex min-w-16 flex-col items-center">
            <span className="text-[10px] tracking-widest text-[#E0E0E0]">
              LEVEL
            </span>
            <strong className="text-2xl font-normal text-[#80FF20] [text-shadow:2px_2px_0_#203F08]">
              {/* realm.level ?? 1 */}
              1
            </strong>
          </div>
        </div>
      </section>

      {postError && (
        <div className="w-full max-w-4xl text-sm text-red-400 mb-1">
          {postError}
        </div>
      )}

      <section className="w-full max-w-4xl">
        <div className="mb-2 flex justify-end">
          <button
            type="button"
            onClick={() => setShowCreatePost((prev) => !prev)}
            className="
              rounded
              border border-white
              bg-[#4A4A4A]
              px-3 py-1
              text-xs
              font-semibold
              text-white
              hover:bg-[#6F6F6F]
            "
          >
            {showCreatePost ? "Close post form" : "New post"}
          </button>
        </div>

        {/* 1) Skjuler/viser uten å unmount'e, så input beholdes */}
        <div className={showCreatePost ? "block" : "hidden"}>
          <CreatePostForm
            user={user}
            realmId={Number(realmId)}
            onErrorChange={setPostError}
            onPostCreated={handlePostCreated}
          />
        </div>
      </section>

      <section className="w-full max-w-4xl">
        <RealmPostFeed key={feedRefreshKey} realmId={Number(realmId)} />
      </section>
    </div>
  );
};
