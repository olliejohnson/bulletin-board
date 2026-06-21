"use client"

import { useState, type ReactNode } from "react"
import { IconPlus } from "@tabler/icons-react"
import { Button } from "@workspace/ui/components/button"
import { ComposeForm } from "./compose-form"

type ComposerProps = {
  categories: { id: string; name: string }[]
  filterName: string
  filterDescription: string
  children: ReactNode // the feed (server-rendered, passed through)
}

// Owns the compose open-state shared across two columns: the "Post a Topic"
// button lives in the right tile, and the form reveals in the center column
// (where it has room). Collapses on cancel or a successful post.
export function Composer({
  categories,
  filterName,
  filterDescription,
  children,
}: ComposerProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <main className="min-w-0">
        {open ? (
          <div className="mb-6">
            <ComposeForm
              categories={categories}
              onPosted={() => setOpen(false)}
              onCancel={() => setOpen(false)}
            />
          </div>
        ) : null}
        {children}
      </main>

      <aside className="hidden lg:block">
        <div className="rounded-lg border p-3">
          <p className="font-medium">~{filterName}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {filterDescription}
          </p>
          <Button
            size="sm"
            className="mt-3 w-full gap-1"
            onClick={() => setOpen(true)}
          >
            <IconPlus className="size-4" />
            Post a Topic
          </Button>
        </div>
      </aside>
    </>
  )
}
