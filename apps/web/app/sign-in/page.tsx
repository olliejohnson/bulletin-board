"use client"
import { LoginForm } from "@/components/login-form"
import { authClient } from "@/lib/auth-client"
import { IconFoldersFilled } from "@tabler/icons-react"
import { redirect } from "next/navigation"
import { SubmitEvent, useState } from "react"
import z from "zod"

const signInSchema = z.object({
  username: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters long."),
})

export default function Page() {
  const [error, setError] = useState("")

  async function signin(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    const formData = new FormData(event.currentTarget)

    const rawData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    }

    const result = signInSchema.safeParse(rawData)

    if (!result.success) {
      const firstError = result.error.issues[0]
      setError(firstError?.message || "")
      return
    }

    const { data, error } = await authClient.signIn.username({
      username: result.data.username,
      password: result.data.password,
    })

    if (error) {
      console.error("Sign up failed:", error)
      setError(error.message || "Sign up failed. Please try again.")
      return
    }

    redirect("/")
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <IconFoldersFilled className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onSubmit={signin} error={error} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
