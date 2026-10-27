import { route } from "rwsdk/router";
import { realmsController } from "./controller/realms-controller";
import { Realm } from "./types/Realm";

export const realmRoutes = [

    route("/api/v1/realms", {
        get: async () => {
            return realmsController.list();
        },
        post: async ({ request }) => {
            const realmForm: Partial<Realm> = await request.json();
            return realmsController.create(realmForm);
        }
    }),

    route("/api/v1/realms/:realmId", async ({ params }) => {
        //const id: number = await request.json();
        return realmsController.get(Number(params.realmId));
    }),
]