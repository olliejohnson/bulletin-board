import { describe, it, expect, vi, beforeEach } from "vitest"

const { findMany, findUnique } = vi.hoisted(() => ({
  findMany: vi.fn(),
  findUnique: vi.fn(),
}))

vi.mock("@/lib/prisma", () => ({
  prisma: { category: { findMany, findUnique } },
}))

import { getCategories, categoryExists } from "./categories"

beforeEach(() => {
  findMany.mockReset()
  findUnique.mockReset()
})

describe("getCategories", () => {
  it("selects post counts and orders by name", () => {
    getCategories()
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        select: expect.objectContaining({
          _count: { select: { posts: true } },
        }),
        orderBy: { name: "asc" },
      })
    )
  })
})

describe("categoryExists", () => {
  it("returns true when the category is found", async () => {
    findUnique.mockResolvedValue({ id: "c1" })
    expect(await categoryExists("c1")).toBe(true)
    expect(findUnique).toHaveBeenCalledWith({
      where: { id: "c1" },
      select: { id: true },
    })
  })

  it("returns false when the category is not found", async () => {
    findUnique.mockResolvedValue(null)
    expect(await categoryExists("missing")).toBe(false)
  })
})
