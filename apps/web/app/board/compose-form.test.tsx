import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

// Mock the server action so the test doesn't pull in auth/prisma.
vi.mock("./actions", () => ({ createPostAction: vi.fn() }))

import { ComposeForm } from "./compose-form"

const categories = [
  { id: "c1", name: "General" },
  { id: "c2", name: "dev" },
]

describe("ComposeForm", () => {
  it("renders the title input, body, and submit button", () => {
    render(<ComposeForm categories={categories} />)
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/say something/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Post" })).toBeInTheDocument()
  })

  it("marks the title as required", () => {
    render(<ComposeForm categories={categories} />)
    expect(screen.getByPlaceholderText("Title")).toBeRequired()
  })

  it("renders a required category selector with the categories", () => {
    render(<ComposeForm categories={categories} />)
    const select = screen.getByLabelText("Category")
    expect(select).toBeRequired()
    expect(screen.getByRole("option", { name: "~General" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "~dev" })).toBeInTheDocument()
  })
})
