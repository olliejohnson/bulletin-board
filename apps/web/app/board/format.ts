// Pure presentation helpers for the board feed (unit-tested in format.test.ts).

export function authorName(author: {
  displayUsername: string | null
  username: string | null
  name: string
}) {
  return author.displayUsername ?? author.username ?? author.name
}

// Relative time, e.g. "3 hours ago". `now` is injectable for deterministic tests.
export function timeAgo(date: Date, now: number = Date.now()) {
  const seconds = Math.floor((now - date.getTime()) / 1000)
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ]
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  for (const [unit, secs] of units) {
    if (seconds >= secs) return rtf.format(-Math.floor(seconds / secs), unit)
  }
  return "just now"
}
