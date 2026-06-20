import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  auth.api.signOut({
    headers: await headers(),
  })

  redirect("/sign-in")
}
