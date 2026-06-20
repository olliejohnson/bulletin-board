import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  auth.api.signOut({
    headers: await headers(),
  })

  redirect("/sign-in")
}
