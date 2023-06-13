import { useEffect, useState } from 'react'

import { DateTime } from 'luxon'

interface TimeFromUtcProps {
  className?: string
  date: string
}

export const TimeFromUtc = ({ className, date }: TimeFromUtcProps) => {
  const [timestamp, setTimestamp] = useState<string>()
  useEffect(() => {
    if (date) {
      setTimestamp(DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED))
    }
  }, [])
  return <span className={className}>{timestamp}</span>
}
