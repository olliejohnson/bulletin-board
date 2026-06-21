import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

// Mock the server action so the test doesn't pull in auth/prisma.
vi.mock("./actions", () => ({ createPostAction: vi.fn() }))

import { ComposeForm } from "./compose-form"

describe("ComposeForm", () => {
  it("renders the title input, body, and submit button", () => {
    render(<ComposeForm />)
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/say something/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "New post" })).toBeInTheDocument()
  })

  it("marks the title as required", () => {
    render(<ComposeForm />)
    expect(screen.getByPlaceholderText("Title")).toBeRequired()
  })
})
