import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

vi.mock("./actions", () => ({ createPostAction: vi.fn() }))

import { Compose } from "./compose"

const categories = [{ id: "c1", name: "General" }]

describe("Compose", () => {
  it("shows a 'New post' button and no form initially", () => {
    render(<Compose categories={categories} />)
    expect(screen.getByRole("button", { name: "New post" })).toBeInTheDocument()
    expect(screen.queryByPlaceholderText("Title")).not.toBeInTheDocument()
  })

  it("reveals the form when the button is clicked", async () => {
    const user = userEvent.setup()
    render(<Compose categories={categories} />)
    await user.click(screen.getByRole("button", { name: "New post" }))
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Post" })).toBeInTheDocument()
  })

  it("collapses the form on cancel", async () => {
    const user = userEvent.setup()
    render(<Compose categories={categories} />)
    await user.click(screen.getByRole("button", { name: "New post" }))
    await user.click(screen.getByRole("button", { name: "Cancel" }))
    expect(screen.queryByPlaceholderText("Title")).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: "New post" })).toBeInTheDocument()
  })
})
