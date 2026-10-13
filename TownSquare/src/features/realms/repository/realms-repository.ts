import { Realm } from "../types/Realm";
import { Result } from "../types/Result";

const realms: Realm[] = [
    {
        id: 1,
        name: "Realm 1",
        description: "Cool realm",
        ownerId: 3,
        createdAt: "Yesterday",
        //posts: Post[]
    },
    {
        id: 2,
        name: "Realm 2",
        description: "Ok realm",
        ownerId: 1,
        createdAt: "Today",
        //posts: Post[]
    },
    {
        id: 3,
        name: "Realm 3",
        description: "Cool realm",
        ownerId: 2,
        createdAt: "Today",
        //posts: Post[]
    },
]

export interface RealmsRepository {
    //create: (realm: any) => Promise<any>;
    list: () => Promise<Realm[]>;
    create: (realm: Partial<Realm>) => Promise<Result<Realm>>;
}

export function createRealmsRepository(db: Realm[]): RealmsRepository {
    return {
        list: async () => {
            return db;
        },
        create: async (realmForm) => {
            if (!realmForm.name || realmForm.ownerId == null) {
                return {
                    success: false,
                    error: {
                        message: "Name and ownerId are required." + realmForm,
                        code: 400,
                    },
                };
            }

            // for testing, når nye realm-en blir lagt inn i databasen så blir realm-ID ordnet av AUTO_INCREMENT
            const lastRealm = db.at(-1);
            const nextId = lastRealm ? lastRealm.id + 1 : 1;

            const newRealm : Realm = {
                id: nextId,
                name: realmForm.name,
                description: realmForm.description ?? "",
                ownerId: realmForm.ownerId,
                createdAt: new Date().toISOString(),
            };

            db.push(newRealm);

            return {
                success: true,
                data: newRealm,
            };
        },
    };
}

export const realmsRepository = createRealmsRepository(realms);

