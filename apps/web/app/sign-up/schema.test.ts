import { describe, it, expect } from "vitest"
import { signUpSchema } from "./schema"

const valid = {
  name: "Alice Example",
  username: "alice",
  email: "alice@example.com",
  password: "password123",
  confirmPassword: "password123",
}

describe("signUpSchema", () => {
  it("accepts a valid sign-up payload", () => {
    const result = signUpSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it("rejects passwords shorter than 8 characters", () => {
    const result = signUpSchema.safeParse({
      ...valid,
      password: "short",
      confirmPassword: "short",
    })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe(
      "Password must be at least 8 characters long."
    )
  })

  it("rejects when password and confirmPassword do not match", () => {
    const result = signUpSchema.safeParse({
      ...valid,
      confirmPassword: "different123",
    })
    expect(result.success).toBe(false)
    expect(
      result.error?.issues.some((i) => i.message === "Passwords must match")
    ).toBe(true)
  })

  it("rejects an invalid email", () => {
    const result = signUpSchema.safeParse({ ...valid, email: "not-an-email" })
    expect(result.success).toBe(false)
  })

  it.each(["ab", "has space", "bad!char", "a".repeat(31)])(
    "rejects invalid username %j",
    (username) => {
      const result = signUpSchema.safeParse({ ...valid, username })
      expect(result.success).toBe(false)
    }
  )

  it.each(["alice", "alice_01", "alice.example", "ABC123"])(
    "accepts valid username %j",
    (username) => {
      const result = signUpSchema.safeParse({ ...valid, username })
      expect(result.success).toBe(true)
    }
  )
})
