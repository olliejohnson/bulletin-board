"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { z } from "zod"
import { auth } from "@/lib/auth"
import { createPost } from "@/lib/posts"

const composeSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(200),
  content: z.string().trim().max(5000).optional(),
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
  })
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." }
  }

  await createPost({
    authorId: session.user.id,
    title: parsed.data.title,
    content: parsed.data.content,
  })

  revalidatePath("/board")
  return { ok: true }
}
