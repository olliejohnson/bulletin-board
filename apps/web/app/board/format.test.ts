import { describe, it, expect } from "vitest"
import { authorName, timeAgo } from "./format"

describe("authorName", () => {
  it("prefers displayUsername", () => {
    expect(
      authorName({ displayUsername: "Disp", username: "u", name: "N" })
    ).toBe("Disp")
  })

  it("falls back to username when displayUsername is null", () => {
    expect(
      authorName({ displayUsername: null, username: "u", name: "N" })
    ).toBe("u")
  })

  it("falls back to name when username is also null", () => {
    expect(
      authorName({ displayUsername: null, username: null, name: "N" })
    ).toBe("N")
  })
})

describe("timeAgo", () => {
  const now = new Date("2026-06-20T12:00:00Z").getTime()
  const ago = (ms: number) => new Date(now - ms)

  it("returns 'just now' for under a minute", () => {
    expect(timeAgo(ago(30_000), now)).toBe("just now")
  })

  it("formats minutes", () => {
    expect(timeAgo(ago(90 * 1000), now)).toContain("minute")
  })

  it("formats hours", () => {
    expect(timeAgo(ago(3 * 3600 * 1000), now)).toContain("hour")
  })

  it("formats days", () => {
    expect(timeAgo(ago(2 * 86400 * 1000), now)).toContain("day")
  })
})
