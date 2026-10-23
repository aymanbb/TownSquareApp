import { Realm } from "../types/Realm";
import { realmsService, RealmsService } from "../service/realms-service";
import { Result } from "../types/Result";

export interface RealmsController {
  list(): Promise<Realm[] | undefined>;
  create(realmForm: Partial<Realm>): Promise<Response>;
}

function createRealmsController(service: RealmsService): RealmsController {
  return {
    async list() {
        try {
            const realmsList = await realmsService.list();
            if (realmsList.length === 0) {
                return [];
            }
            return realmsList;
        }
        catch(e) {
            console.log(e);
        }
    },

    async create(realmForm) {
      // ta ut bruker-id fra ctx

      // autorisering av bruker blir håndtert av en interruptor i realmRoutes.ts

      try {
        const result = await realmsService.create(realmForm)

        if (result !== undefined && !result.success) {
          const { error } = result;
          const { message, code } = error;
          return new Response(JSON.stringify({ error: message }), {
            status: code || 500,
            headers: { "Content-Type": "application/json" },
          })
        }

        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      }
      catch (error) {
        console.error(error);

        return new Response(
          JSON.stringify({
            error: "Oops, something went wrong. Please try again later."
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        )
      }
    }
  }
}

export const realmsController = createRealmsController(realmsService);