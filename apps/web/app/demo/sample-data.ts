// Placeholder content for the board layout demos. Not real data — these pages
// are a throwaway design spike (see app/demo/page.tsx).

export type DemoCategory = {
  slug: string
  name: string
  description: string
  count: number
}

export type DemoPost = {
  id: number
  title: string
  excerpt: string
  author: string
  category: string // category slug
  time: string // relative, e.g. "2h ago"
  points: number
  comments: number
  domain?: string
}

export const demoCategories: DemoCategory[] = [
  {
    slug: "general",
    name: "general",
    description: "Anything and everything",
    count: 128,
  },
  {
    slug: "dev",
    name: "dev",
    description: "Building and breaking things",
    count: 86,
  },
  {
    slug: "random",
    name: "random",
    description: "Off-topic chatter",
    count: 54,
  },
  {
    slug: "meta",
    name: "meta",
    description: "About the board itself",
    count: 19,
  },
]

export const demoPosts: DemoPost[] = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    excerpt:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "mod",
    category: "meta",
    time: "1h ago",
    points: 12,
    comments: 4,
  },
  {
    id: 2,
    title: "Ut enim ad minim veniam, quis nostrud exercitation",
    excerpt: "Ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "alice",
    category: "dev",
    time: "3h ago",
    points: 87,
    comments: 23,
    domain: "github.com",
  },
  {
    id: 3,
    title: "Duis aute irure dolor in reprehenderit in voluptate",
    excerpt: "Velit esse cillum dolore eu fugiat nulla pariatur excepteur.",
    author: "bob",
    category: "random",
    time: "5h ago",
    points: 34,
    comments: 11,
  },
  {
    id: 4,
    title: "Excepteur sint occaecat cupidatat non proident",
    excerpt: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: "carol",
    category: "dev",
    time: "8h ago",
    points: 56,
    comments: 9,
    domain: "nextjs.org",
  },
  {
    id: 5,
    title: "Sed ut perspiciatis unde omnis iste natus error",
    excerpt: "Sit voluptatem accusantium doloremque laudantium totam rem.",
    author: "dan",
    category: "general",
    time: "12h ago",
    points: 8,
    comments: 2,
  },
  {
    id: 6,
    title: "Nemo enim ipsam voluptatem quia voluptas sit",
    excerpt: "Aspernatur aut odit aut fugit, sed quia consequuntur magni.",
    author: "erin",
    category: "general",
    time: "1d ago",
    points: 21,
    comments: 6,
  },
  {
    id: 7,
    title: "Neque porro quisquam est qui dolorem ipsum quia",
    excerpt:
      "Dolor sit amet, consectetur, adipisci velit, sed quia non numquam.",
    author: "frank",
    category: "random",
    time: "1d ago",
    points: 5,
    comments: 1,
  },
  {
    id: 8,
    title: "At vero eos et accusamus et iusto odio dignissimos",
    excerpt: "Ducimus qui blanditiis praesentium voluptatum deleniti atque.",
    author: "grace",
    category: "meta",
    time: "2d ago",
    points: 41,
    comments: 14,
    domain: "bulletin.example",
  },
]

export function categoryName(slug: string): string {
  return demoCategories.find((c) => c.slug === slug)?.name ?? slug
}
