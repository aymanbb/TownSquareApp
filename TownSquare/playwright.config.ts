// Playwright-konfigurasjon for ende-til-ende-tester.
// Kjører mot dev-serveren på port 5173. Porten må være den samme som BETTER_AUTH_URL i .dev.vars,
// ellers avviser Better Auth innlogging/registrering med "Invalid origin".
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    // Siden skal også fungere på mobil
    { name: "mobil", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "pnpm dev --port 5173 --strictPort",
    url: "http://localhost:5173",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
