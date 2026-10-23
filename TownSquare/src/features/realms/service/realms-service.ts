import { Realm } from "../types/Realm";
import { realmsRepository, RealmsRepository } from "../repository/realms-repository";
import { Result } from "../types/Result";

export interface RealmsService {
  list():  Promise<Realm[]>;
  create(realmForm: Partial<Realm>): Promise<Result<Realm>>;
}

function createRealmsService(repository: RealmsRepository): RealmsService {
  return {
    async list() {
      const realms = await repository.list();
      return realms;
    },

    async create(realmForm: Partial<Realm>): Promise<Result<Realm>> {
      try {
          const result = await repository.create(realmForm);
          return result;
      }
      catch (e){
        console.error(e);
        return {
          success: false,
          error: {
            message: "Oops, something went wrong (service)",
            code: 500,
          }
        }
      }
    }
  };
}

export const realmsService = createRealmsService(realmsRepository);