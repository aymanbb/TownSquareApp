"use client";

import React, { useEffect, useState } from "react";
import type { Realm } from "@/features/realms/types/Realm";
import { authClient } from "@/auth/config/auth-client";
import { RealmsCardButton } from "./RealmsListCardButton";
import { checkFollow } from "@/features/realms/api/realms-api";

type RealmsListCardProps = {
  realm: Realm;
};

export const RealmsListCard: React.FC<RealmsListCardProps> = ({ realm }) => {
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;
  const [followStatus, setFollowStatus] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) {
      // Ikke logge error her om du ikke vil støy ved ikke-innlogget bruker
      return;
    }

    const run = async () => {
      try {
        const status = await checkFollow(userId, String(realm.id));
        setFollowStatus(status);
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Failed to check follow status";
        console.error(message);
        setFollowStatus(false);
      }
    };

    void run();
  }, [userId, realm.id]);

  console.log("Rendering RealmsListCard for realm", realm.id);

  return (
    <article
      className="
        flex 
        items-center 
        justify-between 
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

      <RealmsCardButton
        userId={userId}
        realmId={String(realm.id)}
        followStatus={followStatus}
      />
    </article>
  );
};
