// Authorization policies — the single source of truth for "who can do what".
//
// These are pure predicates over plain data (a user + the resource), so they:
//   - are trivially unit-testable (no DB/session mocking), and
//   - can be used in BOTH places every gate needs them:
//       * server actions / DAL — the real security boundary (enforce), and
//       * the UI — to decide whether to render a control (UX only).
// The UI check is convenience; the server check is the guarantee.

type AuthzUser = { id: string; role?: string | null } | null | undefined
type Owned = { authorId: string }

export function isAdmin(user: AuthzUser): boolean {
  return user?.role === "admin"
}

export function isPostAuthor(user: AuthzUser, post: Owned): boolean {
  return !!user && user.id === post.authorId
}

export function canChangePostCategory(user: AuthzUser, post: Owned): boolean {
  return isPostAuthor(user, post)
}
