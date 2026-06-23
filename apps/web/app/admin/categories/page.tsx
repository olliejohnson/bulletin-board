"use server"

import { prisma } from "@/lib/prisma"
import * as React from "react"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { SiteHeader } from "@/components/admin/site-header"

export type CategoryTable = NonNullable<Awaited<ReturnType<typeof getData>>>[0]

export async function getData() {
  return prisma.category.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      _count: true,
    },
  })
}

export default async function UsersPage() {
  const data = await getData()

  return (
    <>
      <SiteHeader title="Categories" />
      <div className="container mx-auto p-3">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
