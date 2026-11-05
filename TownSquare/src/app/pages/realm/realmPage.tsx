"use client";

import { fetchRealm } from "@/features/realms/api/realms-api";
import { useEffect } from "react";
import { Realm } from "@/features/realms/types/Realm";
import { useFetch } from "@/features/utils/useFetch";

type RealmPageProps = {
  realmId: string;
};

export const RealmPage = ({ realmId }: RealmPageProps) => {
  const {
    data: realm,
    loading,
    error,
  } = useFetch<Realm | null>(() => fetchRealm(Number(realmId)), null);

  useEffect(() => {
    // reserved for future side-effects on realm change
  }, [realmId]);

  if (loading) {
    return (
      <div className="mt-8 text-center text-sm text-stone-700 font-serif">
        Loading realm...
      </div>
    );
  }

  if (error || !realm) {
    return (
      <div className="mt-8 text-center text-sm text-red-700 font-serif">
        {error || "Realm not found."}
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-8 px-4">
      <section
        className="
          w-full max-w-4xl
          bg-[url('/assets/textures/png/toown_tavern.png')]
          bg-no-repeat
          bg-cover
          bg-center
          border border-stone-700
          rounded-lg
          text-stone-900
          font-serif
        "
      >
        {/* Header – gray strip */}
        <header className="border-b border-stone-500 bg-stone-200/80 px-4 py-3 rounded-t-lg">
          <h1 className="text-xl font-bold tracking-wide text-stone-900">
            {realm.name}
          </h1>
          <p className="mt-1 text-xs text-stone-700">
            Realm overview · created for adventurers and builders
          </p>
        </header>

        <div className="px-4 py-4">
          {/* Description box – semi-transparent gray */}
          <div className="mb-4 rounded border border-stone-500 bg-stone-200/70 px-3 py-3">
            <div className="mb-2 flex items-center gap-2 border-b border-stone-400 pb-1">
              <span className="text-xs uppercase tracking-wide text-stone-800">
                Description
              </span>
            </div>
            <p className="text-sm leading-relaxed text-stone-900">
              {realm.description ||
                "No description has been set for this realm yet."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-4">
            {/* Left: stats */}
            <aside className="rounded border border-stone-500 bg-stone-200/70 px-3 py-3">
              <h2 className="mb-2 text-xs uppercase tracking-wide text-stone-800">
                Realm info
              </h2>
              <ul className="text-sm space-y-1 text-stone-900">
                <li>
                  <span className="text-stone-700">Members:</span>{" "}
                  <span className="text-stone-900">
                    Member count: {/* realm.memberCount ?? 0 */}
                  </span>
                </li>
                <li>
                  <span className="text-stone-700">Created:</span>{" "}
                  <span className="text-stone-900">
                    {realm.createdAt
                      ? new Date(realm.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </span>
                </li>
                <li>
                  <span className="text-stone-700">Realm level:</span>{" "}
                  <span className="text-stone-900">
                    Level: {/* realm.level ?? 1 */}
                  </span>
                </li>
              </ul>
            </aside>

            {/* Right: rules */}
            <section className="rounded border border-stone-500 bg-stone-200/70 px-3 py-3">
              <h2 className="mb-2 text-xs uppercase tracking-wide text-stone-800">
                Tavern rules
              </h2>
              <p className="text-sm text-stone-900 leading-relaxed">
                Keep chat friendly, no griefing, and respect other builders.
                This realm is meant to feel like an old Minecraft server tavern:
                trade, talk, and show off your builds without ruining the fun
                for others.
              </p>
            </section>
          </div>
        </div>

        {/* Footer – gray strip */}
        <footer className="flex justify-end gap-2 border-t border-stone-500 bg-stone-200/80 px-4 py-3 rounded-b-lg">
          <button
            type="button"
            className="
              rounded
              border border-stone-600
              bg-stone-100/90
              px-3 py-1
              text-xs
              font-semibold
              text-stone-900
              hover:bg-stone-200
              hover:border-stone-800
            "
            onClick={() => {
              window.location.href = "/realms";
            }}
          >
            Back to realms list
          </button>
        </footer>
      </section>
    </div>
  );
};
