import { User } from "@/features/auth/types/User";
import { Result } from "@/features/utils/Result";

export async function getUser(id: string): Promise<Partial<User>> {
  const res = await fetch(`/api/v1/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const result: Result<Partial<User>> = await res.json();

  if (!result.success) {
    throw new Error(result.error?.message || "Kunne ikke hente bruker");
  }

  return result.data!;
}

export async function getUserByName(name: string): Promise<Partial<User>> {
  const res = await fetch(`/api/v1/users/name/${encodeURIComponent(name)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user by name");
  }

  const result: Result<Partial<User>> = await res.json();

  if (!result.success) {
    throw new Error(result.error?.message || "Kunne ikke hente bruker");
  }

  return result.data!;
}

export async function listUsers(): Promise<Partial<User>[]> {
  const res = await fetch(`/api/v1/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const result: Result<Partial<User>[]> = await res.json();

  if (!result.success) {
    throw new Error(result.error?.message || "Kunne ikke hente brukere");
  }

  return result.data || [];
}
