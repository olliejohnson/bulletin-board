"use client"

import { revalidate } from "@/lib/actions"
import { deletePost } from "@/lib/actions"
import { canDeletePost } from "@/lib/permissions"
import { IconEye, IconTrash } from "@tabler/icons-react"
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@workspace/ui/components/context-menu"
import { redirect } from "next/navigation"

export function PostContext({
  post,
  children,
  key,
  user,
}: {
  post: { id: string; authorId: string }
  children: React.ReactNode
  key: string
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
  const canDelete = canDeletePost(
    { id: user?.id ?? "", role: user?.role ?? "user" },
    { authorId: post.authorId }
  )

  return (
    <ContextMenu key={key}>
      <ContextMenuTrigger className="p-2">{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuGroup>
          <ContextMenuItem
            onClick={async () => {
              redirect(`/board/${post.id}`)
            }}
          >
            <IconEye />
            View
          </ContextMenuItem>
          {canDelete && (
            <>
              <ContextMenuSeparator />
              <ContextMenuItem
                variant="destructive"
                onClick={async () => {
                  await deletePost({ postId: post.id })
                  revalidate(location.pathname)
                }}
              >
                <IconTrash />
                Delete
              </ContextMenuItem>
            </>
          )}
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
