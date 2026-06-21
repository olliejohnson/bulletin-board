import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

vi.mock("./actions", () => ({ createPostAction: vi.fn() }))

import { Composer } from "./composer"

const categories = [{ id: "c1", name: "General" }]

function setup() {
  return render(
    <Composer
      categories={categories}
      filterName="all"
      filterDescription="Every category, newest first."
    >
      <ul>
        <li>feed</li>
      </ul>
    </Composer>
  )
}

describe("Composer", () => {
  it("shows the filter tile and trigger, with no form initially", () => {
    setup()
    expect(screen.getByText("~all")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Post a Topic" })
    ).toBeInTheDocument()
    expect(screen.queryByPlaceholderText("Title")).not.toBeInTheDocument()
  })

  it("reveals the form on click and collapses on cancel", async () => {
    const user = userEvent.setup()
    setup()
    await user.click(screen.getByRole("button", { name: "Post a Topic" }))
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /^Post$/ })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Cancel" }))
    expect(screen.queryByPlaceholderText("Title")).not.toBeInTheDocument()
  })
})
