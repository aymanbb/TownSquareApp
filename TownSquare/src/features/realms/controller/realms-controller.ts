import { Realm } from "../types/Realm";
import { realmsService, RealmsService } from "../service/realms-service";
import { Result } from "../types/Result";

export interface RealmsController {
  list(): Promise<Response>;
  create(realmForm: Partial<Realm>): Promise<Response>;
}

function createRealmsController(service: RealmsService): RealmsController {
  return {
    async list() {
        try {
          const realmsList = await realmsService.list();
          
          const result: Result<Realm[]> = {
            success: true,
            data: realmsList,
          };

          return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
              "Content-Type": "application/json"
            },
          });
        } 
        catch(e) {
          console.log(e);

          const errorResult: Result<Realm[]> = {
            success: false,
            error: {
              message: "Oops, something went wrong (controller.list)",
              code: 500,
            },
          };

          return new Response(JSON.stringify(errorResult), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
    },

    async create(realmForm) {
      // ta ut bruker-id fra ctx

      // autorisering av bruker blir håndtert av en interruptor i realmRoutes.ts

      try {
        const result = await realmsService.create(realmForm)

        if (result && !result.success) {
          const { message, code } = result.error;
          return new Response(JSON.stringify({ error: message }), {
            status: code || 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify(result), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        })
      }
      catch (error) {
        console.error(error);

        const errorResult: Result<Realm> = {
          success: false,
          error: {
            message:
              "Oops, something went wrong. (controller.create)",
            code: 500,
          },
        };

        return new Response(JSON.stringify(errorResult), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    },
  };
}

export const realmsController = createRealmsController(realmsService);