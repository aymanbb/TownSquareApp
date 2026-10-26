// src/features/realms/realms-api.ts
import type { Realm } from "./types/Realm";
import type { Result } from "./types/Result";

export async function listRealms(): Promise<Result<Realm[]>> {
  try {
    const response = await fetch("/api/realms/list");

    const body = (await response.json()) as Result<Realm[]>;

    // If server already sent { success, data }, just return it
    return body;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: {
        message:
          "Fikk ikke kontakt med serveren eller noe er feil med spørringen",
        code: 500,
      },
    };
  }
}

export async function createRealm(
  realmForm: Partial<Realm>,
): Promise<Result<Realm>> {
  try {
    const response = await fetch("/api/realms/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(realmForm),
    });

    const body = (await response.json()) as Result<Realm>;

    return body;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: {
        message: "Fikk ikke kontakt med serveren",
        code: 500,
      },
    };
  }
}
