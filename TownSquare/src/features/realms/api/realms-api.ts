import type { Realm } from "../types/Realm";
import type { Result } from "../types/Result";

export async function listRealms(): Promise<Realm[]> {
  try {
    const response = await fetch("/api/v1/realms");

    const result: Result<Realm[]> = await response.json();
    if (!result.success) {
      throw new Error(result.error?.message || "Kunne ikke hente realms");
    }
    return result.data ?? [];
  } catch (e: any) {
    console.error(e);
    return [];
  }
}

export async function fetchRealm(_id: number): Promise<Realm> {
  const response = await fetch(`/api/v1/realms/${_id}`);

  const result: Result<Realm> = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || "Kunne ikke hente realms");
  }

  return result.data!;
}

export async function createRealm(
  _realmForm: Partial<Realm>,
): Promise<Result<Realm>> {
  try {
    const response = await fetch("/api/v1/realms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(_realmForm),
    });

    const body = (await response.json()) as Result<Realm>;

    return body;
  } catch (e: any) {
    console.error(e);
    return {
      success: false,
      error: {
        message: e.error.message,
        code: e.error.code,
      },
    };
  }
}

export async function followRealm(
  _userId: string,
  _realmId: string,
): Promise<Result<void>> {
  try {
    const response = await fetch(`/api/v1/realms?followRealm=${_realmId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: _userId }),
    });
    if (!response.ok) {
      return {
        success: false,
        error: {
          code: response.status,
          message: "Failed to follow realm",
        },
      };
    }

    return { success: true, data: undefined };
  } catch (e: any) {
    console.error(e);
    return {
      success: false,
      error: {
        message: e.error.message,
        code: e.error.code,
      },
    };
  }
}
