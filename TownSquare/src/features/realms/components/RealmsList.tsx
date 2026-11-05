"use client";

import React from "react";
import type { Realm } from "@/features/realms/types/Realm";
import { RealmsListCard } from "./RealmsListCard";

type RealmsListProps = {
  realms: Realm[];
};

export const RealmsList: React.FC<RealmsListProps> = ({ realms }) => {
  if (!realms.length) {
    return <p className="text-slate-200 mt-4 mx-4">No realms yet.</p>;
  }

  return (
    <section className="flex flex-col gap-3 w-full mt-4 sm:px-4"
    >
      {realms.map((realm) => (
        <RealmsListCard key={realm.id} realm={realm} />
      ))}
    </section>
  );
};
