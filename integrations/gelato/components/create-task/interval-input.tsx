import { useEffect, useMemo, useState } from "react"
import moment from "moment"
import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"

import { getTotalInterval } from "../../utils/helpers"
import { ValidationError } from "../errors/validation-error"
import { CreateTaskForm } from "./create-task"

export function IntervalInput() {
  const [date, setDate] = useState(Date.now())

  const {
    watch,
    setValue,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<CreateTaskForm>()

  const [
    timeOption,
    days,
    hours,
    minutes,
    seconds,
    startImmediately,
    startTime,
  ] = watch([
    "timeOption",
    "timeInterval.days",
    "timeInterval.hours",
    "timeInterval.minutes",
    "timeInterval.seconds",
    "startImmediately",
    "startTime",
  ])

  const totalInterval = useMemo(
    () => getTotalInterval(days, hours, minutes, seconds),
    [days, hours, minutes, seconds]
  )

  useEffect(() => {
    if (totalInterval < 25) {
      setError("timeInterval", {
        message: "Please fill a valid interval",
      })
    } else {
      clearErrors("timeInterval")
    }
  }, [totalInterval])

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(Date.now())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const firstExecution = useMemo(
    () => moment(date).format("ll, HH:mm:ss"),
    [date]
  )
  const secondExecution = useMemo(
    () => moment(date).add(totalInterval, "seconds").format("ll, HH:mm:ss"),
    [date]
  )

  return (
    <div className="card mx-auto mt-10 w-full !max-w-4xl !rounded-xl !border-none !px-10 py-8 dark:!bg-zinc-900">
      <div className="mb-10 flex w-full items-center justify-between">
        <h3 className="text-2xl font-bold dark:opacity-70">When</h3>
      </div>
      <div>
        <div className="flex">
          <div className="mx-auto flex space-x-3 rounded-2xl p-2 dark:bg-zinc-700">
            <button
              type="button"
              className={cn(
                "rounded-2xl p-2 px-5 text-xl text-slate-200 hover:text-inherit duration-200",
                timeOption === "exact" ? "bg-zinc-900" : ""
              )}
              onClick={() => setValue("timeOption", "exact")}
            >
              Time
            </button>
            <button
              type="button"
              className={cn(
                "rounded-2xl p-2 px-5 text-xl text-slate-200 hover:text-inherit duration-200",
                timeOption === "whenever_possible" ? "bg-zinc-900" : ""
              )}
              onClick={() => setValue("timeOption", "whenever_possible")}
            >
              Whenever Possible
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        {timeOption === "exact" ? (
          <div>
            <div>
              Execute a contract at a given interval with a set start time.
            </div>
            <div className="mt-5">
              <label className="dark:opacity-70">
                Interval - <small>minimum 25 seconds</small>
              </label>
              <div className="mt-2 flex items-center space-x-5">
                <input
                  className="input !rounded-2xl dark:!bg-zinc-700 dark:!text-white"
                  placeholder="0 days"
                  {...register("timeInterval.days")}
                ></input>
                <span>+</span>
                <input
                  className="input !rounded-2xl dark:!bg-zinc-700 dark:!text-white"
                  placeholder="0 hours"
                  {...register("timeInterval.hours")}
                ></input>
                <span>+</span>
                <input
                  className="input !rounded-2xl dark:!bg-zinc-700 dark:!text-white"
                  placeholder="0 min"
                  {...register("timeInterval.minutes")}
                ></input>
                <span>+</span>
                <input
                  className="input !rounded-2xl dark:!bg-zinc-700 dark:!text-white"
                  placeholder="0 sec"
                  {...register("timeInterval.seconds")}
                ></input>
              </div>
            </div>
            <ValidationError error={errors.timeInterval?.message} />

            <div className="mt-5">
              <label className="dark:opacity-70">Start time</label>
              <input
                {...register("startTime")}
                className={cn(
                  "input mt-2 !rounded-2xl dark:!bg-zinc-700 dark:!text-white",
                  startImmediately ? "opacity-70" : ""
                )}
                disabled={startImmediately}
                placeholder="8/16/2023, 9:11 PM"
                type="datetime-local"
              ></input>
            </div>
            <div className="mt-3 flex items-center space-x-3">
              <Switch
                defaultChecked={startImmediately}
                id="start_immediately"
                onCheckedChange={(val) => setValue("startImmediately", val)}
              />
              <label
                className="cursor-pointer dark:opacity-70"
                htmlFor="start_immediately"
              >
                Start Immediately
              </label>
            </div>
            {totalInterval > 0 && (
              <div className="mt-5 flex flex-col space-y-3">
                <div className="flex space-x-3">
                  <span>1st execution:</span>
                  <span>
                    {startImmediately
                      ? firstExecution
                      : moment(startTime).format("ll, HH:mm:ss")}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <span>2nd execution:</span>
                  <span>
                    {startImmediately
                      ? secondExecution
                      : moment(startTime)
                          .add(totalInterval, "seconds")
                          .format("ll, HH:mm:ss")}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div>
              Gelato will check if the function is executable at every block.
            </div>
            <div className="mt-3 dark:opacity-50">
              Checking the function will start immediately after the task is
              created. Make sure the function can only be executed from time to
              time and not always.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
