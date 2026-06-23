"use client"

import { IconPlus } from "@tabler/icons-react"
import { useForm } from "@tanstack/react-form"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Field } from "@workspace/ui/components/field"
import { Spinner } from "@workspace/ui/components/spinner"
import z from "zod"
import { Input } from "@workspace/ui/components/input"
import { createCategory } from "./actions"
import { useState } from "react"
import { Table } from "@tanstack/react-table"

const schema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
})

const defaultValues: z.input<typeof schema> = {
  name: "",
  description: "",
}

export function NewCategoryButton<TData>({ table }: { table: Table<TData> }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true)
      await createCategory(value)
      setLoading(false)
      setOpen(false)
      table.options.meta?.updateData()
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="hidden h-8 lg:flex">
          <IconPlus />
          New Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
          <DialogDescription>Create a new category.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            console.log("form submitted")
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          id="new-category-form"
        >
          <FieldGroup>
            <form.Field name="name">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder=""
                    required
                    className="bg-background"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>
            <form.Field name="description">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder=""
                    required
                    className="bg-background"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button type="submit" form="new-category-form" disabled={loading}>
            {loading ? (
              <>
                <Spinner className="size-4" data-icon="inline-start" />
                Processing
              </>
            ) : (
              "Create Category"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
