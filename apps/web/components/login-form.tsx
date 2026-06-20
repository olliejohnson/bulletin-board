import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { AuthForm } from "./auth-form"

export function LoginForm({
  error,
  ...props
}: { error: string } & React.ComponentProps<"form">) {
  return (
    <AuthForm
      title="Login to your account"
      description="Enter your email below to login to your account"
      submitLabel="Login"
      githubSignup={false}
      footer={{
        prompt: "Don't have an account?",
        linkLabel: "Sign up",
        linkHref: "/sign-up",
      }}
      {...props}
    >
      <Field>
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder=""
          required
          className="bg-background"
        />
      </Field>
      <Field>
        <div className="flex items-center">
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <a
            href="#"
            className="ml-auto text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          required
          className="bg-background"
        />
        <FieldDescription>
          {error ? <span className="text-red-500">{error}</span> : ""}
        </FieldDescription>
      </Field>
    </AuthForm>
  )
}
