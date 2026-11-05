// src/features/utils/useFetch.ts
"use client";
import { useEffect, useState } from "react";

export function useFetch<T>(
  fetcher: () => Promise<T>,
  initial: T,
  deps: unknown[] = [],
) {
  // En custom hook som abtraherer fetching-logikk for API-kall,
  // håndterer loading, error og data state.
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false; // unngår setState hvis komponenten er borte
    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => !cancelled && setData(result))
      .catch(
        (e) =>
          !cancelled &&
          setError(e instanceof Error ? e.message : "Noe gikk galt"),
      )
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, deps);

  return { data, loading, error };
}
