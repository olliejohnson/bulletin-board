import { defineConfig, devices } from "@playwright/test"

// E2E runs the real app against a throwaway Postgres (see e2e/README.md).
// We use a non-default port so it never collides with the dev server, and
// point better-auth at that port via env (auth-client reads
// NEXT_PUBLIC_BETTER_AUTH_URL).
const PORT = Number(process.env.E2E_PORT ?? 3100)
const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: {
    // The DB is provisioned + migrated + seeded before this starts; the app
    // inherits DATABASE_URL from the environment.
    command: `pnpm exec next dev --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      NEXT_PUBLIC_BETTER_AUTH_URL: baseURL,
      BETTER_AUTH_URL: baseURL,
    },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
})
