"use client";

import {
  listRealms,
  createRealm,
  fetchRealm,
} from "@/features/realms/api/realms-api";
import { useEffect, useState } from "react";
import { Realm } from "@/features/realms/types/Realm";
import { useFetch } from "@/features/utils/useFetch";

type RealmPageProps = {
  realmId: string;
};

export const RealmPage = ({ realmId }: RealmPageProps) => {
  //const [realm, setRealm] = useState<Realm>();

  const {
    data: realm,
    loading,
    error,
  } = useFetch<Realm | null>(() => fetchRealm(Number(realmId)), null);

  useEffect(() => {
    // Vi ønsker å trigge rerende når realmId endres, selv om useFetch håndterer datahenting internt.
    // Dette kan gjøres ved å oppdatere en lokal state eller bare la useEffect kjøre på realmId endring.
  }, [realmId]);
  //const realm = data;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <h1>Realm</h1>
      <p>Realm name: {realm?.name}</p>
      <p>Description: {realm?.description}</p>
    </>
  );
};
