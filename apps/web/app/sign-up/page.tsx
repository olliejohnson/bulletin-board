"use client"
import { AuthLayout } from "@/components/auth-layout"
import { SignupForm } from "@/components/signup-form"
import { signUpSchema } from "@/app/sign-up/schema"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { SubmitEvent, useState } from "react"

export default function Page() {
  const [error, setError] = useState("")

  async function signup(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    const formData = new FormData(event.currentTarget)

    const rawData = {
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirm-password") as string,
    }

    const result = signUpSchema.safeParse(rawData)

    if (!result.success) {
      const firstError = result.error.issues[0]
      setError(firstError?.message || "")
      return
    }

    const { data, error } = await authClient.signUp.email({
      email: result.data.email,
      name: result.data.name,
      password: result.data.password,
      username: result.data.username,
      callbackURL: "http://localhost:3000",
    })

    if (error) {
      console.error("Sign up failed:", error)
      setError(error.message || "Sign up failed. Please try again.")
      return
    }

    console.log("Sign up succeded:", data)
    redirect("/")
  }

  return (
    <AuthLayout>
      <SignupForm onSubmit={signup} error={error} />
    </AuthLayout>
  )
}
