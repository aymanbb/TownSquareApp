import type { Realm } from "../types/Realm";

// Henter alle realms
export async function listRealms(): Promise<Realm[]> {
  const res = await fetch("/api/v1/realms", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorBody = (await res.json()) as { message?: string };
    throw new Error(errorBody.message || "Kunne ikke hente realms");
  }

  return (await res.json()) as Realm[];
}

// Henter ett realm
export async function fetchRealm(_id: number): Promise<Realm> {
  const res = await fetch(`/api/v1/realms/${_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorBody = (await res.json()) as { message?: string };
    throw new Error(errorBody.message || "Kunne ikke hente realms");
  }

  return (await res.json()) as Realm;
}

// Oppretter et nytt realm
export async function createRealm(
  _realmForm: Partial<Realm>,
): Promise<Realm> {
  const res = await fetch("/api/v1/realms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(_realmForm),
  });

  if (!res.ok) {
    const errorBody = (await res.json()) as { message?: string };
    throw new Error(errorBody.message || "Kunne ikke opprette realm");
  }

  return (await res.json()) as Realm;
}

// Følger et realm
export async function followRealm(
  _userId: string,
  _realmId: string,
): Promise<void> {
  const res = await fetch(`/api/v1/realms?followRealm=${_realmId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: _userId }),
  });

  if (!res.ok) {
    const errorBody = (await res.json()) as { message?: string };
    throw new Error(errorBody.message || "Failed to follow realm");
  }
}

// Sjekker om bruker følger et realm
export async function checkFollow(
  userId: string,
  realmId: string,
): Promise<boolean> {
  const res = await fetch(`/api/v1/realms/check-follow?realmId=${realmId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) {
    const err = (await res.json()) as { message?: string };
    throw new Error(err.message || "Failed to check follow status");
  }

  const body = (await res.json()) as { isFollowing: boolean };
  return body.isFollowing;
}
