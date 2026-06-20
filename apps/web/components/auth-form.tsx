import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@workspace/ui/components/field"
import GithubButton from "./github-button"
import Link from "next/link"

type AuthFormProps = React.ComponentProps<"form"> & {
  title: string
  description: string
  submitLabel: string
  githubSignup: boolean
  footer: { prompt: string; linkLabel: string; linkHref: string }
}

export function AuthForm({
  title,
  description,
  submitLabel,
  githubSignup,
  footer,
  className,
  children,
  ...props
}: AuthFormProps) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-balance text-muted-foreground">
            {description}
          </p>
        </div>
        {children}
        <Field>
          <Button type="submit">{submitLabel}</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <GithubButton signup={githubSignup} />
          <FieldDescription className="text-center">
            {footer.prompt}{" "}
            <Link
              href={footer.linkHref}
              className="underline underline-offset-4"
            >
              {footer.linkLabel}
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
