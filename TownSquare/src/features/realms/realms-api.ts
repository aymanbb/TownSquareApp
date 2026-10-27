import type { Realm } from "./types/Realm";
import type { Result } from "./types/Result";

export async function listRealms(): Promise<Result<Realm[]>> {
  try {
    const response = await fetch("/api/v1/realms");

    const body = (await response.json()) as Result<Realm[]>;

    return body;
  } catch (e: any) {
    console.error(e);
    return {
      success: false,
      error: {
        message:
          e.error.message,
        code: e.error.code,
      },
    };
  }
}

export async function fetchRealm(_id: number): Promise<Result<Realm>> {
  try {
    const response = await fetch(`api/v1/realms/${_id}`);

    const body = (await response.json()) as Result<Realm>;

    return body;
  } catch (e: any) {
    return {
      success: false,
      error: {
        message:
          e.error.message,
        code: e.error.code,
      }
    }
  }
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
