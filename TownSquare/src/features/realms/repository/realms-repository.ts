import { Realm } from "../types/Realm";
import { db } from "@/db";
import { realm, userFollowsRealm } from "@/db/schema/realm-schema";
import { eq, and } from "drizzle-orm";

export interface RealmsRepository {
  list: () => Promise<Realm[]>;
  get: (_id: number) => Promise<Realm>;
  create: (realm: Partial<Realm>) => Promise<Realm>;
  follow: (_userId: string, _realmId: string) => Promise<void>;
  checkFollow: (_userId: string, _realmId: string) => Promise<boolean>;
}

function mapRealmRow(row: {
  id: number;
  name: string;
  description: string | null;
  owner_id: string;
  created_at: string;
}): Realm {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? "",
    ownerId: row.owner_id,
    createdAt: row.created_at,
  };
}

async function checkFollowImpl(
  _userId: string,
  _realmId: string,
): Promise<boolean> {
  const existing = await db
    .select()
    .from(userFollowsRealm)
    .where(
      and(
        eq(userFollowsRealm.user_id, _userId),
        eq(userFollowsRealm.realm_id, _realmId),
      ),
    )
    .get();

  return !!existing;
}

function createRealmsRepository(): RealmsRepository {
  return {
    list: async () => {
      try {
        const rows = await db.select().from(realm).all();
        return rows.map(mapRealmRow);
      } catch (e) {
        console.error("RealmsRepository.list error:", e);
        throw new Error("Failed to list realms");
      }
    },

    get: async (_id) => {
      try {
        const row = await db
          .select()
          .from(realm)
          .where(eq(realm.id, _id))
          .get();

        if (!row) {
          throw new Error("Realm not found");
        }

        return mapRealmRow(row);
      } catch (e) {
        // Hvis det allerede er en Error (f.eks. "Realm not found"), behold meldingen.
        if (e instanceof Error) {
          console.error("RealmsRepository.get error:", e);
          throw e;
        }

        console.error("RealmsRepository.get unknown error:", e);
        throw new Error("Failed to get realm");
      }
    },

    create: async (realmForm) => {
      if (!realmForm.name) {
        // Valideringsfeil – spesifikk melding er fint her
        throw new Error("Name is required.");
      }

      try {
        const now = new Date().toISOString();

        const inserted = await db
          .insert(realm)
          .values({
            name: realmForm.name,
            description: realmForm.description ?? "",
            owner_id: String(realmForm.ownerId),
            created_at: now,
          })
          .returning()
          .get();

        return mapRealmRow(inserted);
      } catch (e) {
        console.error("RealmsRepository.create error:", e);
        throw new Error("Failed to create realm");
      }
    },

    follow: async (_userId, _realmId) => {
      try {
        // Check if already following
        const alreadyFollows = await checkFollowImpl(_userId, _realmId);
        if (alreadyFollows) {
          console.log(
            "RealmsRepository.follow: user already follows realm, skipping insert",
          );
          return;
        }

        const now = new Date().toISOString();

        await db
          .insert(userFollowsRealm)
          .values({
            user_id: _userId,
            realm_id: _realmId,
            created_at: now,
          })
          .returning()
          .get();
      } catch (e) {
        console.error("RealmsRepository.follow error:", e);
        throw new Error("Failed to follow realm");
      }
    },

    checkFollow: async (_userId, _realmId) => {
      try {
        return await checkFollowImpl(_userId, _realmId);
      } catch (e) {
        console.error("RealmsRepository.checkFollow error:", e);
        throw new Error("Failed to check follow status");
      }
    },
  };
}

export const realmsRepository = createRealmsRepository();
