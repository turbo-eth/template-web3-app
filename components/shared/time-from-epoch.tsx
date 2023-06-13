import { useEffect, useState } from 'react'

import { DateTime } from 'luxon'

interface TimeFromEpochProps {
  className?: string
  epoch?: number | string
}

export const TimeFromEpoch = ({ className, epoch }: TimeFromEpochProps) => {
  const [timestamp, setTimestamp] = useState<string>()
  useEffect(() => {
    if (epoch) {
      setTimestamp(DateTime.fromSeconds(Number(epoch)).toLocaleString(DateTime.DATETIME_MED))
    }
  }, [])
  return <span className={className}>{timestamp}</span>
}

export default TimeFromEpoch
