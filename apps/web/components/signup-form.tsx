import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { AuthForm } from "./auth-form"

export function SignupForm({
  error,
  ...props
}: { error: string } & React.ComponentProps<"form">) {
  return (
    <AuthForm
      title="Create your account"
      description="Fill in the form below to create your account"
      submitLabel="Create Account"
      githubSignup={true}
      footer={{
        prompt: "Already have an account?",
        linkLabel: "Sign in",
        linkHref: "/sign-in",
      }}
      {...props}
    >
      <Field>
        <FieldLabel htmlFor="name">Full Name</FieldLabel>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          required
          className="bg-background"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="johndoe"
          required
          className="bg-background"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
          className="bg-background"
        />
        <FieldDescription>
          We&apos;ll use this to contact you. We will not share your email with
          anyone else.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          id="password"
          type="password"
          name="password"
          required
          className="bg-background"
        />
        <FieldDescription>
          {error || "Must be at least 8 characters long."}
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
        <Input
          id="confirm-password"
          name="confirm-password"
          type="password"
          required
          className="bg-background"
        />
        <FieldDescription>Please confirm your password.</FieldDescription>
      </Field>
    </AuthForm>
  )
}
