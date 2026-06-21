"use client"

import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { User } from "@/generated/prisma/client"
import {
  IconArrowsSort,
  IconArrowsUpDown,
  IconCircleCheck,
  IconCircleX,
  IconDotsVertical,
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return (
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
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Ban User</DropdownMenuItem>
            <DropdownMenuItem>Impersonate User</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
