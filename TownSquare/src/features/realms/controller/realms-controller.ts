import { Realm } from "../types/Realm";
import { realmsService, RealmsService } from "../service/realms-service";
import type { RequestInfo } from "rwsdk/worker";

export interface RealmsController {
  list(): Promise<Realm[] | undefined>;
}

export function createRealmsController(service: RealmsService): RealmsController {

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
            return undefined;
        }
    }
  }
}

export const realmsController = createRealmsController(realmsService);