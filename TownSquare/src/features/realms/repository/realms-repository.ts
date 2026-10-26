import { Realm } from "../types/Realm";
import { Result } from "../types/Result";
import { db } from "@/db";
import { realm } from "@/db/schema/realm-schema";
import { authClient } from "@/auth/config/auth-client";
import { eq } from "drizzle-orm";

export interface RealmsRepository {
    list: () => Promise<Realm[]>;
    create: (realm: Partial<Realm>) => Promise<Realm>;
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

function createRealmsRepository(): RealmsRepository {
    return {
        list: async () => {
            try {
                const rows = await db.select().from(realm).all();
                console.log("ROWS: ", rows);
                console.log(rows.map(mapRealmRow));
                return rows.map(mapRealmRow);
            } catch (e) {
                console.error("Repository error (list): ", e);
                throw e;
            }
        },

        create: async (realmForm) => {
            if (!realmForm.name) {
                throw new Error("Name is required.")
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
                console.error("Repository error (create): ", e);
                throw e;
            }
        },
    };
}

export const realmsRepository = createRealmsRepository();