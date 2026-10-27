"use client";
import React, { useState } from "react";
import { MyRealmList } from "./sideBar-content/MyRealmList";
import { ScrollView } from "@/features/global/components/ScrollView";

type RealmSideBarProps = {
  onCreateRealmClick: () => void;
};

export const RealmSideBar: React.FC<RealmSideBarProps> = ({
  onCreateRealmClick,
}) => {
  const [myRealms, setMyRealms] = useState([]);

  return (
    <>
      <h2 className="mb-3 text-lg font-semibold">Thy realms</h2>

      <button
        type="button"
        onClick={onCreateRealmClick}
        className="w-full rounded px-3 py-1 text-white
    bg-gray-500 bg-cover [image-rendering:pixelated]
    font-['MinecraftiaRegular']
    border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#565656] border-b-[#565656]
    text-shadow-[3px_3px_#4C4C4C]
    outline-2 outline-solid outline-black
    px-4 py-2 text-white
    hover:bg-blue-400"
      >
        Create new realm
      </button>
      <ScrollView className="h-[500px]">
        <MyRealmList />
      </ScrollView>
    </>
  );
};

export const SideBar = RealmSideBar;