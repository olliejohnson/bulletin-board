import { headers } from "next/headers"
import Link from "next/link"
import { IconFoldersFilled, IconMessageCircle } from "@tabler/icons-react"
import { auth } from "@/lib/auth"
import { getCategories } from "@/lib/categories"
import { getFeed, type FeedPost } from "@/lib/posts"
import { ComposeForm } from "./compose-form"

function authorName(author: FeedPost["author"]) {
  return author.displayUsername ?? author.username ?? author.name
}

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ]
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  for (const [unit, secs] of units) {
    if (seconds >= secs) return rtf.format(-Math.floor(seconds / secs), unit)
  }
  return "just now"
}

export default async function Page() {
  const [session, posts, categories] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    getFeed(),
    getCategories(),
  ])
  const viewer = session?.user?.name ?? session?.user?.email ?? "you"

  return (
    <div className="flex min-h-svh flex-col">
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

      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 lg:grid-cols-[12rem_1fr]">
        {/* Left: categories */}
        <aside className="hidden lg:block">
          <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Categories
          </p>
          <nav className="space-y-0.5 text-sm">
            {categories.length === 0 ? (
              <p className="px-2 py-1 text-muted-foreground">None yet</p>
            ) : (
              categories.map((c) => (
                <span
                  key={c.id}
                  className="flex items-center justify-between rounded-md px-2 py-1 hover:bg-accent"
                >
                  <span>~{c.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {c._count.posts}
                  </span>
                </span>
              ))
            )}
          </nav>
        </aside>

        {/* Center: compose + feed */}
        <main className="min-w-0">
          <ComposeForm />

          <ul className="mt-6 space-y-4">
            {posts.length === 0 ? (
              <li className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                No posts yet. Be the first to post.
              </li>
            ) : (
              posts.map((post) => (
                <li key={post.id} className="border-b pb-4 last:border-b-0">
                  <h2 className="font-medium">{post.title}</h2>
                  {post.content ? (
                    <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
                      {post.content}
                    </p>
                  ) : null}
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                    {post.categories.map((c) => (
                      <span key={c.id} className="text-foreground">
                        ~{c.name}
                      </span>
                    ))}
                    <span>by {authorName(post.author)}</span>
                    <span>{timeAgo(post.createdAt)}</span>
                    <span className="inline-flex items-center gap-1">
                      <IconMessageCircle className="size-3.5" />0
                    </span>
                  </p>
                </li>
              ))
            )}
          </ul>
        </main>
      </div>
    </div>
  )
}
