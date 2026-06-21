import type { ReactNode } from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const { signInUsername, signInSocial } = vi.hoisted(() => ({
  signInUsername: vi.fn(),
  signInSocial: vi.fn(),
}))

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signIn: { username: signInUsername, social: signInSocial },
  },
}))

vi.mock("next/navigation", () => ({ redirect: vi.fn() }))

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

import Page from "./page"

describe("Sign-in page", () => {
  beforeEach(() => {
    signInUsername.mockReset()
    signInUsername.mockResolvedValue({ data: { user: {} }, error: null })
  })

  it("renders the sign-in form", () => {
    render(<Page />)
    expect(
      screen.getByRole("heading", { name: "Login to your account" })
    ).toBeInTheDocument()
    expect(screen.getByLabelText("Username")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument()
  })

  it("shows a validation error and does not call the API for a short password", async () => {
    const user = userEvent.setup()
    render(<Page />)
    await user.type(screen.getByLabelText("Username"), "alice")
    await user.type(screen.getByLabelText("Password"), "short")
    await user.click(screen.getByRole("button", { name: "Login" }))

    expect(
      await screen.findByText("Password must be at least 8 characters long.")
    ).toBeInTheDocument()
    expect(signInUsername).not.toHaveBeenCalled()
  })

  it("shows a validation error and does not call the API for a short username", async () => {
    const user = userEvent.setup()
    render(<Page />)
    await user.type(screen.getByLabelText("Username"), "sh")
    await user.type(screen.getByLabelText("Password"), "password")
    await user.click(screen.getByRole("button", { name: "Login" }))

    expect(
      await screen.findByText("Username must be at least 3 characters long.")
    ).toBeInTheDocument()
    expect(signInUsername).not.toHaveBeenCalled()
  })

  it("shows a validation error and does not call the API for a long username", async () => {
    const user = userEvent.setup()
    render(<Page />)
    await user.type(
      screen.getByLabelText("Username"),
      "verylongusernamethatisoverthirtycharacterslong"
    )
    await user.type(screen.getByLabelText("Password"), "password")
    await user.click(screen.getByRole("button", { name: "Login" }))

    expect(
      await screen.findByText("Username must be at most 30 characters long.")
    ).toBeInTheDocument()
    expect(signInUsername).not.toHaveBeenCalled()
  })

  it("shows both validation warnings if the username and password are invalid and does not call the API", async () => {
    const user = userEvent.setup()
    render(<Page />)
    await user.type(
      screen.getByLabelText("Username"),
      "verylongusernamethatisoverthirtycharacterslong"
    )
    await user.type(screen.getByLabelText("Password"), "short")
    await user.click(screen.getByRole("button", { name: "Login" }))

    expect(
      await screen.findByText("Username must be at most 30 characters long.")
    ).toBeInTheDocument()
    expect(
      await screen.findByText("Password must be at least 8 characters long.")
    ).toBeInTheDocument()
    expect(signInUsername).not.toHaveBeenCalled()
  })

  it("calls authClient.signIn.username with valid input", async () => {
    const user = userEvent.setup()
    render(<Page />)
    await user.type(screen.getByLabelText("Username"), "alice")
    await user.type(screen.getByLabelText("Password"), "password123")
    await user.click(screen.getByRole("button", { name: "Login" }))

    await waitFor(() => expect(signInUsername).toHaveBeenCalledTimes(1))
    expect(signInUsername).toHaveBeenCalledWith({
      username: "alice",
      password: "password123",
    })
  })
})
