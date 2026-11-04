import { Realm } from "../types/Realm";
import { realmsService, RealmsService } from "../service/realms-service";

export interface RealmsController {
  list(): Promise<Response>;
  get(_id: number): Promise<Response>;
  create(_realmForm: Partial<Realm>): Promise<Response>;
  follow(_userId: string, _realmId: string): Promise<Response>;
  checkFollow(_userId: string, _realmId: string): Promise<Response>;
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

    async get(_id) {
      const result = await _service.get(_id);

      return new Response(JSON.stringify(result), {
        status: result.success ? 200 : result.error.code,
        headers: { "Content-Type": "application/json" },
      });
    },

    async create(_realmForm) {
      const result = await _service.create(_realmForm);

      return new Response(JSON.stringify(result), {
        status: result.success ? 201 : result.error.code,
        headers: { "Content-Type": "application/json" },
      });
    },

    async follow(userId: string, realmId: string) {
      const result = await _service.follow(userId, realmId);

      return new Response(JSON.stringify(result), {
        status: result.success ? 200 : result.error.code,
        headers: { "Content-Type": "application/json" },
      });
    },

    async checkFollow(_userId: string, _realmId: string) {
      const follows = await _service.checkFollow(_userId, _realmId);

      // Return raw boolean JSON
      return new Response(JSON.stringify({ follows }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
  };
}

export const realmsController = createRealmsController(realmsService);
