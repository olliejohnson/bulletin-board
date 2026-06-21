import { describe, it, expect, vi, beforeEach } from "vitest"

const { getSession, createPost, categoryExists, revalidatePath } = vi.hoisted(
  () => ({
    getSession: vi.fn(),
    createPost: vi.fn(),
    categoryExists: vi.fn(),
    revalidatePath: vi.fn(),
  })
)

vi.mock("@/lib/auth", () => ({ auth: { api: { getSession } } }))
vi.mock("@/lib/posts", () => ({ createPost }))
vi.mock("@/lib/categories", () => ({ categoryExists }))
vi.mock("next/cache", () => ({ revalidatePath }))
vi.mock("next/headers", () => ({ headers: vi.fn(async () => new Headers()) }))

import { createPostAction } from "./actions"

function form(fields: Record<string, string>) {
  const fd = new FormData()
  for (const [k, v] of Object.entries(fields)) fd.set(k, v)
  return fd
}

beforeEach(() => {
  getSession.mockReset()
  createPost.mockReset()
  revalidatePath.mockReset()
  categoryExists.mockReset()
  categoryExists.mockResolvedValue(true)
})

describe("createPostAction", () => {
  it("rejects when there is no session", async () => {
    getSession.mockResolvedValue(null)
    const result = await createPostAction(
      {},
      form({ title: "Hi", categoryId: "c1" })
    )
    expect(result.error).toMatch(/signed in/i)
    expect(createPost).not.toHaveBeenCalled()
  })

  it("rejects an empty title", async () => {
    getSession.mockResolvedValue({ user: { id: "u1" } })
    const result = await createPostAction(
      {},
      form({ title: "  ", categoryId: "c1" })
    )
    expect(result.error).toBe("Title is required.")
    expect(createPost).not.toHaveBeenCalled()
  })

  it("rejects a missing category", async () => {
    getSession.mockResolvedValue({ user: { id: "u1" } })
    const result = await createPostAction({}, form({ title: "Hello" }))
    expect(result.error).toBe("Choose a category.")
    expect(createPost).not.toHaveBeenCalled()
  })

  it("rejects a category that does not exist", async () => {
    getSession.mockResolvedValue({ user: { id: "u1" } })
    categoryExists.mockResolvedValue(false)
    const result = await createPostAction(
      {},
      form({ title: "Hello", categoryId: "ghost" })
    )
    expect(result.error).toMatch(/no longer exists/i)
    expect(createPost).not.toHaveBeenCalled()
  })

  it("creates the post and revalidates on valid input", async () => {
    getSession.mockResolvedValue({ user: { id: "u1" } })
    const result = await createPostAction(
      {},
      form({ title: "Hello", content: "Body", categoryId: "c1" })
    )
    expect(createPost).toHaveBeenCalledWith({
      authorId: "u1",
      title: "Hello",
      content: "Body",
      categoryId: "c1",
    })
    expect(revalidatePath).toHaveBeenCalledWith("/board")
    expect(result).toEqual({ ok: true })
  })

  it("treats blank content as undefined", async () => {
    getSession.mockResolvedValue({ user: { id: "u1" } })
    await createPostAction(
      {},
      form({ title: "Hello", content: "", categoryId: "c1" })
    )
    expect(createPost).toHaveBeenCalledWith(
      expect.objectContaining({ content: undefined })
    )
  })
})
