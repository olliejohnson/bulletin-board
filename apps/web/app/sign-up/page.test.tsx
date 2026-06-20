import type { ReactNode } from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const { signUpEmail, signInSocial } = vi.hoisted(() => ({
  signUpEmail: vi.fn(),
  signInSocial: vi.fn(),
}))

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signUp: { email: signUpEmail },
    signIn: { social: signInSocial, username: vi.fn() },
  },
}))

vi.mock("next/navigation", () => ({ redirect: vi.fn() }))

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

import Page from "./page"

async function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  overrides: Partial<Record<string, string>> = {}
) {
  const values = {
    "Full Name": "Alice Example",
    Username: "alice",
    Email: "alice@example.com",
    Password: "password123",
    "Confirm Password": "password123",
    ...overrides,
  }
  for (const [label, value] of Object.entries(values)) {
    await user.type(screen.getByLabelText(label), value as string)
  }
}

describe("Sign-up page", () => {
  beforeEach(() => {
    signUpEmail.mockReset()
    signUpEmail.mockResolvedValue({ data: { user: {} }, error: null })
  })

  it("renders the sign-up form", () => {
    render(<Page />)
    expect(
      screen.getByRole("heading", { name: "Create your account" })
    ).toBeInTheDocument()
    expect(screen.getByLabelText("Username")).toBeInTheDocument()
  })

  it("shows a validation error and does not call the API for a short password", async () => {
    const user = userEvent.setup()
    render(<Page />)
    await fillForm(user, { Password: "short", "Confirm Password": "short" })
    await user.click(screen.getByRole("button", { name: "Create Account" }))

    expect(
      await screen.findByText("Password must be at least 8 characters long.")
    ).toBeInTheDocument()
    expect(signUpEmail).not.toHaveBeenCalled()
  })

  it("calls authClient.signUp.email with valid input", async () => {
    const user = userEvent.setup()
    render(<Page />)
    await fillForm(user)
    await user.click(screen.getByRole("button", { name: "Create Account" }))

    await waitFor(() => expect(signUpEmail).toHaveBeenCalledTimes(1))
    expect(signUpEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "alice@example.com",
        name: "Alice Example",
        username: "alice",
        password: "password123",
      })
    )
  })
})
