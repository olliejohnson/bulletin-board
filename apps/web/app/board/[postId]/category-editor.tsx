"use client"

import { useActionState } from "react"
import { Button } from "@workspace/ui/components/button"
import { updatePostCategoryAction, type UpdateCategoryState } from "./actions"

const initialState: UpdateCategoryState = {}

type CategoryEditorProps = {
  postId: string
  currentCategoryId?: string
  categories: { id: string; name: string }[]
}

export function CategoryEditor({
  postId,
  currentCategoryId,
  categories,
}: CategoryEditorProps) {
  const [state, formAction, pending] = useActionState(
    updatePostCategoryAction,
    initialState
  )

  return (
    <form action={formAction} className="mt-2 flex items-center gap-2">
      <input type="hidden" name="postId" value={postId} />
      <label className="text-xs text-muted-foreground" htmlFor="categoryId">
        Category
      </label>
      <select
        id="categoryId"
        name="categoryId"
        required
        defaultValue={currentCategoryId ?? ""}
        className="h-7 rounded-md border bg-background px-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <option value="" disabled>
          Choose a category…
        </option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            ~{c.name}
          </option>
        ))}
      </select>
      <Button type="submit" size="sm" variant="outline" disabled={pending}>
        {pending ? "Saving…" : "Change"}
      </Button>
      {state.error ? (
        <span className="text-xs text-destructive">{state.error}</span>
      ) : null}
      {state.ok ? (
        <span className="text-xs text-muted-foreground">Saved.</span>
      ) : null}
    </form>
  )
}
