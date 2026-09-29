import { describe, it, expect } from "vitest";

describe("validatePost", () => {
    it("godtar et gyldig innlegg", () => {
        const result = validatePost("Hei, dette er mitt første innlegg!");
        expect(result.ok).toBe(true);
    });

    it("avviser et tomt innlegg", () => {
        const result = validatePost("");
        expect(result.ok).toBe(false);
        expect(result.error).toBe("Innlegg kan ikke være tomt.");
    });

    it("avviser innlegg over 300 tegn", () => {
        const langtInnlegg = "x".repeat(301);
        const result = validatePost(langtInnlegg);
        expect(result.ok).toBe(false);
    });

    it("avviser bare whitespace", () => {
        const whiteSpace = "   ";
        const result = validatePost(whiteSpace);
        expect(result.error).toBe("Innlegg kan ikke inneholde kun whitespace.")
    })
  });