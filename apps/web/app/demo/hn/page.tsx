import { DemoHeader } from "../components/demo-header"
import { categoryName, demoCategories, demoPosts } from "../sample-data"

// Variant 1 — Hacker News: a flat, numbered list with the category shown inline
// in the meta line.
export default function Page() {
  return (
    <div className="min-h-svh">
      <DemoHeader />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <nav className="mb-5 flex flex-wrap gap-x-3 gap-y-1 text-sm">
          <span className="font-medium text-foreground">all</span>
          {demoCategories.map((c) => (
            <span
              key={c.slug}
              className="text-muted-foreground hover:text-foreground"
            >
              {c.name}
            </span>
          ))}
        </nav>
        <ol className="space-y-3.5">
          {demoPosts.map((post, i) => (
            <li key={post.id} className="flex gap-2.5">
              <span className="w-5 shrink-0 pt-px text-right text-sm text-muted-foreground tabular-nums">
                {i + 1}.
              </span>
              <div className="min-w-0">
                <a href="#" className="font-medium hover:underline">
                  {post.title}
                </a>
                <p className="text-xs text-muted-foreground">
                  {categoryName(post.category)} · by {post.author} · {post.time}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </main>
    </div>
  )
}
