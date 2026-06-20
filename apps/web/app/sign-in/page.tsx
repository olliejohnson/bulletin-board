"use client"
import { AuthLayout } from "@/components/auth-layout"
import { LoginForm } from "@/components/login-form"
import { signInSchema } from "@/app/sign-in/schema"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { SubmitEvent, useState } from "react"

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
    <AuthLayout>
      <LoginForm onSubmit={signin} error={error} />
    </AuthLayout>
  )
}
