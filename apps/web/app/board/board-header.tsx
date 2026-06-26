import Link from "next/link"
import {
  IconCategory,
  IconFoldersFilled,
  IconLayout2,
  IconSettings2,
  IconUser,
  IconUsers,
} from "@tabler/icons-react"
import { getCurrentUser } from "@/lib/session"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className="text-muted-foreground hover:cursor-pointer hover:underline">
                {viewer}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-41" align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  <IconUser />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconSettings2 />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              {user?.role === "admin" ? (
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Admin</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/admin/dashboard"
                      className="hover:cursor-pointer"
                    >
                      <IconLayout2 />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/users" className="hover:cursor-pointer">
                      <IconUsers />
                      Users
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/admin/categories"
                      className="hover:cursor-pointer"
                    >
                      <IconCategory />
                      Categories
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              ) : (
                <></>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/log-out" className="hover:underline">
            Log out
          </Link>
        </div>
      </div>
    </header>
  )
}
