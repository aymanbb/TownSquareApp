import React from "react";
import { AccountTab } from "./sidebar-content/AccountTab";
import { ActiveFriendsTab } from "./sidebar-content/ActiveFriendsTab";
import { TopPostsTab } from "./sidebar-content/TopPostsTab";
import { ScrollView } from "../../ScrollView";

export const AccountSideBar = () => {
  return (
    <div
      className="bg-[url('/assets/textures/png/brick-texture.png')]
    bg-repeat bg-[length:70px_70px]
    p-3
     "
    >
      <div
        className="flex h-screen w-full flex-col relative overflow-hidden
         shadow-[inset_0_0_4px_4px_rgba(0,0,0,0.85)]
        bg-[url('/assets/textures/png/brick-texture.png')]
        bg-repeat bg-[length:70px_70px]
        px-5 py-8 text-white
        sm:px-8
     "
      >
        <AccountTab />
        <TopPostsTab />
        <ActiveFriendsTab />

        <img
          src="/assets/textures/png/TowerDoor.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-20 left-1/2 h-40 max-h-[30vh] max-w-full -translate-x-1/2 object-contain object-bottom"
        />
      </div>
    </div>
  );
};
