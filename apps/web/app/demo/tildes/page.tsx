import { IconArrowUp, IconMessageCircle } from "@tabler/icons-react"
import { Button } from "@workspace/ui/components/button"
import { Brand, NewPostButton, SearchBox, UserMenu } from "../components/chrome"
import { demoCategories, demoPosts } from "../sample-data"

const sortTabs = ["Activity", "Votes", "Comments", "New"]

// Variant 2 — Tildes: three-column app. Left = groups sidebar, center = sort
// tabs + topic list, right = group info + post panel.
export default function Page() {
  return (
    <div className="min-h-svh">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2">
          <Brand tag="Demo" />
          <SearchBox className="ml-auto w-56" placeholder="Search topics…" />
          <UserMenu />
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[12rem_1fr_16rem]">
        {/* Left: groups */}
        <aside className="hidden lg:block">
          <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Groups
          </p>
          <nav className="space-y-0.5 text-sm">
            <a
              href="#"
              className="block rounded-md bg-accent px-2 py-1 font-medium text-accent-foreground"
            >
              All
            </a>
            {demoCategories.map((c) => (
              <a
                key={c.slug}
                href="#"
                className="flex items-center justify-between rounded-md px-2 py-1 hover:bg-accent"
              >
                <span>~{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.count}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Center: sort tabs + topics */}
        <main className="min-w-0">
          <div className="mb-4 flex items-center gap-1 border-b pb-2 text-sm">
            {sortTabs.map((tab, i) => (
              <a
                key={tab}
                href="#"
                className={`rounded-md px-2 py-1 ${
                  i === 0
                    ? "bg-secondary font-medium text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </a>
            ))}
            <span className="ml-auto text-xs text-muted-foreground">
              all time ▾
            </span>
          </div>

          <ul className="space-y-4">
            {demoPosts.map((post) => (
              <li key={post.id} className="flex gap-3">
                <div className="flex w-9 shrink-0 flex-col items-center gap-0.5 pt-0.5 text-muted-foreground">
                  <IconArrowUp className="size-4 hover:text-primary" />
                  <span className="text-xs font-medium text-foreground">
                    {post.points}
                  </span>
                </div>
                <div className="min-w-0">
                  <a href="#" className="font-medium hover:underline">
                    {post.title}
                  </a>
                  <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                    <span className="text-foreground">~{post.category}</span>
                    <span>by {post.author}</span>
                    <span>{post.time}</span>
                    <span className="inline-flex items-center gap-1">
                      <IconMessageCircle className="size-3.5" />
                      {post.comments}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </main>

        {/* Right: group info + post */}
        <aside className="hidden lg:block">
          <div className="rounded-lg border p-3">
            <p className="font-medium">~all</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Topics from every group, sorted by recent activity.
            </p>
            <NewPostButton label="Post a topic" />
          </div>
          <div className="mt-4 rounded-lg border p-3 text-sm">
            <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Your activity
            </p>
            <div className="flex items-center justify-between py-0.5">
              <span className="text-muted-foreground">Topics</span>
              <span>12</span>
            </div>
            <div className="flex items-center justify-between py-0.5">
              <span className="text-muted-foreground">Comments</span>
              <span>148</span>
            </div>
            <Button variant="link" size="sm" className="mt-1 h-auto px-0">
              Account settings
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
