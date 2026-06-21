import { IconFoldersFilled } from "@tabler/icons-react"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

// Shared minimal header for the board layout demos. Static — the user menu /
// log out / new buttons are non-functional placeholders.
export function DemoHeader() {
  return (
    <header className="flex items-center justify-between gap-2 border-b px-4 py-3">
      <div className="flex items-center gap-2">
        <Link href="/demo" className="flex items-center gap-2 font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <IconFoldersFilled className="size-4" />
          </div>
          Bulletin Board
        </Link>
        <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
          Demo — not final
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm">
          + new
        </Button>
        <Button variant="ghost" size="sm">
          alice
        </Button>
        <Button variant="ghost" size="sm">
          log out
        </Button>
      </div>
    </header>
  )
}
