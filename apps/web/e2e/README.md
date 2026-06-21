# End-to-end tests (Playwright)

These specs drive a real browser against the real app and a **throwaway Postgres**,
so they're true integration tests (middleware auth gate → server components →
server actions → DB → navigation).

## How the database is provisioned

Same flow everywhere — only the way the empty DB appears differs:

- **Local:** a disposable Docker Postgres (`e2e/docker-compose.yml`, port 5433),
  brought up/down by `e2e/run-local.sh`. **Requires Docker.**
- **CI:** a GitHub Actions `services: postgres` container (`.github/workflows/e2e.yml`).

Both then run `prisma migrate deploy` + `prisma db seed` against the fresh DB, and
Playwright starts the app (`webServer` in `playwright.config.ts`) on port 3100
pointed at it.

## Run it locally

```bash
# from apps/web — one-time browser download:
pnpm exec playwright install chromium

# full run (boots Postgres, migrates, seeds, runs specs, tears down):
pnpm e2e:local
```

## Notes

- The app runs on **3100** (not 3000) so it never collides with the dev server.
  better-auth is pointed there via `NEXT_PUBLIC_BETTER_AUTH_URL` /
  `BETTER_AUTH_URL`; the auth client now reads that env (default stays
  `localhost:3000`).
- Specs use **unique per-run data** (timestamped email/username) so they don't
  collide across runs/retries.
- `DATABASE_URL` is set in the environment before Prisma/Next run; both prefer an
  already-set env var over `.env`, so the test DB is used without touching `.env`.

## Status

⚠️ Scaffolded but **not yet run end-to-end** (Docker wasn't installed when this
was written). First live run may need small fixes (selectors, timing, env). The
TypeScript (config + specs) is verified by `pnpm check`.
