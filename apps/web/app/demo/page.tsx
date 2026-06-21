import { DemoHeader } from "./components/demo-header"
import Link from "next/link"

// Index for the board layout demos. Throwaway design spike — once we pick a
// direction, the winning variant graduates into the real home and /demo is removed.
const variants = [
  {
    href: "/demo/hn",
    title: "Hacker News — flat numbered list",
    description:
      "One dense, numbered list. Category shown inline in the meta line.",
  },
  {
    href: "/demo/tildes",
    title: "Tildes — grouped by category",
    description: "Posts grouped under category headings.",
  },
  {
    href: "/demo/lobsters",
    title: "Lobsters — tag chips",
    description: "Flat list with the category rendered as a small tag chip.",
  },
]

export default function Page() {
  return (
    <div className="min-h-svh">
      <DemoHeader />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-2xl font-bold">Board layout demos</h1>
        <p className="mt-2 text-muted-foreground">
          Three minimal, text-forward takes on the post-login board home, with
          placeholder content. Press <kbd>d</kbd> to toggle dark mode.
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
