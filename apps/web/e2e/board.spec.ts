import { test, expect } from "@playwright/test"

// Unique per run so the spec never collides with existing rows in the (fresh)
// test database or across retries.
const stamp = Date.now()
const user = {
  name: "E2E User",
  username: `e2e_${stamp}`,
  email: `e2e_${stamp}@example.com`,
  password: "password1234",
}

test("sign up, post to General, and open the post", async ({ page }) => {
  // --- sign up ---
  await page.goto("/sign-up")
  await page.getByLabel("Full Name").fill(user.name)
  await page.getByLabel("Username").fill(user.username)
  await page.getByLabel("Email").fill(user.email)
  await page.getByLabel("Password", { exact: true }).fill(user.password)
  await page.getByLabel("Confirm Password").fill(user.password)
  await page.getByRole("button", { name: "Create Account" }).click()

  // lands on the board
  await expect(page).toHaveURL(/\/board$/)

  // --- compose a post in General (reveal the form, then submit) ---
  const title = `E2E post ${stamp}`
  await page.getByRole("button", { name: "Post a Topic" }).click()
  await page.getByPlaceholder("Title").fill(title)
  await page.getByLabel("Category").selectOption({ label: "~General" })
  await page.getByRole("button", { name: "Post", exact: true }).click()

  // --- it appears in the feed; open the detail view ---
  const postLink = page.getByRole("link", { name: title })
  await expect(postLink).toBeVisible()
  await postLink.click()

  await expect(page).toHaveURL(/\/board\/.+/)
  await expect(page.getByRole("heading", { name: title })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Replies" })).toBeVisible()
})

test("redirects an unauthenticated visitor to sign-in", async ({ page }) => {
  await page.goto("/board")
  await expect(page).toHaveURL(/\/sign-in/)
})
