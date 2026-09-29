import { describe, it, expect } from "vitest";

describe("validateRegister", () => {
    it("avviser for kort passord", () => {
        const username = "bruker"
        const password = "x".repeat(9);
        const email = "bruker@hiof.no"
        const result = validateRegister(username, password, email);
        expect (result.error).toBe("Passord må bestå av minst 10 tegn, og inneholde tall og symboler.")
    });

    it("avviser ugyldig epost", () => {
        const username = "bruker"
        const password = "GodNokPassord123!";
        const email = "@hiof.no"
        const result = validateRegister(username, password, email);
        expect (result.error).toBe("Epost må være gyldig.")
    });

    it("avviser ugyldig brukernavn", () => {
        const username = "admin"
        const password = "GodNokPassord123";
        const email = "bruker@hiof.no"
        const result = validateRegister(username, password, email);
        expect (result.error).toBe("Brukernavnet er reservert.")
    });

    it("avviser brukernavn som allerede er registrert", () => {
        const username = "bruker"
        const password = "GodNokPassord123";
        const email = "bruker@hiof.no"
        const result = validateRegister(username, password, email);
        expect (result.error).toBe("Brukernavnet er ikke ledig.")
    });

    it("avviser brukernavn med ulovlige ord", () => {
        const username = "fuckboy"
        const password = "GodNokPassord123";
        const email = "bruker@hiof.no"
        const result = validateRegister(username, password, email);
        expect (result.error).toBe("Brukernavnet inneholder ulovlig(e) ord.")
    });
  });