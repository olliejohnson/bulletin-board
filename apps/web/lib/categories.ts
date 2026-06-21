// Data-access layer for categories (the Tildes "groups"). Server-only.
import { prisma } from "@/lib/prisma"

export type CategoryWithCount = Awaited<
  ReturnType<typeof getCategories>
>[number]

export function getCategories() {
  return prisma.category.findMany({
    select: {
      id: true,
      name: true,
      _count: { select: { posts: true } },
    },
    orderBy: { name: "asc" },
  })
}
