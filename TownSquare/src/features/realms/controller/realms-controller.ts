import { Realm } from "../types/Realm";
import { realmsService, RealmsService } from "../service/realms-service";
import { Result } from "../types/Result";

export interface RealmsController {
  list(): Promise<Response>;
  create(_realmForm: Partial<Realm>): Promise<Response>;
}

function createRealmsController(_service: RealmsService): RealmsController {
  return {
    async list() {
      const result = await _service.list();

      return new Response(JSON.stringify(result), {
        status: result.success ? 200 : result.error.code,
        headers: { "Content-Type": "application/json" },
      }); 
    },

    async create(_realmForm) {
      // ta ut bruker-id fra ctx

      // autorisering av bruker blir håndtert av en interruptor i realmRoutes.ts

      const result = await _service.create(_realmForm);

      return new Response(JSON.stringify(result), {
        status: result.success ? 201 : result.error.code,
        headers: { "Content-Type": "application/json" },
      });
    },
  };
}

export const realmsController = createRealmsController(realmsService);