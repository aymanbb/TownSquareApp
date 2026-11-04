import { Realm } from "../types/Realm";
import { realmsRepository, RealmsRepository } from "../repository/realms-repository";
import { Result } from "../types/Result";

export interface RealmsService {
  list(): Promise<Result<Realm[]>>;
  get(_id: number): Promise<Result<Realm>>;
  create(_realmForm: Partial<Realm>): Promise<Result<Realm>>;
  follow(_userId: string, _realmId: string): Promise<Result<string>>;
  checkFollow(_userId: string, _realmId: string): Promise<boolean>;
}

function createRealmsService(_repository: RealmsRepository): RealmsService {
  return {
    async list() {
      try {
        const realms = await _repository.list();
        return { success: true, data: realms };
      } catch (e) {
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

    async get(_id: number) {
      try {
        if (Number.isNaN(_id)) {
          throw new Error("ID must be a number.");
        }

        const result = await _repository.get(_id);
        return { success: true, data: result };
      } catch (e) {
        console.error("Service error (get): ", e);
        
        const message = e instanceof Error ? e.message : "Failed to fetch realm";
        const isValidationError = message === "ID must be a number."

        return {
          success: false,
          error: {
            message: message,
            code: isValidationError ? 400 : 500,
          }
        }
      }
    },

    async create(_realmForm: Partial<Realm>): Promise<Result<Realm>> {
      try {
          const realm = await _repository.create(_realmForm);
          return { success: true, data: realm };
      } catch (e){
        console.error("Service error (create): ", e);
        
        const message = e instanceof Error ? e.message : "Failed to create realm";
        const isValidationError = message === "Name is required.";

        return {
          success: false,
          error: {
            message: message,
            code: isValidationError ? 400 : 500,
          },
        };
      }
    },

    async follow(_userId: string, _realmId: string): Promise<Result<string>> {
      try {
        console.log("(service) ATTAAAAAAAAAAAAAAAAAAAACk")
        const result = await _repository.follow(_userId, _realmId);
        return { success: true, data: "You have followed this realm" };
      } catch (e){
        console.error("Service error (create): ", e);
        
        const message = e instanceof Error ? e.message : "Failed to follow realm";

        return {
          success: false,
          error: {
            message: message,
            code: 400,
          },
        };
      }
    },

    async checkFollow(_userId: string, _realmId: string): Promise<boolean> {
      try {
        return await realmsRepository.checkFollow(_userId, _realmId);
      } catch (e) {
        console.error("Service error (checkFollow):", e);
        return false;
      }
    },
  };
}

export const realmsService = createRealmsService(realmsRepository);