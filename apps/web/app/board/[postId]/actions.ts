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

interface UpdatePostCategoryActionProps {
  categoryId: string
  postId: string
}

export async function updatePostCategoryAction(
  _prevState: UpdateCategoryState,
  data: UpdatePostCategoryActionProps
): Promise<UpdateCategoryState> {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "You must be signed in." }
  }

  const post = await getPost(data.postId)
  if (!post) {
    return { error: "Post not found." }
  }

  // The actual authorization gate — same policy the UI uses to show the control.
  if (!canChangePostCategory(user, post)) {
    return { error: "Only the author can change the category." }
  }

  if (!(await categoryExists(data.categoryId))) {
    return { error: "That category no longer exists." }
  }

  await setPostCategory(data.postId, data.categoryId)
  revalidatePath(`/board/${data.postId}`)
  revalidatePath("/board")
  return { ok: true }
}
