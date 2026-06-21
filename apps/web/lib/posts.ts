// Data-access layer for posts. Server-only — called from Server Components
// (reads) and Server Actions (writes). Centralizes Prisma access so queries and
// authorization aren't scattered across the UI. (No HTTP API for the web app.)
import { prisma } from "@/lib/prisma"

export type FeedPost = Awaited<ReturnType<typeof getFeed>>[number]

// Recent published, public posts, newest first. No votes/score field yet, so
// ordering is by recency.
export function getFeed({ take = 50 }: { take?: number } = {}) {
  return prisma.post.findMany({
    where: { published: true, visibility: "PUBLIC" },
    include: {
      author: {
        select: { username: true, displayUsername: true, name: true },
      },
      categories: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
    take,
  })
}

export function createPost(input: {
  authorId: string
  title: string
  content?: string
  categoryId: string
}) {
  return prisma.post.create({
    data: {
      title: input.title,
      content: input.content,
      authorId: input.authorId,
      // Published immediately for now — no draft flow yet.
      published: true,
      categories: { connect: { id: input.categoryId } },
    },
  })
}
