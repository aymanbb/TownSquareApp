// E2E-test av hovedflyten, slik en ekte bruker opplever den i nettleseren:
// registrer bruker → opprett realm → bli med i realmen → skriv en post → posten vises.
//
// Testen bruker den lokale dev-databasen, så navnene får et unikt suffiks for hver kjøring.
import { expect, test, type Page } from "@playwright/test";

// Vent til alle skript er lastet, slik at React har tatt over skjemaene før vi klikker.
// Klikker vi for tidlig, sender nettleseren skjemaet som et vanlig GET-skjema.
async function gaTil(page: Page, path: string) {
  await page.goto(path, { waitUntil: "networkidle" });
}

test("ny bruker kan registrere seg, lage en realm og poste i den", async ({ page }, testInfo) => {
  const id = `${Date.now()}${testInfo.project.name}`;
  const brukernavn = `e2e${id}`;
  const realmNavn = `E2E realm ${id}`;
  const postTittel = `E2E post ${id}`;

  // 1. Registrer en ny bruker
  await gaTil(page, "/register");
  await page.getByLabel("Username:").fill(brukernavn);
  await page.getByLabel("Email:").fill(`${brukernavn}@example.test`);
  await page.getByLabel("Password:", { exact: true }).fill("e2e-passord-123");
  await page.getByLabel("Confirm Password:").fill("e2e-passord-123");
  await page.getByRole("button", { name: "Register" }).click();

  // Etter registrering sendes brukeren til forsiden og er logget inn
  await expect(page).toHaveURL("/");
  await expect(page.getByText(`Welcome back, ${brukernavn}!`)).toBeVisible();

  // 2. Opprett en realm fra sidemenyen
  await page.getByRole("button", { name: "Create new realm" }).click();
  await page.getByLabel("Realm navn").fill(realmNavn);
  await page.getByLabel("Realm beskrivelse").fill("Laget av Playwright");
  await page.getByRole("button", { name: "Create", exact: true }).click();
  await expect(page.getByLabel("Realm navn")).toBeHidden();

  // 3. Finn realmen under Explore og bli med
  await gaTil(page, "/realms");
  const realmKort = page.locator("article", { hasText: realmNavn });
  await realmKort.getByRole("button", { name: "Join realm" }).click();
  await expect(page).toHaveURL(/\/realms\/\d+$/);
  await expect(page.getByRole("heading", { name: realmNavn })).toBeVisible();

  // 4. Skriv en post i realmen
  await page.getByRole("button", { name: "New post" }).click();
  await page.getByLabel("Title").fill(postTittel);
  await page.getByLabel("Content").fill("Hilsen fra ende-til-ende-testen");
  await page.getByRole("button", { name: "Post", exact: true }).click();

  // 5. Posten vises i realmens feed ...
  await expect(page.getByText(postTittel)).toBeVisible();

  // ... og i hovedfeeden på forsiden
  await gaTil(page, "/");
  await expect(page.getByText(postTittel)).toBeVisible();
});
