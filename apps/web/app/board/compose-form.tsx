"use client"

import { startTransition, useActionState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { createPostAction, type ComposeState } from "./actions"
import { useForm } from "@tanstack/react-form"
import z from "zod"
import LoadingDots from "@/components/loading-dots"
import { Field, FieldError, FieldGroup } from "@workspace/ui/components/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

const initialState: ComposeState = {}

type ComposeFormProps = {
  categories: { id: string; name: string }[]
}

const composeSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(200),
  content: z.string().trim().max(5000).optional(),
  categoryId: z.string().min(1, "Choose a category."),
})

const defaultValues: z.input<typeof composeSchema> = {
  title: "",
  categoryId: "",
}

export function ComposeForm({ categories }: ComposeFormProps) {
  const [state, formAction, pending] = useActionState(
    createPostAction,
    initialState
  )

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: composeSchema,
    },
    onSubmit: async ({ value }) => {
      startTransition(() => {
        formAction({
          title: value.title,
          content: value.content,
          categoryId: value.categoryId,
        })
      })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="rounded-lg border bg-card p-3"
      key={state.ok ? "posted" : "compose"}
    >
      <FieldGroup>
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <Input
                  name={field.name}
                  placeholder="Title"
                  required
                  maxLength={200}
                  className="-mt-1 bg-background"
                  aria-invalid={isInvalid}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="categoryId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                  required
                >
                  <SelectTrigger
                    id="compose-form-category"
                    aria-invalid={isInvalid}
                    className="-my-1 min-w-30"
                    aria-label="Category"
                  >
                    <SelectValue placeholder="Choose a category..." />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        ~{c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="content">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Say something... (optional)"
                  className="-mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
      </FieldGroup>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-xs text-destructive">{state.error ?? ""}</span>
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? (
            <>
              Posting
              <LoadingDots />
            </>
          ) : (
            "New post"
          )}
        </Button>
      </div>
    </form>
  )
}
