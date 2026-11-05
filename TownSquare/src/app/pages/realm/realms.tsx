"use client";

import React, { useEffect, useState } from "react";
import { Realm } from "@/features/realms/types/Realm";
import { listRealms } from "@/features/realms/api/realms-api";
import { authClient } from "@/auth/config/auth-client";
import { RealmsList } from "@/features/realms/components/RealmsList";
import { useFetch } from "@/features/utils/useFetch";

export const Realms = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const { data: realms, loading, error } = useFetch(listRealms, []);

  return (
    <>
      <h1>Realms</h1>

      {loading && <p>Loading realms...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <RealmsList realms={realms} />
    </>
  );
};
