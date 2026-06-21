"use client"

import { authClient } from "@/lib/auth-client"
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
import z from "zod"
import { Input } from "@workspace/ui/components/input"
import { Checkbox } from "@workspace/ui/components/checkbox"

const schema = z.object({
  name: z.string(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long."),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  isAdmin: z.boolean(),
})

export function NewUserButton() {
  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      isAdmin: false,
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      await authClient.admin.createUser({
        name: value.name,
        email: value.email,
        password: value.password,
        role: value.isAdmin ? "admin" : "user",
        data: {
          username: value.username,
        },
      })
    },
  })

  return (
    <Dialog>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <DialogTrigger asChild>
          <Button variant="default" size="sm" className="hidden h-8 lg:flex">
            <IconPlus />
            New User
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>New User</DialogTitle>
            <DialogDescription>Create a new user.</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <form.Field name="name">
              {(field) => (
                <Field>
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
            <form.Field name="username">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Username</FieldLabel>
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
            <form.Field name="email">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
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
            <form.Field name="password">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
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
            <form.Field name="isAdmin">
              {(field) => (
                <Field orientation="horizontal">
                  <Checkbox
                    checked={field.state.value}
                    onCheckedChange={(value) =>
                      field.handleChange(value.valueOf() as boolean)
                    }
                  />
                  <FieldLabel htmlFor={field.name}>Is Admin</FieldLabel>
                </Field>
              )}
            </form.Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="submit">Create User</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
