"use client"

import { startTransition, useActionState } from "react"
import { Button } from "@workspace/ui/components/button"
import { updatePostCategoryAction, type UpdateCategoryState } from "./actions"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import z from "zod"
import { useForm } from "@tanstack/react-form"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import LoadingDots from "@/components/loading-dots"

const initialState: UpdateCategoryState = {}

type CategoryEditorProps = {
  postId: string
  currentCategoryId?: string
  categories: { id: string; name: string }[]
}

const schema = z.object({
  category: z.string().min(1, "Please select a category."),
})

export function CategoryEditor({
  postId,
  currentCategoryId,
  categories,
}: CategoryEditorProps) {
  const [state, formAction, pending] = useActionState(
    updatePostCategoryAction,
    initialState
  )

  const form = useForm({
    defaultValues: {
      category: currentCategoryId,
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      startTransition(() => {
        formAction({
          postId: postId,
          categoryId: value.category!,
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
      className="mt-2 flex items-end gap-2"
    >
      <form.Field name="category">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field orientation="responsive" data-invalid={isInvalid}>
              <FieldLabel
                htmlFor="category-select"
                className="text-xs text-muted-foreground"
              >
                Category
              </FieldLabel>
              <Select
                name={field.name}
                value={field.state.value}
                onValueChange={field.handleChange}
              >
                <SelectTrigger
                  className="h-7 rounded-md border bg-background px-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  id="category-select"
                  data-value={field.state.value}
                >
                  <SelectValue placeholder="Choose a category..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((c) => (
                      <SelectItem
                        value={c.id}
                        key={c.id}
                        aria-label={`~${c.name}`}
                        id={c.id}
                      >
                        ~{c.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )
        }}
      </form.Field>
      <div className="flex flex-2 items-center space-x-2">
        <Button
          type="submit"
          size="sm"
          variant="outline"
          disabled={pending}
          className="h-7"
        >
          {/*pending ? "Saving…" : "Change"*/}
          {pending ? (
            <div className="flex flex-2 items-end justify-between space-x-1.5">
              <p>Saving</p>
              <LoadingDots />
            </div>
          ) : (
            "Change"
          )}
        </Button>
        {state.error ? (
          <span className="text-xs text-destructive">{state.error}</span>
        ) : null}
        {state.ok ? (
          <span className="text-xs text-muted-foreground">Saved.</span>
        ) : null}
      </div>
    </form>
  )
}
