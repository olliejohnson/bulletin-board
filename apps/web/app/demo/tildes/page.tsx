import { DemoHeader } from "../components/demo-header"
import { demoCategories, demoPosts } from "../sample-data"

// Variant 2 — Tildes: posts grouped under category headings.
export default function Page() {
  const groups = demoCategories
    .map((category) => ({
      category,
      posts: demoPosts.filter((p) => p.category === category.slug),
    }))
    .filter((group) => group.posts.length > 0)

  return (
    <div className="min-h-svh">
      <DemoHeader />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="space-y-7">
          {groups.map((group) => (
            <section key={group.category.slug}>
              <h2 className="mb-2 border-b pb-1 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                {group.category.name}
              </h2>
              <ul className="space-y-3">
                {group.posts.map((post) => (
                  <li key={post.id}>
                    <a href="#" className="font-medium hover:underline">
                      {post.title}
                    </a>
                    <p className="text-xs text-muted-foreground">
                      by {post.author} · {post.time}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
