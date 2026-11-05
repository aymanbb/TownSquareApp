import { Realm } from "../types/Realm";
import { realmsService, RealmsService } from "../service/realms-service";

export interface RealmsController {
  list(): Promise<Response>;
  get(_id: number): Promise<Response>;
  create(_realmForm: Partial<Realm>): Promise<Response>;
  follow(_userId: string, _realmId: string): Promise<Response>;
  checkFollow(_userId: string, _realmId: string): Promise<Response>;
}

function createRealmsController(service: RealmsService): RealmsController {
  return {
    async list() {
      try {
        const realms = await service.list();

        return new Response(JSON.stringify(realms), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        console.error("RealmsController.list error:", e);

        const message =
          e instanceof Error ? e.message : "Failed to list realms";

        return new Response(JSON.stringify({ message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    },

    async get(_id) {
      try {
        const realm = await service.get(_id);

        return new Response(JSON.stringify(realm), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        console.error("RealmsController.get error:", e);

        const message =
          e instanceof Error ? e.message : "Failed to fetch realm";

        // Enkel mapping av kjente feilmeldinger til HTTP‑status
        let status = 500;
        if (message === "ID must be a number.") {
          status = 400;
        } else if (message === "Realm not found") {
          status = 404;
        }

        return new Response(JSON.stringify({ message }), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      }
    },

    async create(_realmForm) {
      try {
        const created = await service.create(_realmForm);

        return new Response(JSON.stringify(created), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        console.error("RealmsController.create error:", e);

        const message =
          e instanceof Error ? e.message : "Failed to create realm";

        let status = 500;
        if (message === "Name is required.") {
          status = 400;
        }

        return new Response(JSON.stringify({ message }), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      }
    },

    async follow(userId: string, realmId: string) {
      try {
        await service.follow(userId, realmId);

        return new Response(
          JSON.stringify({ message: "You have followed this realm" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      } catch (e) {
        console.error("RealmsController.follow error:", e);

        const message =
          e instanceof Error ? e.message : "Failed to follow realm";

        let status = 500;
        if (
          message === "User ID and realm ID are required." ||
          message === "Ugyldig input" // hvis du legger til noe slikt senere
        ) {
          status = 400;
        }

        return new Response(JSON.stringify({ message }), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      }
    },

     async checkFollow(userId: string, realmId: string) {
      try {
        const isFollowing = await service.checkFollow(userId, realmId);

        return new Response(JSON.stringify({ isFollowing }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        console.error("RealmsController.checkFollow error:", e);

        const message =
          e instanceof Error ? e.message : "Failed to check follow status";

        let status = 500;
        if (message === "User ID and realm ID are required.") {
          status = 400;
        }

        return new Response(JSON.stringify({ message }), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      }
    },
  };
}

export const realmsController = createRealmsController(realmsService);
