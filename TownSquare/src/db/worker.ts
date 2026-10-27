// worker.ts - brukes for å initialisere Drizzle slik at vi kan bruke db.funksjonalitetViØnsker

import { drizzle } from "drizzle-orm/d1";
import { env } from "cloudflare:workers";
import * as schema from "./schema";

export const db = drizzle(env.DB, { schema });
