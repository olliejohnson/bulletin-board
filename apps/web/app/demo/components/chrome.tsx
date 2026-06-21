import {
  IconFoldersFilled,
  IconSearch,
  IconPlus,
  IconBell,
  IconSettings,
  IconUser,
  IconChevronDown,
  IconLogout,
  IconMoon,
} from "@tabler/icons-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import Link from "next/link"
import type { ReactNode } from "react"

// Shared static chrome atoms for the board layout demos. Non-functional — these
// depict controls so collaborators can judge the information architecture.

export function Brand({ tag }: { tag?: string }) {
  return (
    <div className="flex items-center gap-2">
      <Link href="/demo" className="flex items-center gap-2 font-semibold">
        <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <IconFoldersFilled className="size-4" />
        </div>
        Bulletin Board
      </Link>
      {tag ? (
        <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
          {tag}
        </span>
      ) : null}
    </div>
  )
}

export function SearchBox({
  placeholder = "Search posts…",
  className = "",
}: {
  placeholder?: string
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <IconSearch className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
      <Input placeholder={placeholder} className="bg-background pl-7" />
    </div>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground">
      {children}
    </span>
  )
}

export function Avatar({ name }: { name: string }) {
  return (
    <span className="flex size-6 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground uppercase">
      {name.slice(0, 2)}
    </span>
  )
}

export function NewPostButton({ label = "New post" }: { label?: string }) {
  return (
    <Button size="sm" className="gap-1">
      <IconPlus className="size-4" />
      {label}
    </Button>
  )
}

// The account/settings menu, revealed on hover over the user chip (CSS only).
export function UserMenu() {
  const items = [
    { icon: IconUser, label: "Profile" },
    { icon: IconSettings, label: "Settings" },
    { icon: IconBell, label: "Notifications" },
    { icon: IconMoon, label: "Appearance" },
  ]
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm hover:bg-accent"
      >
        <Avatar name="alice" />
        alice
        <IconChevronDown className="size-3.5 text-muted-foreground" />
      </button>
      <div className="absolute right-0 z-20 mt-1 hidden w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md group-hover:block">
        <div className="px-2 py-1.5 text-xs text-muted-foreground">
          Signed in as alice
        </div>
        <div className="my-1 h-px bg-border" />
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
          >
            <item.icon className="size-4 text-muted-foreground" />
            {item.label}
          </div>
        ))}
        <div className="my-1 h-px bg-border" />
        <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent">
          <IconLogout className="size-4 text-muted-foreground" />
          Log out
        </div>
      </div>
    </div>
  )
}

export function DemoFooter({ links }: { links: string[] }) {
  return (
    <footer className="mt-10 border-t">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-4 text-xs text-muted-foreground">
        <span className="text-muted-foreground/70">Demo — not final ·</span>
        {links.map((label) => (
          <a
            key={label}
            href="#"
            className="hover:text-foreground hover:underline"
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
