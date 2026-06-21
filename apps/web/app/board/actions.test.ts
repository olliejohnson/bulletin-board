import { describe, it, expect, vi, beforeEach } from "vitest"

const { getSession, createPost, revalidatePath } = vi.hoisted(() => ({
  getSession: vi.fn(),
  createPost: vi.fn(),
  revalidatePath: vi.fn(),
}))

vi.mock("@/lib/auth", () => ({ auth: { api: { getSession } } }))
vi.mock("@/lib/posts", () => ({ createPost }))
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
})

describe("createPostAction", () => {
  it("rejects when there is no session", async () => {
    getSession.mockResolvedValue(null)
    const result = await createPostAction({}, form({ title: "Hi" }))
    expect(result.error).toMatch(/signed in/i)
    expect(createPost).not.toHaveBeenCalled()
  })

  it("rejects an empty title", async () => {
    getSession.mockResolvedValue({ user: { id: "u1" } })
    const result = await createPostAction({}, form({ title: "  " }))
    expect(result.error).toBe("Title is required.")
    expect(createPost).not.toHaveBeenCalled()
  })

  it("creates the post and revalidates on valid input", async () => {
    getSession.mockResolvedValue({ user: { id: "u1" } })
    const result = await createPostAction(
      {},
      form({ title: "Hello", content: "Body" })
    )
    expect(createPost).toHaveBeenCalledWith({
      authorId: "u1",
      title: "Hello",
      content: "Body",
    })
    expect(revalidatePath).toHaveBeenCalledWith("/board")
    expect(result).toEqual({ ok: true })
  })

  it("treats blank content as undefined", async () => {
    getSession.mockResolvedValue({ user: { id: "u1" } })
    await createPostAction({}, form({ title: "Hello", content: "" }))
    expect(createPost).toHaveBeenCalledWith(
      expect.objectContaining({ content: undefined })
    )
  })
})
