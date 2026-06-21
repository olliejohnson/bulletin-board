import Link from "next/link"
import { Brand } from "./components/chrome"

// Index for the board layout demos. Throwaway design spike — once we pick a
// direction, the winning variant graduates into the real home and /demo is removed.
const variants = [
  {
    href: "/demo/hn",
    title: "Hacker News — flat numbered list",
    description:
      "Section nav (top/new/ask/show/jobs), search, Submit, vote + dense rows, utility footer. No sidebar.",
  },
  {
    href: "/demo/tildes",
    title: "Tildes — three-column app",
    description:
      "Left groups sidebar, center sort/filter tabs + topic list, right group-info + 'Post a topic' panel.",
  },
  {
    href: "/demo/lobsters",
    title: "Lobsters — tags + sidebar",
    description:
      "Section nav, tag-filter sidebar, Submit Story, vote + tag-chip rows with bylines, footer.",
  },
]

export default function Page() {
  return (
    <div className="min-h-svh">
      <header className="border-b">
        <div className="mx-auto max-w-2xl px-4 py-3">
          <Brand tag="Demo" />
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-2xl font-bold">Board layout concepts</h1>
        <p className="mt-2 text-muted-foreground">
          Three minimal, text-forward takes on the post-login board home — each
          a fuller concept with header nav, search, a New Post control, an
          account/settings menu (hover the user chip), and sidebars where the
          reference uses them. Placeholder content. Press <kbd>d</kbd> to toggle
          dark mode.
        </p>
        <ul className="mt-6 space-y-4">
          {variants.map((variant) => (
            <li key={variant.href}>
              <Link href={variant.href} className="font-medium hover:underline">
                {variant.title}
              </Link>
              <p className="text-sm text-muted-foreground">
                {variant.description}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
