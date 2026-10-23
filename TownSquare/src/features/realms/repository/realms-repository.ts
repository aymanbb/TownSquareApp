import { Realm } from "../types/Realm";
import { Result } from "../types/Result";
import { db } from "../../../db/index";
import { realm } from "@/db/schema/realm-schema";

export interface RealmsRepository {
    list: () => Promise<Realm[]>;
    create: (realm: Partial<Realm>) => Promise<Result<Realm>>;
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
            const rows = await db.select().from(realm).all();
            console.log("ROWS: ", rows);
            console.log(rows.map(mapRealmRow));
            return rows.map(mapRealmRow);
        },

        create: async (realmForm) => {
            if (!realmForm.name || realmForm.ownerId == null) {
                return {
                    success: false,
                    error: {
                        message: "Name and ownerId are required.",
                        code: 400,
                    },
                };
            }

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

            const newRealm = mapRealmRow(inserted);

            return {
                success: true,
                data: newRealm,
            };
        },
    };
};

export const realmsRepository = createRealmsRepository();