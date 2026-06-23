import { describe, it, expect, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"

vi.mock("./actions", () => ({ updatePostCategoryAction: vi.fn() }))

import { CategoryEditor } from "./category-editor"

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

describe("CategoryEditor", () => {
  it("renders the category options and a Change button", () => {
    render(
      <CategoryEditor
        postId="p1"
        currentCategoryId="c1"
        categories={categories}
      />
    )
    expect(screen.getByRole("button", { name: "Change" })).toBeInTheDocument()

    const trigger = screen.getByRole("combobox")
    fireEvent.click(trigger, new MockPointerEvent("pointerDown", { button: 0 }))

    expect(screen.getByRole("option", { name: "~General" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "~dev" })).toBeInTheDocument()
  })

  it("preselects the current category", () => {
    render(
      <CategoryEditor
        postId="p1"
        currentCategoryId="c2"
        categories={categories}
      />
    )
    expect(
      screen.getByLabelText("Category").querySelector("span")
    ).toHaveTextContent("~dev")
  })
})
