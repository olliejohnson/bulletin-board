import { describe, it, expect, vi, beforeEach } from "vitest"

const { findMany, create } = vi.hoisted(() => ({
  findMany: vi.fn(),
  create: vi.fn(),
}))

vi.mock("@/lib/prisma", () => ({
  prisma: { post: { findMany, create } },
}))

import { getFeed, createPost } from "./posts"

beforeEach(() => {
  findMany.mockReset()
  create.mockReset()
})

describe("getFeed", () => {
  it("queries published, public posts newest first", () => {
    getFeed()
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { published: true, visibility: "PUBLIC" },
        orderBy: { createdAt: "desc" },
        take: 50,
      })
    )
  })

  it("honors a custom take", () => {
    getFeed({ take: 10 })
    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({ take: 10 }))
  })
})

describe("createPost", () => {
  it("creates a published post with author, fields, and connected category", () => {
    createPost({
      authorId: "u1",
      title: "Hello",
      content: "Body",
      categoryId: "c1",
    })
    expect(create).toHaveBeenCalledWith({
      data: {
        title: "Hello",
        content: "Body",
        authorId: "u1",
        published: true,
        categories: { connect: { id: "c1" } },
      },
    })
  })
})
