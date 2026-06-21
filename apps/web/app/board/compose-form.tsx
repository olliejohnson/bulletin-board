"use client"

import { useActionState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { createPostAction, type ComposeState } from "./actions"

const initialState: ComposeState = {}

export function ComposeForm() {
  const [state, formAction, pending] = useActionState(
    createPostAction,
    initialState
  )

  return (
    <form
      action={formAction}
      className="rounded-lg border bg-card p-3"
      key={state.ok ? "posted" : "compose"}
    >
      <Input
        name="title"
        placeholder="Title"
        required
        maxLength={200}
        className="bg-background"
        aria-invalid={Boolean(state.error)}
      />
      <textarea
        name="content"
        rows={3}
        placeholder="Say something… (optional)"
        maxLength={5000}
        className="mt-2 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      />
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-xs text-destructive">{state.error ?? ""}</span>
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "Posting…" : "New post"}
        </Button>
      </div>
    </form>
  )
}
