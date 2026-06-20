import { describe, it, expect } from "vitest"
import { signInSchema } from "./schema"

describe("signInSchema", () => {
  it("accepts a valid sign-in payload", () => {
    const result = signInSchema.safeParse({
      username: "alice",
      password: "password123",
    })
    expect(result.success).toBe(true)
  })

  it("rejects passwords shorter than 8 characters", () => {
    const result = signInSchema.safeParse({
      username: "alice",
      password: "short",
    })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe(
      "Password must be at least 8 characters long."
    )
  })

  it("rejects a missing username", () => {
    const result = signInSchema.safeParse({ password: "password123" })
    expect(result.success).toBe(false)
  })
})
