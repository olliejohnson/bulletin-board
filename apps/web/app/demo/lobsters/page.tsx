import { DemoHeader } from "../components/demo-header"
import { categoryName, demoCategories, demoPosts } from "../sample-data"

// Variant 3 — Lobsters: a flat list with the category rendered as a small tag chip.
export default function Page() {
  return (
    <div className="min-h-svh">
      <DemoHeader />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <nav className="mb-5 flex flex-wrap gap-1.5">
          {demoCategories.map((c) => (
            <span
              key={c.slug}
              className="rounded-md bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground"
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
                <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-md bg-secondary px-1.5 py-0.5 text-secondary-foreground">
                    {categoryName(post.category)}
                  </span>
                  by {post.author} · {post.time}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </main>
    </div>
  )
}
