import Link from "next/link"
import { IconMessageCircle } from "@tabler/icons-react"
import { getCategories } from "@/lib/categories"
import { getFeed } from "@/lib/posts"
import { BoardHeader } from "./board-header"
import { Composer } from "./composer"
import { authorName, timeAgo } from "./format"

export default async function Page() {
  const [posts, categories] = await Promise.all([getFeed(), getCategories()])

  return (
    <div className="flex min-h-svh flex-col">
      <BoardHeader />

      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 lg:grid-cols-[12rem_1fr_16rem]">
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

        {/* Center (feed) + right (filter tile + compose trigger) */}
        <Composer
          categories={categories}
          filterName="all"
          filterDescription="Every category, newest first."
        >
          <ul className="space-y-4">
            {posts.length === 0 ? (
              <li className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                No posts yet. Be the first to post.
              </li>
            ) : (
              posts.map((post) => (
                <li key={post.id} className="border-b pb-4 last:border-b-0">
                  <h2 className="font-medium">
                    <Link
                      href={`/board/${post.id}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h2>
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
        </Composer>
      </div>
    </div>
  )
}
