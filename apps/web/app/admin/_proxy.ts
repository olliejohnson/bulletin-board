import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"

export async function adminProxy(request: NextRequest) {
  const user = await getCurrentUser()

  if (user?.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}
