"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "@workspace/ui/components/button"
import { revalidate } from "../lib/actions"

export default function ImpersonateBanner({
  user,
}: {
  user: {
    id: string
    createdAt: Date
    updatedAt: Date
    email: string
    emailVerified: boolean
    name: string
    image?: string | null | undefined
    username?: string | null | undefined
    displayUsername?: string | null | undefined
    banned: boolean | null | undefined
    role?: string | null | undefined
    banReason?: string | null | undefined
    banExpires?: Date | null | undefined
  } | null
}) {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-2 md:px-4 2xl:max-w-350">
        <div className="flex items-center justify-between gap-x-6 p-2">
          <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="text-xs leading-6">
              You are impersonating <strong>{user?.name}</strong>
            </p>
            <Button
              size="sm"
              variant="ghost"
              className="flex items-center gap-x-1"
              onClick={async () => {
                await authClient.admin.stopImpersonating()
                revalidate(location.pathname)
              }}
            >
              Stop impersonating
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
