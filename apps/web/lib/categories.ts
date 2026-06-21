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

export async function categoryExists(id: string): Promise<boolean> {
  const found = await prisma.category.findUnique({
    where: { id },
    select: { id: true },
  })
  return found !== null
}
