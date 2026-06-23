# TODO

Tracking suggestions from the structure & style review of `apps/web`.

## Correctness (copy-paste artifacts & bugs)

- [ ] **Wrong strings on sign-in page** — `apps/web/app/sign-in/page.tsx:41-42` logs `"Sign up failed:"` / `"Sign up failed. Please try again."` on the sign-**in** flow.
- [ ] **`redirect()` in client event handlers** — both auth pages call `redirect()` from `next/navigation` inside an async `onSubmit`, which throws `NEXT_REDIRECT`. Use `const router = useRouter(); router.push("/")` instead. (`sign-in/page.tsx`, `sign-up/page.tsx`)
- [ ] **`signOut` not awaited on logout** — `apps/web/app/log-out/route.ts` redirects before `auth.api.signOut()` resolves (fire-and-forget). Await it. Also drop the unused `request` param.
- [ ] **Stale client plugin** — `apps/web/lib/auth-client.ts` still registers `organizationClient()`, but the server dropped `organization()` (migration `removed_orgs`). Remove it.
- [ ] **Hardcoded `http://localhost:3000`** — `auth-client.ts` `baseURL` and the sign-up `callbackURL`. Move to `process.env.NEXT_PUBLIC_BETTER_AUTH_URL`.
- [ ] **`prisma.ts` env wrap** — `` `${process.env.DATABASE_URL}` `` turns a missing var into the string `"undefined"`. Drop the template wrap and/or validate env.
- [ ] **Zod refine path mismatch** — `apps/web/app/sign-up/page.tsx:20` uses `path: ["confirm-password"]` but the schema key is `confirmPassword`.
- [ ] **Remove debug logging** — leftover `console.log("Sign up succeded:" ...)` (note the typo) in the sign-up submit path.

## Style & consistency

- [ ] **Run Prettier across the repo** — it's configured at root but not enforced. Fixes the issues below mechanically.
  - [ ] Inconsistent semicolons within/across files.
  - [ ] Import style drift (`import z from "zod"` vs `import { z } from "zod"`).
  - [ ] Indentation drift (2-space vs 4-space; under-indented JSX in `sign-in/page.tsx`).
- [ ] **`github-button.tsx`** — replace `let text` + if/else with a `const` ternary.

## Structure & duplication

- [ ] **Extract `<AuthLayout>`** — the two-column auth shell (Acme header + image panel) is duplicated verbatim between `sign-in/page.tsx` and `sign-up/page.tsx`.
- [ ] **Consolidate auth forms** — `login-form.tsx` and `signup-form.tsx` are near-identical; share a primitive.
- [ ] **Remove empty `hooks/` directory** in `apps/web`.
- [ ] **Reconsider auth surface** — apiKey + jwt + oauthProvider + admin + username plus hand-rolled `.well-known` routes is heavy while the core app is still scaffold. Trim to what's needed now.

## Project hygiene

- [ ] **Add CI** — gate on `turbo lint && turbo typecheck && turbo format` (would have caught most of the above).
- [ ] **Add a README** (and optionally `CLAUDE.md`) documenting setup, env vars, and the DB host (`kube.local`).
- [ ] **Add tests** — none currently exist.

## Tildes home — graduation notes (when we wire the demo to real data)

We chose the **Tildes** concept (`app/demo/tildes`). When graduating it into the real,
auth-gated home (`app/page.tsx`, replacing the scaffold), keep this architecture:

### Data access: no HTTP API between the web UI and the DB
- **Reads** → Server Components query Prisma directly (the home page is a server
  component). **Writes** → Server Actions (`"use server"`) for create-post,
  subscribe, etc. No REST/GraphQL layer for the web app.
- **Do** add a thin **server-only data-access layer (DAL)** in `lib/` — typed
  functions wrapping Prisma + authorization. Not a network hop; an internal module
  boundary. Centralizes queries and the `published` / `visibility` / session checks
  so they aren't scattered across components.
- **External HTTP API: defer.** Build it only when an outside consumer appears
  (mobile, third-party). Already scaffolded for it: `lib/auth.ts` has better-auth's
  `oauthProvider` + `apiKey` + `jwt` plugins and `post:read`/`post:write`/`category:*`
  scopes. When built, put it in `app/api/...` route handlers that call the **same
  DAL** — one source of truth + authz for web and API.

Sketch of the shape:

```ts
// lib/posts.ts  — server-only DAL
import "server-only"
import { prisma } from "@/lib/prisma"

export function getFeed(opts: { categorySlug?: string; take?: number }) {
  return prisma.post.findMany({
    where: {
      published: true,
      visibility: "PUBLIC",
      ...(opts.categorySlug && { categories: { some: { name: opts.categorySlug } } }),
    },
    include: { author: { select: { username: true, displayUsername: true } }, categories: true },
    orderBy: { createdAt: "desc" }, // recency — no votes/score field yet
    take: opts.take ?? 30,
  })
}

// createPost(session, input) — called from a Server Action; assert session,
// connect categories, set authorId = session.user.id.
```

### Schema gaps for real Tildes-style "groups"
The demo's "groups" map to the existing `Category` model (no `Group` model). For the
real group experience, the schema likely needs:
- [ ] `Category.slug` (URL-friendly; demo renders `~{name}`).
- [ ] A `User` ↔ `Category` **subscription** relation (for "My groups" / subscribed
  highlighting — doesn't exist today).
- [ ] Decide **one group per post** (Tildes semantics) vs. keep `Post.categories[]`
  many-to-many.
- [ ] Derive sidebar **counts** from data (`_count` of posts / subscribers) — the
  demo's numbers are fabricated.
- [ ] Auth-gate `app/page.tsx` and add an **empty state** (no posts yet — there's no
  create-post flow at first).

## Board — feature roadmap (incremental)

Decisions so far: route `/board`; UI noun "Post"; admin-curated categories
(`Category.name @unique`, seeded `General`); category = single + required for **new**
posts (enforced in the compose form, not a DB constraint, so existing uncategorized
posts are fine and left as-is).

- [x] Post-login home at `/board` (feed + compose) with DAL + tests.
- [x] Seed `General`; unique category name.
- [ ] **Compose category picker** — single, required `<select>` from `getCategories()`;
  `createPostAction` validates the id; `createPost` connects it. (next)
- [ ] **Post detail view** at `/board/[postId]` — click a post title to open it; shows
  the full post (later: comments). **Author-only category change** from this view
  (server action gated by `session.user.id === post.authorId`; this is where category
  re-assignment lives, vs. set-at-creation in compose).
- [ ] **Category filtering** — click `~category` in the sidebar to filter the feed
  (`getFeed({ categoryName })`). Note: uncategorized posts only appear in "all".
- [ ] Optional later: backfill the existing uncategorized posts into `General` before
  enabling category filtering, if we want every post categorized.
