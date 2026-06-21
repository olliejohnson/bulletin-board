import { describe, it, expect, vi, beforeEach } from "vitest"

const { findMany } = vi.hoisted(() => ({ findMany: vi.fn() }))

vi.mock("@/lib/prisma", () => ({
  prisma: { category: { findMany } },
}))

import { getCategories } from "./categories"

beforeEach(() => findMany.mockReset())

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
