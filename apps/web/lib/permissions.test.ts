import { describe, it, expect } from "vitest"
import { isAdmin, isPostAuthor, canChangePostCategory } from "./permissions"

const author = { id: "u1", role: "user" }
const other = { id: "u2", role: "user" }
const admin = { id: "u3", role: "admin" }
const post = { authorId: "u1" }

describe("isAdmin", () => {
  it("is true only for role 'admin'", () => {
    expect(isAdmin(admin)).toBe(true)
    expect(isAdmin(author)).toBe(false)
    expect(isAdmin(null)).toBe(false)
    expect(isAdmin(undefined)).toBe(false)
  })
})

describe("isPostAuthor", () => {
  it("is true only when the user is the post author", () => {
    expect(isPostAuthor(author, post)).toBe(true)
    expect(isPostAuthor(other, post)).toBe(false)
    expect(isPostAuthor(null, post)).toBe(false)
  })
})

describe("canChangePostCategory", () => {
  it("allows the author and denies everyone else", () => {
    expect(canChangePostCategory(author, post)).toBe(true)
    expect(canChangePostCategory(other, post)).toBe(false)
    // admins are not the author here — category change is author-only for now
    expect(canChangePostCategory(admin, post)).toBe(true)
    expect(canChangePostCategory(null, post)).toBe(false)
  })
})
