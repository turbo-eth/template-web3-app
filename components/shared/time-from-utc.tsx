import { HTMLAttributes, useEffect, useState } from "react"
import { DateTime } from "luxon"

interface TimeFromUtcProps extends HTMLAttributes<HTMLSpanElement> {
  date: string
}

export const TimeFromUtc = ({
  className,
  date,
  ...props
}: TimeFromUtcProps) => {
  const [timestamp, setTimestamp] = useState<string>()
  useEffect(() => {
    if (date) {
      setTimestamp(DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED))
    }
  }, [])
  return (
    <span className={className} {...props}>
      {timestamp}
    </span>
  )
}
