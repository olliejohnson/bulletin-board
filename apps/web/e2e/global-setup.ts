import { chromium, type FullConfig } from "@playwright/test"

// Warm the dev server before the specs run. `next dev` compiles routes on first
// request, and the very first (cold) sign-up can race in CI (better-auth throws
// "reading 'username'"). A throwaway sign-up here exercises /sign-up, /api/auth,
// and /board so the real specs run against an already-compiled, warm server.
async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use.baseURL
  if (!baseURL) return

  const browser = await chromium.launch()
  const page = await browser.newPage({ baseURL })
  try {
    const s = Date.now()
    await page.goto("/sign-up")
    await page.getByLabel("Full Name").fill("Warmup")
    await page.getByLabel("Username").fill(`warm${s}`)
    await page.getByLabel("Email").fill(`warm${s}@example.com`)
    await page.getByLabel("Password", { exact: true }).fill("password1234")
    await page.getByLabel("Confirm Password").fill("password1234")
    await page.getByRole("button", { name: "Create Account" }).click()
    // Best-effort: even if this cold request itself races, it still compiles the
    // routes, so the real specs run warm.
    await page.waitForURL(/\/board$/, { timeout: 60_000 }).catch(() => {})
  } finally {
    await browser.close()
  }
}

export default globalSetup
