import { Realm } from "../types/Realm";
import { realmsRepository } from "../repository/realms-repository";
import { Result } from "../types/Result";

export interface RealmsService {
  list():  Promise<Realm[]>;
  create(realmForm: Partial<Realm>): Promise<Result<Realm>>;
}

export function createRealmsService(repository: typeof realmsRepository): RealmsService {
  return {
    async list() {
      const realms = await realmsRepository.list();
      return realms;
    },

    async create(realmForm: Partial<Realm>): Promise<Result<Realm>> {
      try {
        const result = await realmsRepository.create(realmForm);

        /*if (result && !result.success) {
          return {
            success: false,
            error: {
              message: result.error.message,
              code: 500,
            }
          }
            */
           return result;
        }
          /*return {
            success: true,
            data: realmForm,
          }
      }*/
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