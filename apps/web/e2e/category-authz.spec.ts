import { test, expect, type Page } from "@playwright/test"

async function signUp(page: Page, suffix: string) {
  await page.goto("/sign-up")
  await page.getByLabel("Full Name").fill(`User ${suffix}`)
  await page.getByLabel("Username").fill(`e2e${suffix}`)
  await page.getByLabel("Email").fill(`e2e${suffix}@example.com`)
  await page.getByLabel("Password", { exact: true }).fill("password1234")
  await page.getByLabel("Confirm Password").fill("password1234")
  await page.getByRole("button", { name: "Create Account" }).click()
  await expect(page).toHaveURL(/\/board$/)
}

test("only the post author sees the category editor", async ({ browser }) => {
  const stamp = Date.now()

  // --- author: sign up, post, open the detail view ---
  const authorCtx = await browser.newContext()
  const author = await authorCtx.newPage()
  await signUp(author, `author${stamp}`)

  const title = `Authz post ${stamp}`
  await author.getByRole("button", { name: "Post a Topic" }).click()
  await author.getByPlaceholder("Title").fill(title)
  await author.getByLabel("Category").selectOption({ label: "~General" })
  await author.getByRole("button", { name: "Post", exact: true }).click()
  await author.getByRole("link", { name: title }).click()
  await expect(author).toHaveURL(/\/board\/.+/)
  const postUrl = author.url()

  // author CAN edit the category
  await expect(author.getByRole("button", { name: "Change" })).toBeVisible()

  // --- a different user: same post, no editor ---
  const otherCtx = await browser.newContext()
  const other = await otherCtx.newPage()
  await signUp(other, `other${stamp}`)
  await other.goto(postUrl)

  await expect(other.getByRole("heading", { name: title })).toBeVisible()
  await expect(other.getByRole("button", { name: "Change" })).toHaveCount(0)

  await authorCtx.close()
  await otherCtx.close()
})
