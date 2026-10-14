// index.ts - brukes for å initialisere Drizzle slik at vi kan bruke db.funksjonalitetViØnsker
// src/db/index.ts

import { drizzle } from "drizzle-orm/d1";
import { env } from "cloudflare:workers";
import * as schema from "./schema";

export const db = drizzle(env.DB, { schema });
