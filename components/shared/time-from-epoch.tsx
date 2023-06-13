import { useEffect, useState } from 'react'

import classNames from 'clsx'
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
  const containerClassName = classNames(className, 'TimeFromEpoch')
  return <span className={containerClassName}>{timestamp}</span>
}

export default TimeFromEpoch
