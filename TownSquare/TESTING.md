# Testing

```bash
pnpm test        # Vitest: enhet, komponent og integrasjon
pnpm test:e2e    # Playwright: ende-til-ende (starter dev-serveren på port 5173 selv)
```

Vi har valgt bredde framfor prosent dekning: én eller noen få tester på hvert nivå, rettet mot det som faktisk kan gå galt for brukeren.

| Nivå | Fil | Hva og hvorfor |
|---|---|---|
| Enhet (hjelpefunksjoner) | `src/features/auth/__tests__/schemas.test.ts` | Zod-skjemaene for login/registrering. Det er den første valideringen brukeren møter, og den har regler som er lette å ødelegge: like passord, trimming av brukernavn, minstelengder. |
| Enhet (service) | `src/features/posts/__tests__/post.service.test.ts` | `postService` med et falskt repository. Servicen er der forretningsreglene bor: ugyldige poster skal stoppes *før* databasen, og klienten skal ikke kunne sette felter som `likes`. |
| Komponent | `src/features/auth/__tests__/UserCard.test.tsx` | `UserCard` på leaderboardet. Rendres til HTML og sjekker det brukeren ser, også fallback når data mangler (ingen level → 0, ingen dato → "Unknown"). |
| Integrasjon | `src/features/posts/__tests__/main-flow.integration.test.ts` | Hovedflyten (opprett realm → følg → post → vises i feed) gjennom de **ekte API-rutene** mot en lokal D1-database. Den går via rutene og ikke bare controlleren fordi den da fanger feil som at `GET /api/v1/posts` glemte `return` (en ekte bug vi hadde). |
| E2E | `e2e/main-flow.spec.ts` | Samme hovedflyt i en ekte nettleser, på desktop og mobil: registrer → lag realm → bli med → skriv post → posten vises. Dette er det eneste nivået som tester at frontend, API, auth og database henger sammen. |

De eksisterende integrasjonstestene for posts og realms (`*.integration.test.ts`) dekker controllerne mer i detalj.

## Hva vi bevisst ikke tester

- Rene typer og konstanter (`Result`, `Post`): TypeScript sjekker dem allerede.
- Styling og layout piksel for piksel: e2e kjører på mobil, så grove layoutfeil som blokkerer flyten blir fanget der.
- Repository-metoder som ikke er implementert ennå (`remove`, `update`).

## Merk

- E2E-testen bruker den lokale dev-databasen og lager en ny bruker, realm og post hver gang den kjøres (med unike navn).
- Dev-serveren må kjøre på samme port som `BETTER_AUTH_URL` i `.dev.vars` (5173). Ellers avviser Better Auth registreringen med "Invalid origin".
