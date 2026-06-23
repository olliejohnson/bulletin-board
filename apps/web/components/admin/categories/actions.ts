"use server"

import * as categories from "@/lib/categories"

export async function createCategory(props: {
  name: string
  description?: string | undefined
}) {
  await categories.createCategory(props)
}

export async function deleteCategory(id: string) {
  await categories.deleteCategory({ id })
}
