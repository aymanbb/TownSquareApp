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
        className="w-full bg-blue-200 px-2 py-2 text-sm hover:bg-neutral-100"
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