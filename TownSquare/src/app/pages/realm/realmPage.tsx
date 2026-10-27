"use client";

import { listRealms, createRealm, fetchRealm } from "@/features/realms/realms-api";
import { useEffect, useState } from "react";
import { Realm } from "@/features/realms/types/Realm";

type RealmPageProps = {
  realmId: string;
};

export const RealmPage = ({ realmId }: RealmPageProps) => {
  const [realm, setRealm] = useState<Realm>();
  
  useEffect(() => {
    async function loadRealm() {
      const realm = await fetchRealm(Number(realmId));

      if (realm.success) {
        setRealm(realm.data);
      }
    }
    loadRealm();
  }, []);

  return (
    <>
      <h1>Realm</h1>
      <p>Realm name: {realm?.name}</p>
      <p>Description: {realm?.description}</p>
    </>
  );
};
