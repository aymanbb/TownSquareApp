// Integrasjonstester for realms: controller → service → repository → D1 (lokal test-database).
// Controlleren returnerer Response-objekter, så vi sjekker både statuskode og JSON-body.
import { beforeEach, describe, expect, it } from "vitest";
import { realmsController } from "@/features/realms/controller/realms-controller";
import { createRealm, createUser, resetDb } from "../../../../test/helpers";

describe("Realms (controller → service → repository → D1)", () => {
  let userId: string;

  beforeEach(async () => {
    await resetDb();
    userId = await createUser();
  });

  describe("list", () => {
    it("returnerer 200 og en tom liste når det ikke finnes realms", async () => {
      const res = await realmsController.list();

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual([]);
    });

    it("returnerer alle realms", async () => {
      await createRealm(userId, "Gaming");
      await createRealm(userId, "Musikk");

      const res = await realmsController.list();
      const body: any = await res.json();

      expect(res.status).toBe(200);
      expect(body.map((r: any) => r.name)).toEqual(["Gaming", "Musikk"]);
      expect(body[0]).toMatchObject({ ownerId: userId });
    });
  });

  describe("create", () => {
    it("oppretter en realm og returnerer 201", async () => {
      const res = await realmsController.create({
        name: "Ny realm",
        description: "Beskrivelse",
        ownerId: userId,
      });
      const body: any = await res.json();

      expect(res.status).toBe(201);
      expect(body).toMatchObject({
        name: "Ny realm",
        description: "Beskrivelse",
        ownerId: userId,
      });

      // Realmen skal faktisk være lagret i databasen
      const listBody: any = await (await realmsController.list()).json();
      expect(listBody).toHaveLength(1);
    });

    it("returnerer 400 når navn mangler", async () => {
      const res = await realmsController.create({ ownerId: userId });
      const body: any = await res.json();

      expect(res.status).toBe(400);
      expect(body).toEqual({ message: "Name is required." });
    });

    it("returnerer 500 når eieren ikke finnes (foreign key)", async () => {
      const res = await realmsController.create({
        name: "Uten eier",
        ownerId: "finnes-ikke",
      });

      expect(res.status).toBe(500);
    });
  });

  describe("get", () => {
    it("returnerer riktig realm", async () => {
      const created = await createRealm(userId, "Hent meg");

      const res = await realmsController.get(created.id);
      const body: any = await res.json();

      expect(res.status).toBe(200);
      expect(body).toMatchObject({ id: created.id, name: "Hent meg" });
    });

    it("returnerer 400 for ugyldig id", async () => {
      const res = await realmsController.get(Number.NaN);

      expect(res.status).toBe(400);
    });

    it("returnerer feil når realmen ikke finnes", async () => {
      const res = await realmsController.get(9999);
      const body: any = await res.json();

      expect(body.message).toBeDefined();
      expect(res.status).toBeGreaterThanOrEqual(400);
    });
  });

  describe("follow / checkFollow", () => {
    it("brukeren følger ikke realmen før follow", async () => {
      const created = await createRealm(userId);

      const res = await realmsController.checkFollow(userId, String(created.id));

      expect(await res.json()).toEqual({ isFollowing: false });
    });

    it("etter follow sier checkFollow at brukeren følger realmen", async () => {
      const created = await createRealm(userId);

      const followRes = await realmsController.follow(userId, String(created.id));
      expect(followRes.status).toBe(200);

      const res = await realmsController.checkFollow(userId, String(created.id));
      expect(await res.json()).toEqual({ isFollowing: true });
    });

    it("å følge samme realm to ganger går fint", async () => {
      const created = await createRealm(userId);

      await realmsController.follow(userId, String(created.id));
      const second = await realmsController.follow(userId, String(created.id));

      expect(second.status).toBe(200);
    });
  });
});
