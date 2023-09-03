import Link from "next/link"

import { GetAllTaskDataQuery } from "../graphql/graphql/generated/graphql"
import { formatFee, truncateEthAddress } from "../utils/helpers"

export type ActiveTaskPreviewProps = {
  task: GetAllTaskDataQuery["tasks"][number]
  name: string
  index: number
}
export function ActiveTaskPreview({
  task,
  name,
  index,
}: ActiveTaskPreviewProps) {
  return (
    <Link
      className="light:hover:bg-black/5 -mx-5 flex items-center justify-between border-t border-white/30 px-3 py-6 duration-200 dark:hover:bg-white/5"
      href={`/integration/gelato/tasks/${task.id}`}
    >
      <div className="flex w-full items-center gap-4 md:w-auto lg:gap-10">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
          {index}
        </div>
        <div className="flex w-full flex-col gap-2">
          <p className="flex items-center gap-3 text-xs font-bold lg:text-lg">
            <span>{truncateEthAddress(name)}</span>
            <span className="pointer-events-none rounded-2xl bg-black/50 px-2 py-1 pr-3 text-xs font-normal">
              <i
                className={`mr-0.5 ${
                  task.status == "ongoing" ? "text-green-500" : "text-red-500"
                }`}
              >
                {" "}
                •&nbsp;{" "}
              </i>
              {task.status}
            </span>
          </p>
          <div className="flex flex-col gap-1 text-xs md:flex-row md:items-center">
            Owner:{" "}
            <span className="bg-gradient-to-r from-orange-200 to-pink-200 bg-clip-text text-transparent">
              {truncateEthAddress(task.taskCreator.id, 14)}
            </span>
            <span className="hidden md:inline">&bull;</span>
            <span className="bg-gradient-to-r from-pink-300 to-indigo-300 bg-clip-text text-transparent">
              {truncateEthAddress(task.execAddress, 14)}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col md:mt-0 md:items-end">
        <p className="font-bold">
          {task.feeTotal ? (
            <>{formatFee(task.feeTotal as string)} MATIC</>
          ) : (
            <></>
          )}
        </p>
        <p className="text-xs text-white text-opacity-50">
          {" "}
          {task.feeTotalUsd ? (
            <>$ {formatFee(task.feeTotalUsd as string)}</>
          ) : (
            <></>
          )}
        </p>
      </div>
    </Link>
  )
}
