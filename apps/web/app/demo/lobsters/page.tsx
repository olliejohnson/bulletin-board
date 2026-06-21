import { IconArrowUp, IconMessageCircle } from "@tabler/icons-react"
import {
  Brand,
  Chip,
  DemoFooter,
  NewPostButton,
  SearchBox,
  UserMenu,
} from "../components/chrome"
import { categoryName, demoCategories, demoPosts } from "../sample-data"

const sections = ["Hottest", "Active", "Recent", "Comments", "Threads"]

// Variant 3 — Lobsters: section nav + tag-filter sidebar + flat list with vote,
// tag chips, and bylines.
export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2">
          <Brand tag="Demo" />
          <nav className="flex items-center gap-3 text-sm text-muted-foreground">
            {sections.map((s, i) => (
              <a
                key={s}
                href="#"
                className={
                  i === 0
                    ? "font-medium text-foreground"
                    : "hover:text-foreground"
                }
              >
                {s}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <SearchBox className="w-44" />
            <NewPostButton label="Submit Story" />
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-5xl flex-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_13rem]">
        <main className="min-w-0">
          <ol className="space-y-3.5">
            {demoPosts.map((post, i) => (
              <li key={post.id} className="flex gap-2.5">
                <div className="flex w-8 shrink-0 flex-col items-center gap-0.5 pt-0.5 text-muted-foreground">
                  <IconArrowUp className="size-4 hover:text-primary" />
                  <span className="text-xs font-medium text-foreground tabular-nums">
                    {post.points}
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="font-medium">
                    <a href="#" className="hover:underline">
                      {post.title}
                    </a>
                    {post.domain ? (
                      <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                        {post.domain}
                      </span>
                    ) : null}
                  </span>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Chip>{categoryName(post.category)}</Chip>
                    <span>
                      via {post.author} · {post.time}
                    </span>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      <IconMessageCircle className="size-3.5" />
                      {post.comments} comments
                    </a>
                  </p>
                </div>
                <span className="ml-auto pt-0.5 text-right text-sm text-muted-foreground tabular-nums">
                  {i + 1}
                </span>
              </li>
            ))}
          </ol>
        </main>

        <aside className="hidden lg:block">
          <NewPostButton label="Submit Story" />
          <p className="mt-4 mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Filter by tag
          </p>
          <div className="flex flex-wrap gap-1.5">
            {demoCategories.map((c) => (
              <a key={c.slug} href="#">
                <Chip>
                  {c.name} · {c.count}
                </Chip>
              </a>
            ))}
          </div>
        </aside>
      </div>

      <DemoFooter
        links={["About", "Chat", "Tags", "Stats", "Search", "Login"]}
      />
    </div>
  )
}
