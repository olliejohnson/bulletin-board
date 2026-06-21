"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { z } from "zod"
import { auth } from "@/lib/auth"
import { categoryExists } from "@/lib/categories"
import { createPost } from "@/lib/posts"

const composeSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(200),
  content: z.string().trim().max(5000).optional(),
  categoryId: z.string().min(1, "Choose a category."),
})

export type ComposeState = { error?: string; ok?: boolean }

export async function createPostAction(
  _prevState: ComposeState,
  formData: FormData
): Promise<ComposeState> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return { error: "You must be signed in to post." }
  }

  const parsed = composeSchema.safeParse({
    title: String(formData.get("title") ?? ""),
    content: String(formData.get("content") ?? "") || undefined,
    categoryId: String(formData.get("categoryId") ?? ""),
  })
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." }
  }

  if (!(await categoryExists(parsed.data.categoryId))) {
    return { error: "That category no longer exists." }
  }

  await createPost({
    authorId: session.user.id,
    title: parsed.data.title,
    content: parsed.data.content,
    categoryId: parsed.data.categoryId,
  })

  revalidatePath("/board")
  return { ok: true }
}
