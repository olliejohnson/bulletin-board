"use client"

import { useActionState, useEffect } from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { createPostAction, type ComposeState } from "./actions"

const initialState: ComposeState = {}

type ComposeFormProps = {
  categories: { id: string; name: string }[]
  onPosted?: () => void
  onCancel?: () => void
}

export function ComposeForm({
  categories,
  onPosted,
  onCancel,
}: ComposeFormProps) {
  const [state, formAction, pending] = useActionState(
    createPostAction,
    initialState
  )

  useEffect(() => {
    if (state.ok) onPosted?.()
  }, [state.ok, onPosted])

  return (
    <form action={formAction} className="rounded-lg border bg-card p-3">
      <Input
        name="title"
        placeholder="Title"
        required
        maxLength={200}
        autoFocus
        className="bg-background"
        aria-invalid={Boolean(state.error)}
      />
      <select
        name="categoryId"
        required
        defaultValue=""
        aria-label="Category"
        className="mt-2 h-8 w-full rounded-md border bg-background px-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
      <textarea
        name="content"
        rows={3}
        placeholder="Say something… (optional)"
        maxLength={5000}
        className="mt-2 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      />
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-xs text-destructive">{state.error ?? ""}</span>
        <div className="flex items-center gap-2">
          {onCancel ? (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={onCancel}
              disabled={pending}
            >
              Cancel
            </Button>
          ) : null}
          <Button type="submit" size="sm" disabled={pending}>
            {pending ? "Posting…" : "Post"}
          </Button>
        </div>
      </div>
    </form>
  )
}
