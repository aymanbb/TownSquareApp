// Kjøres før testfilene: oppretter tabellene i test-databasen fra migrasjonene i /drizzle.
import { applyD1Migrations } from "cloudflare:test";
import { env } from "cloudflare:workers";

await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);
