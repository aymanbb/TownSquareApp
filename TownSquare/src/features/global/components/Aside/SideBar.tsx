"use client";
import React, { useState } from "react";
import { MyRealmList } from "./sideBar-content/MyRealmList";

export const SideBar = () => {
  const [myReamls, setMyRealms] = useState([]);

  return (
    <>
      <h2 className="mb-3 text-lg font-semibold">Thy realms</h2>

      <button
        type="button"
        onClick={() => console.log("Create realm")}
        className="w-full bg-neutral-200 px-2 py-2 text-sm hover:bg-neutral-100"
      >
        Create new realm
      </button>
      <MyRealmList />
    </>
  );
};
