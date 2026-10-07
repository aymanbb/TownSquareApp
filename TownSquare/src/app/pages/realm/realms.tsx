"use client";

import React, { useEffect, useState } from "react";
import { Realm } from "@/features/realms/types/Realm";
import { RealmsService, realmsService } from "@/features/realms/service/realms-service";
import { realmsController } from "@/features/realms/controller/realms-controller";

/*
type RealmProps = {
  realms: Realm[]
};
*/

// This is a placeholder for the Realms page. You can replace this with your actual Realms page content.
export const Realms = () => {
  const [data, setData] = useState<Realm[]| undefined>([])

  useEffect(() => {
    async function loadRealms() {
      try {
        const realmsList = await realmsController.list();
        setData(realmsList);
      } 
      finally {
        if (data?.length === 0) {
          return;
        }
      }
    }
    loadRealms();
  }, []);

  return (
    <>
      <h1>Realms</h1>
      <ul>
        {data?.map((realm) => (
          <li key={realm.id}>
            Name: {realm.name} - 
            Description: {realm.description} - 
            Created at: {realm.createdAt} - 
            Owner ID: {realm.ownerId}
          </li>
        ))}
      </ul>
    </>
  );
};
