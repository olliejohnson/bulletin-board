import { describe, it, expect, vi, beforeEach } from "vitest"

const {
  getCurrentUser,
  getPost,
  setPostCategory,
  categoryExists,
  revalidatePath,
} = vi.hoisted(() => ({
  getCurrentUser: vi.fn(),
  getPost: vi.fn(),
  setPostCategory: vi.fn(),
  categoryExists: vi.fn(),
  revalidatePath: vi.fn(),
}))

vi.mock("@/lib/session", () => ({ getCurrentUser }))
vi.mock("@/lib/posts", () => ({ getPost, setPostCategory }))
vi.mock("@/lib/categories", () => ({ categoryExists }))
vi.mock("next/cache", () => ({ revalidatePath }))
// permissions is the REAL pure policy — we want to exercise the actual authz.

import { updatePostCategoryAction } from "./actions"

const authorPost = { id: "p1", authorId: "u1" }

beforeEach(() => {
  getCurrentUser.mockReset()
  getPost.mockReset()
  setPostCategory.mockReset()
  categoryExists.mockReset()
  revalidatePath.mockReset()
  getPost.mockResolvedValue(authorPost)
  categoryExists.mockResolvedValue(true)
})

describe("updatePostCategoryAction", () => {
  it("rejects when not signed in", async () => {
    getCurrentUser.mockResolvedValue(null)
    const result = await updatePostCategoryAction(
      {},
      { postId: "p1", categoryId: "c2" }
    )
    expect(result.error).toMatch(/signed in/i)
    expect(setPostCategory).not.toHaveBeenCalled()
  })

  it("rejects a non-author (authorization gate)", async () => {
    getCurrentUser.mockResolvedValue({ id: "someone-else", role: "user" })
    const result = await updatePostCategoryAction(
      {},
      { postId: "p1", categoryId: "c2" }
    )
    expect(result.error).toMatch(/only the author/i)
    expect(setPostCategory).not.toHaveBeenCalled()
  })

  it("rejects when the post does not exist", async () => {
    getCurrentUser.mockResolvedValue({ id: "u1", role: "user" })
    getPost.mockResolvedValue(null)
    const result = await updatePostCategoryAction(
      {},
      { postId: "missing", categoryId: "c2" }
    )
    expect(result.error).toMatch(/not found/i)
    expect(setPostCategory).not.toHaveBeenCalled()
  })

  it("rejects a category that does not exist", async () => {
    getCurrentUser.mockResolvedValue({ id: "u1", role: "user" })
    categoryExists.mockResolvedValue(false)
    const result = await updatePostCategoryAction(
      {},
      { postId: "p1", categoryId: "ghost" }
    )
    expect(result.error).toMatch(/no longer exists/i)
    expect(setPostCategory).not.toHaveBeenCalled()
  })

  it("updates the category and revalidates for the author", async () => {
    getCurrentUser.mockResolvedValue({ id: "u1", role: "user" })
    const result = await updatePostCategoryAction(
      {},
      { postId: "p1", categoryId: "c2" }
    )
    expect(setPostCategory).toHaveBeenCalledWith("p1", "c2")
    expect(revalidatePath).toHaveBeenCalledWith("/board/p1")
    expect(result).toEqual({ ok: true })
  })
})
