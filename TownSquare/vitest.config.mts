// Vitest-konfigurasjon for integrasjonstester.
// Testene kjører inne i Workers-runtimen (workerd) med en lokal, tom D1-database.
// Vi bruker IKKE wrangler.jsonc her, slik at testene aldri kobler seg til den ekte databasen i Cloudflare.
import path from "node:path";
import { defineConfig } from "vitest/config";
import { cloudflareTest, readD1Migrations } from "@cloudflare/vitest-plugin";

const root = import.meta.dirname;

export default defineConfig(async () => {
  // Drizzle skriver "--> statement-breakpoint" mellom SQL-setningene. D1 godtar ikke
  // en setning som bare består av en slik kommentar, så vi fjerner dem.
  const migrations = (await readD1Migrations(path.join(root, "drizzle"))).map(
    (m) => ({
      ...m,
      queries: m.queries
        .map((q) => q.replace(/-->\s*statement-breakpoint/g, "").trim())
        .filter((q) => q.length > 0),
    }),
  );

  return {
    resolve: {
      alias: { "@": path.resolve(root, "src") },
    },
    plugins: [
      cloudflareTest({
        remoteBindings: false,
        miniflare: {
          compatibilityDate: "2025-08-21",
          compatibilityFlags: ["nodejs_compat"],
          d1Databases: ["DB"],
          bindings: {
            TEST_MIGRATIONS: migrations,
            BETTER_AUTH_SECRET: "test-secret-only-used-in-tests",
            BETTER_AUTH_URL: "http://localhost:5173",
          },
        },
      }),
    ],
    test: {
      include: ["src/**/*.test.ts"],
      setupFiles: ["./test/apply-migrations.ts"],
    },
  };
});
