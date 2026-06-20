"use client"
import { SignupForm } from "@/components/signup-form"
import { authClient } from "@/lib/auth-client";
import { IconFoldersFilled } from "@tabler/icons-react"
import { SubmitEvent, useState } from "react";
import { z } from "zod"

const signUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
})

export default function Page () {
    const [error, setError] = useState("")

    async function signup(event: SubmitEvent<HTMLFormElement>) {
        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const name = formData.get('name') as string

        const rawData = {
            email: email,
            name: name,
            password: password
        }

        const result = signUpSchema.safeParse(rawData)

        if (!result.success) {
            const firstError = result.error.issues[0]
            setError(firstError?.message || '')
        }

        const { data, error } = await authClient.signUp.email({
            email: email,
            name: name,
            password: password,
            callbackURL: ""
        })
    }

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <IconFoldersFilled className="size-4"/>
                        </div>
                        Acme Inc.
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm onSubmit={signup} error={error} />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img src="/placeholder.svg" alt="Image" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
            </div>
        </div>
    )
}