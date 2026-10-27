"use client";

import React from "react";
import type { Realm } from "@/features/realms/types/Realm";

type RealmsListCardProps = {
  realm: Realm;
};

export const RealmsListCard: React.FC<RealmsListCardProps> = ({ realm }) => {
  return (
    <article
      className="
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
      <h2 className="m-0 text-lg tracking-wide uppercase text-amber-300 drop-shadow-md">
        {realm.name}
      </h2>
      <p className="mt-2 mb-0 text-sm leading-relaxed">
        {realm.description}
      </p>
    </article>
  );
};
