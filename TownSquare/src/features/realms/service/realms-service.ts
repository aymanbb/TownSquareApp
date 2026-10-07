import { Realm } from "../types/Realm";
import { realmsRepository } from "../repository/realms-repository";

export interface RealmsService {
  list: () =>  Promise<Realm[]>;
}

export function createRealmsService(repository: typeof realmsRepository): RealmsService {
  return {
    async list() {
      const realms = realmsRepository.list();
      return realms;
    },
  };
}

export const realmsService = createRealmsService(realmsRepository);