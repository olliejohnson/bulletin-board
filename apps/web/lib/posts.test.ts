import { describe, it, expect, vi, beforeEach } from "vitest"

const { findMany, create, findUnique, update } = vi.hoisted(() => ({
  findMany: vi.fn(),
  create: vi.fn(),
  findUnique: vi.fn(),
  update: vi.fn(),
}))

vi.mock("@/lib/prisma", () => ({
  prisma: { post: { findMany, create, findUnique, update } },
}))

import { getFeed, createPost, getPost, setPostCategory } from "./posts"

beforeEach(() => {
  findMany.mockReset()
  create.mockReset()
  findUnique.mockReset()
  update.mockReset()
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

describe("getPost", () => {
  it("fetches a post by id with author and categories", () => {
    getPost("p1")
    expect(findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "p1" },
        include: expect.objectContaining({
          author: expect.anything(),
          categories: expect.anything(),
        }),
      })
    )
  })
})

describe("setPostCategory", () => {
  it("replaces the post's categories with exactly the given one", () => {
    setPostCategory("p1", "c2")
    expect(update).toHaveBeenCalledWith({
      where: { id: "p1" },
      data: { categories: { set: [{ id: "c2" }] } },
    })
  })
})
