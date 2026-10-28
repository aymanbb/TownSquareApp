"use client";

import React from "react";
import type { Realm } from "@/features/realms/types/Realm";
import { followRealm } from "../realms-api";
import { authClient } from "@/auth/config/auth-client";

type RealmsListCardProps = {
  realm: Realm;
};

export const RealmsListCard: React.FC<RealmsListCardProps> = ({ realm }) => {
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;

  function handleJoinRealm() {
    void (async () => {
      if (!userId) return;

      const result = await followRealm(userId, String(realm.id));

      if (!result.success) {
        console.error(result.error.message);
        return;
      } 
      if (result.success) {
        console.log("Joined!");
        return;
      }
    })();

    //window.location.href = `/realms/${realm.id}`;
  }

  return (
    <article
      className="
        flex items-center justify-between
        w-full
        bg-[url('/assets/textures/png/brick-texture.png')]
        bg-repeat bg-[length:70px_70px]
        p-3
        rounded-xl
        border-2 border-slate-700
        shadow-lg
        text-slate-100
        font-serif
      "
    >
      <div className="min-w-0">
        <h2 className="m-0 text-lg tracking-wide uppercase text-amber-300 drop-shadow-md">
          {realm.name}
        </h2>
        <p className="mt-2 mb-0 text-sm leading-relaxed">
          {realm.description}
        </p>
      </div>

      <button
        type="button"
        onClick={handleJoinRealm}
        className="
          ml-4
          whitespace-nowrap
          rounded-lg
          border border-amber-300
          bg-black/70
          px-3 py-1
          text-xs
          font-semibold
          text-amber-300
          hover:bg-black
          hover:border-amber-200
        "
      >
        Join realm
      </button>
    </article>
  );
};
