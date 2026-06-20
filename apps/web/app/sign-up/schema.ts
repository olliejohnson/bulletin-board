import { z } from "zod"

export const signUpSchema = z
  .object({
    name: z.string(),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long.")
      .max(30, "Username must be at most 30 characters long.")
      .regex(
        /^[a-zA-Z0-9_.]+$/,
        "Username may only contain letters, numbers, underscores, and dots."
      ),
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirm-password"],
  })

export type SignUpInput = z.infer<typeof signUpSchema>
