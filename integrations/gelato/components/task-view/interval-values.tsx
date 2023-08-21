import moment from 'moment'

export type IntervalValuesProps = {
  startTime?: string | null
  interval?: string | null
  createdAt: string
}

export function IntervalValues({ startTime, interval, createdAt }: IntervalValuesProps) {
  const nextExecution = parseInt(startTime?.toString() || '')
    ? moment(startTime?.toString())
        .add(parseInt(interval as string), 'seconds')
        .format('ll, HH:mm:ss')
    : moment
        .unix(parseInt(createdAt))
        .add(parseInt(interval as string), 'seconds')
        .format('ll, HH:mm:ss')

  return (
    <div>
      <div className="mb-5 flex w-full items-center justify-between opacity-70">
        <h3 className="text-2xl font-bold">When to execute</h3>
      </div>
      {startTime && interval ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <p className="col-span-2 opacity-70 md:col-span-1">Interval</p>
            <p className="col-span-2 md:col-span-3">{moment.duration({ seconds: parseInt(interval || '0') }).humanize()}</p>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <p className="col-span-2 opacity-70 md:col-span-1">Next Execution</p>
            <p className="col-span-2 md:col-span-3">{nextExecution}</p>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <p className="col-span-2 opacity-70 md:col-span-1">Next execution</p>
          <p className="col-span-2 md:col-span-3">Will be attempted at the next block</p>
        </div>
      )}
    </div>
  )
}
