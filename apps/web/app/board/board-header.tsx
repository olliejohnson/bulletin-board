import Link from "next/link"
import { IconFoldersFilled } from "@tabler/icons-react"
import { getCurrentUser } from "@/lib/session"

// Shared board header (server component). Fetches the session itself so pages
// don't have to thread the viewer through.
export async function BoardHeader() {
  const user = await getCurrentUser()
  const viewer = user?.name ?? user?.email ?? "you"

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2">
        <Link href="/board" className="flex items-center gap-2 font-semibold">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <IconFoldersFilled className="size-4" />
          </div>
          Bulletin Board
        </Link>
        <div className="ml-auto flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">{viewer}</span>
          <Link href="/log-out" className="hover:underline">
            Log out
          </Link>
        </div>
      </div>
    </header>
  )
}
