// Authentication helpers. Centralizes reading the current session/user so call
// sites (server components + server actions) don't each re-wire better-auth.
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export async function getCurrentUser() {
  const data = await auth.api.getSession({ headers: await headers() })
  return data?.user ?? null
}

export async function getSession() {
  const data = await auth.api.getSession({ headers: await headers() })
  return data?.session ?? null
}

export type CurrentUser = NonNullable<
  Awaited<ReturnType<typeof getCurrentUser>>
>
