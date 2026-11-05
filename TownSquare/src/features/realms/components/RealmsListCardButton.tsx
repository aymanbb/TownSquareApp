import React from "react";
import { followRealm } from "@/features/realms/api/realms-api";

type ButtonProps = {
  userId: string | undefined;
  realmId: string;
  followStatus: boolean;
};

export const RealmsCardButton: React.FC<ButtonProps> = ({
  followStatus,
  realmId,
  userId,
}) => {
  function handleVisitRealm() {
    // Hvis brukeren allerede følger, la dem besøke selv om userId ikke er satt her
    if (!followStatus) return;
    window.location.href = `/realms/${realmId}`;
  }

  function handleJoinRealm() {
    void (async () => {
      if (!userId) {
        console.error("User must be logged in to join a realm");
        return;
      }

      try {
        await followRealm(userId, realmId);
        console.log("Joined!");
        window.location.href = `/realms/${realmId}`;
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Failed to follow realm";
        console.error(message);
        // Evt. vis toast/alert her
      }
    })();
  }

  const baseClass =
    "ml-4 whitespace-nowrap rounded-lg border border-amber-300 " +
    "bg-black/70 px-3 py-1 text-xs font-semibold text-amber-300 " +
    "hover:bg-black hover:border-amber-200";

  return followStatus ? (
    <button type="button" onClick={handleVisitRealm} className={baseClass}>
      Visit realm
    </button>
  ) : (
    <button type="button" onClick={handleJoinRealm} className={baseClass}>
      Join realm
    </button>
  );
};
