"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Realm } from "@/features/realms/types/Realm";
import type { Result } from "@/features/realms/types/Result";
import { listRealms } from "@/features/realms/api/realms-api";
import { useFetch } from "@/features/utils/useFetch";

type RealmsContextValue = {
  realms: Realm[];
  loading: boolean;
  error: string | null;
  addRealm: (realm: Realm) => void;
  refetch: () => Promise<void>;
};

const RealmsContext = createContext<RealmsContextValue | null>(null);

export function RealmsProvider({ children }: { children: ReactNode }) {
  const [realms, setRealms] = useState<Realm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadRealms() {
    setLoading(true);
    setError(null);
    try {
      setRealms(await listRealms());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kunne ikke hente realms");
      setRealms([]);
    } finally {
      setLoading(false);
    }
  }

  function addRealm(realm: Realm) {
    setRealms((prev) => [...prev, realm]);
  }

  const value: RealmsContextValue = {
    realms,
    loading,
    error,
    addRealm,
    refetch: loadRealms,
  };

  return (
    <RealmsContext.Provider value={value}>{children}</RealmsContext.Provider>
  );
}

export function useRealms() {
  const ctx = useContext(RealmsContext);
  if (!ctx) {
    throw new Error("useRealms must be used within a RealmsProvider");
  }
  return ctx;
}
