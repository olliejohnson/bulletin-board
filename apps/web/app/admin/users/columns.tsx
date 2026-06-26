"use client"

import { revalidate } from "@/lib/actions"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { Relative } from "@/components/relative-date"
import { User } from "@/generated/prisma/client"
import { authClient } from "@/lib/auth-client"
import {
  IconCircleCheck,
  IconCircleX,
  IconClipboard,
  IconDotsVertical,
  IconEye,
  IconHammer,
  IconShield,
  IconTrash,
  IconUser,
  IconUserCog,
  IconUserQuestion,
  IconUserShare,
} from "@tabler/icons-react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const user = row.original

      return (
        <Link href={`/admin/users/${user.id}`} className="hover:underline">
          {user.name}
        </Link>
      )
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as "user" | "admin"
      if (role === "user") {
        return (
          <Badge variant="secondary">
            <IconUser />
            User
          </Badge>
        )
      } else if (role === "admin") {
        return (
          <Badge variant="secondary">
            <IconUserCog />
            Admin
          </Badge>
        )
      } else {
        return (
          <Badge variant="secondary">
            <IconUserQuestion />
            Invalid
          </Badge>
        )
      }
    },
  },
  {
    accessorKey: "emailVerified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email Verified" />
    ),
    cell: ({ row }) => {
      const verified = row.getValue("emailVerified") as boolean
      if (verified) {
        return (
          <Badge className="bg-green-500/10 text-green-500 focus-visible:ring-green-500/20 dark:bg-green-500/20 dark:focus-visible:ring-green-500/40 [a]:hover:bg-green-500/20">
            <IconCircleCheck />
            Verified
          </Badge>
        )
      } else {
        return (
          <Badge variant="destructive">
            <IconCircleX />
            Not Verified
          </Badge>
        )
      }
    },
  },
  {
    accessorKey: "banned",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Banned" />
    ),
    cell: ({ row }) => {
      const banned = row.getValue("banned") as boolean
      if (banned) {
        return (
          <Badge variant="destructive">
            <IconCircleX />
            Banned
          </Badge>
        )
      } else {
        return (
          <Badge className="bg-green-500/10 text-green-500 focus-visible:ring-green-500/20 dark:bg-green-500/20 dark:focus-visible:ring-green-500/40 [a]:hover:bg-green-500/20">
            <IconCircleCheck />
            Unbanned
          </Badge>
        )
      }
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const user = row.original

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Relative date={user.createdAt} />
            </span>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p className="text-sm">{user.createdAt.toLocaleString()}</p>
          </TooltipContent>
        </Tooltip>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const user = row.original

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <IconDotsVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.id)}
              >
                <IconClipboard />
                Copy User ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  redirect(`/admin/users/${user.id}`)
                }}
              >
                <IconEye />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  if (user.banned) {
                    await authClient.admin.unbanUser({
                      userId: user.id,
                    })
                  } else {
                    await authClient.admin.banUser({
                      userId: user.id,
                    })
                  }
                  table.options.meta?.updateData()
                }}
              >
                {user.banned ? (
                  <>
                    <IconShield /> Unban User
                  </>
                ) : (
                  <>
                    <IconHammer /> Ban User
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await authClient.admin.impersonateUser({
                    userId: user.id,
                  })
                  revalidate("/board")
                  redirect("/board")
                }}
              >
                <IconUserShare />
                Impersonate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialogTrigger asChild>
                <DropdownMenuItem variant="destructive">
                  <IconTrash />
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <IconTrash />
              </AlertDialogMedia>
              <AlertDialogTitle>Delete user?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this user.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={async () => {
                  await authClient.admin.removeUser({
                    userId: user.id,
                  })
                  table.options.meta?.updateData()
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    },
  },
]
