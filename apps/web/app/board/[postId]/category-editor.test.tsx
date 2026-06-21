import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

vi.mock("./actions", () => ({ updatePostCategoryAction: vi.fn() }))

import { CategoryEditor } from "./category-editor"

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
    expect(screen.getByRole("option", { name: "~General" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "~dev" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Change" })).toBeInTheDocument()
  })

  it("preselects the current category", () => {
    render(
      <CategoryEditor
        postId="p1"
        currentCategoryId="c2"
        categories={categories}
      />
    )
    expect(screen.getByLabelText("Category")).toHaveValue("c2")
  })
})
