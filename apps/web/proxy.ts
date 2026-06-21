import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/session"

export async function proxy(request: NextRequest) {
  const user = getCurrentUser()

  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sign-up|sign-in|demo|.well-known).*)",
  ],
}
