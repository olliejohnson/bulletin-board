"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { categoryExists } from "@/lib/categories"
import { createPost } from "@/lib/posts"

export type ComposeState = { error?: string; ok?: boolean }

interface CreatePostActionProps {
  title: string
  categoryId: string
  content?: string | undefined
}

export async function createPostAction(
  _prevState: ComposeState,
  data: CreatePostActionProps
): Promise<ComposeState> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return { error: "You must be signed in to post." }
  }

  if (!(await categoryExists(data.categoryId))) {
    return { error: "That category no longer exists." }
  }

  await createPost({
    authorId: session.user.id,
    title: data.title,
    content: data.content,
    categoryId: data.categoryId,
  })

  revalidatePath("/board")
  return { ok: true }
}
