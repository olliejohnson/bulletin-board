"use client"

import { User } from "@/generated/prisma/client"
import { IconDiscountCheck, IconCircleX } from "@tabler/icons-react"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@workspace/ui/components/avatar"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@workspace/ui/components/tooltip"

export default function ProfileHeader({ user }: { user: User }) {
  return (
    <div className="flex flex-2 justify-start space-x-3">
      <Avatar className="size-24">
        <AvatarImage src={user.image || undefined} />
        <AvatarFallback>FB</AvatarFallback>
      </Avatar>
      <div className="grid-cols-1">
        <p className="text-2xl">{user.name}</p>
        <div className="flex flex-2 items-center space-x-3">
          {user.emailVerified ? (
            <IconDiscountCheck className="size-4 text-muted-foreground" />
          ) : (
            <IconCircleX className="size-4 text-muted-foreground" />
          )}
          <p className="text-lg text-muted-foreground">
            {user.email} - {user.role}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <p
                className="text-sm text-muted-foreground"
                onClick={() => navigator.clipboard.writeText(user.id)}
              >
                {user.displayUsername}
              </p>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="text-sm">Click to copy User ID</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
