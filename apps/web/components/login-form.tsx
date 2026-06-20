import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import GithubButton from "./github-button"
import Link from "next/link"
import z from "zod"
import { useForm } from "@tanstack/react-form"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"

const formSchema = z.object({
    username: z.string()
      .min(3, "Username must be at least 3 characters long.")
      .max(30, "Username must be at most 30 characters long."),
    password: z.string()
      .min(8, "Password must be at least 8 characters long.")
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const { data, error } = await authClient.signIn.username({
        username: value.username,
        password: value.password
      })

      if (error) {
        formApi.setErrorMap({
          onSubmit: { form: "Invalid username or password", fields: {} }
        })
      }

      redirect("/")
    }
  })

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={(e) => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    }} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
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
                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
              />
              {(field.state.meta.isTouched && !field.state.meta.isValid) && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                required
                className="bg-background"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
              />
              {(field.state.meta.isTouched && !field.state.meta.isValid) && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <GithubButton signup={false} />
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
