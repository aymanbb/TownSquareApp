"use client";

import React, { useEffect, useState } from "react";
import { Realm } from "@/features/realms/types/Realm";
import { listRealms } from "@/features/realms/realms-api";
import { authClient } from "@/auth/config/auth-client";
import { RealmsList } from "@/features/realms/components/RealmsList";
import { useRealms } from "@/features/realms/context/RealmsContext";

export const Realms = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const { realms, loading, error } = useRealms();

  return (
    <>
      <h1>Realms</h1>

      {loading && <p>Loading realms...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <RealmsList realms={realms} />
    </>
  );
};
