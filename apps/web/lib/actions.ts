"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "./prisma"
import { getCurrentUser } from "./session"
import { canDeletePost } from "./permissions"

export async function revalidate(path: string) {
  revalidatePath(path)
}

export async function deletePost(input: { postId: string }) {
  const post = await prisma.post.findUnique({
    where: {
      id: input.postId,
    },
    select: {
      authorId: true,
    },
  })

  if (!post) {
    return
  }

  const user = await getCurrentUser()
  if (!canDeletePost(user, { authorId: post.authorId }))
    return await prisma.post.delete({
      where: {
        id: input.postId,
      },
    })
}
