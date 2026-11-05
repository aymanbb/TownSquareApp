import { Realm } from "../types/Realm";
import {
  realmsRepository,
  RealmsRepository,
} from "../repository/realms-repository";

export interface RealmsService {
  list(): Promise<Realm[]>;
  get(_id: number): Promise<Realm>;
  create(_realmForm: Partial<Realm>): Promise<Realm>;
  follow(_userId: string, _realmId: string): Promise<void>;
}

function createRealmsService(repository: RealmsRepository): RealmsService {
  return {
    async list(): Promise<Realm[]> {
      try {
        return await repository.list();
      } catch (e) {
        console.error("RealmsService.list error:", e);
        throw new Error("Failed to list realms");
      }
    },

    async get(_id: number): Promise<Realm> {
      if (!Number.isFinite(_id)) {
        throw new Error("ID must be a number.");
      }

      try {
        return await repository.get(_id);
      } catch (e) {
        console.error("RealmsService.get error:", e);

        if (e instanceof Error) {
          // Behold spesifikke meldinger fra repo, f.eks. "Realm not found"
          throw e;
        }

        throw new Error("Failed to fetch realm");
      }
    },

    async create(_realmForm: Partial<Realm>): Promise<Realm> {
      // Enkel validering i service-laget
      if (!_realmForm.name) {
        throw new Error("Name is required.");
      }

      try {
        return await repository.create(_realmForm);
      } catch (e) {
        console.error("RealmsService.create error:", e);

        if (e instanceof Error) {
          // Repo bruker "Failed to create realm" for interne feil
          throw e;
        }

        throw new Error("Failed to create realm");
      }
    },

    async follow(_userId: string, _realmId: string): Promise<void> {
      if (!_userId || !_realmId) {
        throw new Error("User ID and realm ID are required.");
      }

      try {
        await repository.follow(_userId, _realmId);
      } catch (e) {
        console.error("RealmsService.follow error:", e);

        if (e instanceof Error) {
          throw e;
        }

        throw new Error("Failed to follow realm");
      }
    },
  };
}

export const realmsService = createRealmsService(realmsRepository);
