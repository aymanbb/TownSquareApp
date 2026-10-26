import { Realm } from "../types/Realm";
import { realmsRepository, RealmsRepository } from "../repository/realms-repository";
import { Result } from "../types/Result";

export interface RealmsService {
  list():  Promise<Result<Realm[]>>;
  create(realmForm: Partial<Realm>): Promise<Result<Realm>>;
}

function createRealmsService(_repository: RealmsRepository): RealmsService {
  return {
    async list() {
      try {
        const realms = await _repository.list();
        return { success: true, data: realms };
      } catch (e: any) {
        console.error("Service error (list): ", e);
        return {
          success: false,
          error: {
            message: "Failed to list realms",
            code: 500,
          },
        };
      }
    },

    async create(_realmForm: Partial<Realm>): Promise<Result<Realm>> {
      try {
          const realm = await _repository.create(_realmForm);
          return { success: true, data: realm };
      }
      catch (e){
        console.error("Service error (create): ", e);
        
        const message = e instanceof Error ? e.message : "Failed to create realm";
        const isValidationError = message === "Name is required.";

        return {
          success: false,
          error: {
            message,
            code: isValidationError ? 400 : 500,
          },
        };
      }
    },
  };
}

export const realmsService = createRealmsService(realmsRepository);