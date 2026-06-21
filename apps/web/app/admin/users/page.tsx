"use server"

import { User } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import * as React from "react"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { SiteHeader } from "@/components/admin/site-header"

export async function getData(): Promise<User[]> {
  return prisma.user.findMany()
}

export default async function UsersPage() {
  const data = await getData()

  return (
    <>
      <SiteHeader title="Users" />
      <div className="container mx-auto p-3">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
