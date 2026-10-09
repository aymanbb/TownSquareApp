import { Realm } from "../types/Realm";

const realms: Realm[] = [
    {
        id: "1",
        name: "Realm 1",
        description: "Cool realm",
        ownerId: "3",
        createdAt: "Yesterday",
        updatedAt: null,
        membersCount: 324,
        //posts: Post[]
    },
    {
        id: "2",
        name: "Realm 2",
        description: "Ok realm",
        ownerId: "1",
        createdAt: "Today",
        updatedAt: null,
        membersCount: 10,
        //posts: Post[]
    },
    {
        id: "3",
        name: "Realm 3",
        description: "Cool realm",
        ownerId: "2",
        createdAt: "Today",
        updatedAt: null,
        membersCount: 42,
        //posts: Post[]
    },
]

export interface RealmsRepository {
    //create: (realm: any) => Promise<any>;
    list: () => Promise<Realm[]>;
}

export function createRealmsRepository(db: typeof realms): RealmsRepository {
    return {
        list: async () => {
            return db;
        },
    };
}

export const realmsRepository = createRealmsRepository(realms);

