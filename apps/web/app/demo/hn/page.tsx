import { IconArrowUp } from "@tabler/icons-react"
import {
  Brand,
  DemoFooter,
  NewPostButton,
  SearchBox,
  UserMenu,
} from "../components/chrome"
import { categoryName, demoPosts } from "../sample-data"

const sections = ["top", "new", "ask", "show", "jobs"]

// Variant 1 — Hacker News: section nav + dense numbered list with vote + rich
// subtext, and a utility footer. No sidebar (HN has none).
export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b bg-primary/5">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2">
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
            <NewPostButton label="Submit" />
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-5">
        <ol className="space-y-2.5">
          {demoPosts.map((post, i) => (
            <li key={post.id} className="flex gap-2">
              <span className="w-5 shrink-0 pt-0.5 text-right text-sm text-muted-foreground tabular-nums">
                {i + 1}.
              </span>
              <button
                type="button"
                className="pt-0.5 text-muted-foreground hover:text-primary"
                aria-label="upvote"
              >
                <IconArrowUp className="size-4" />
              </button>
              <div className="min-w-0">
                <span className="font-medium">
                  <a href="#" className="hover:underline">
                    {post.title}
                  </a>
                  {post.domain ? (
                    <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                      ({post.domain})
                    </span>
                  ) : null}
                </span>
                <p className="text-xs text-muted-foreground">
                  {post.points} points · by {post.author} · {post.time} ·{" "}
                  {categoryName(post.category)} ·{" "}
                  <a href="#" className="hover:underline">
                    {post.comments} comments
                  </a>{" "}
                  ·{" "}
                  <a href="#" className="hover:underline">
                    hide
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </main>

      <DemoFooter
        links={["Guidelines", "FAQ", "API", "Security", "Legal", "Contact"]}
      />
    </div>
  )
}
