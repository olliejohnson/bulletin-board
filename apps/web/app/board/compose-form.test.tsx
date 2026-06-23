import { describe, it, expect, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"

// Mock the server action so the test doesn't pull in auth/prisma.
vi.mock("./actions", () => ({ createPostAction: vi.fn() }))

import { ComposeForm } from "./compose-form"

class MockPointerEvent extends Event {
  button: number | undefined
  ctrlKey: boolean | undefined
  pointerType: string
  constructor(type: string, props: PointerEventInit | undefined) {
    super(type, props)
    if (props) {
      if (props.button != null) {
        this.button = props.button
      }
      if (props.ctrlKey != null) {
        this.ctrlKey = props.ctrlKey
      }
    }
    this.pointerType = props?.pointerType ?? "mouse"
  }
}
window.PointerEvent = MockPointerEvent as never
window.HTMLElement.prototype.scrollIntoView = vi.fn()
window.HTMLElement.prototype.hasPointerCapture = vi.fn()
window.HTMLElement.prototype.releasePointerCapture = vi.fn()

const categories = [
  { id: "c1", name: "General" },
  { id: "c2", name: "dev" },
]

describe("ComposeForm", () => {
  it("renders the title input, body, and submit button", () => {
    render(<ComposeForm categories={categories} />)
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/say something/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "New post" })).toBeInTheDocument()
  })

  it("marks the title as required", () => {
    render(<ComposeForm categories={categories} />)
    expect(screen.getByPlaceholderText("Title")).toBeRequired()
  })

  it("renders a required category selector with the categories", () => {
    render(<ComposeForm categories={categories} />)
    const select = screen.getByLabelText("Category")
    fireEvent.click(select, new MockPointerEvent("pointerDown", { button: 0 }))

    expect(select).toBeRequired()
    expect(screen.getByRole("option", { name: "~General" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "~dev" })).toBeInTheDocument()
  })
})
