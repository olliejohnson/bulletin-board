import { intlFormatDistance } from "date-fns"

export function Relative({ date }: { date: Date | number }) {
  const timeString = intlFormatDistance(date, new Date())

  return <>{timeString}</>
}
