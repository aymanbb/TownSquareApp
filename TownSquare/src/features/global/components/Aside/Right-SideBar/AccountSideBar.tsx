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
        className="flex h-screen w-full flex-col gap-y-6 relative overflow-hidden
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
      </div>
    </div>
  );
};
