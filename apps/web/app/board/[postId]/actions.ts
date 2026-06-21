"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { categoryExists } from "@/lib/categories"
import { canChangePostCategory } from "@/lib/permissions"
import { getPost, setPostCategory } from "@/lib/posts"
import { getCurrentUser } from "@/lib/session"

const schema = z.object({
  postId: z.string().min(1),
  categoryId: z.string().min(1, "Choose a category."),
})

export type UpdateCategoryState = { error?: string; ok?: boolean }

export async function updatePostCategoryAction(
  _prevState: UpdateCategoryState,
  formData: FormData
): Promise<UpdateCategoryState> {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "You must be signed in." }
  }

  const parsed = schema.safeParse({
    postId: String(formData.get("postId") ?? ""),
    categoryId: String(formData.get("categoryId") ?? ""),
  })
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." }
  }

  const post = await getPost(parsed.data.postId)
  if (!post) {
    return { error: "Post not found." }
  }

  // The actual authorization gate — same policy the UI uses to show the control.
  if (!canChangePostCategory(user, post)) {
    return { error: "Only the author can change the category." }
  }

  if (!(await categoryExists(parsed.data.categoryId))) {
    return { error: "That category no longer exists." }
  }

  await setPostCategory(parsed.data.postId, parsed.data.categoryId)
  revalidatePath(`/board/${parsed.data.postId}`)
  revalidatePath("/board")
  return { ok: true }
}
