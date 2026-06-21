import { defineConfig, configDefaults } from "vitest/config"
import react from "@vitejs/plugin-react"
import { playwright } from "@vitest/browser-playwright"

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    include: ["**/*.{test,spec}.{ts,tsx}"],
    // Playwright e2e specs live in ./e2e and are run by Playwright, not Vitest.
    exclude: [...configDefaults.exclude, "e2e/**"],
  },
})
