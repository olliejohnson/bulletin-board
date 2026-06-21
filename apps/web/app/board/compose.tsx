"use client"

import { useState } from "react"
import { IconPlus } from "@tabler/icons-react"
import { Button } from "@workspace/ui/components/button"
import { ComposeForm } from "./compose-form"

type ComposeProps = {
  categories: { id: string; name: string }[]
}

// "New post" button that reveals the compose form in place, and collapses it
// again on cancel or after a successful post.
export function Compose({ categories }: ComposeProps) {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <Button size="sm" className="gap-1" onClick={() => setOpen(true)}>
        <IconPlus className="size-4" />
        New post
      </Button>
    )
  }

  return (
    <ComposeForm
      categories={categories}
      onPosted={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    />
  )
}
