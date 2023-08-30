import { useMemo, useRef, useState } from "react"
import { BsSearch } from "react-icons/bs"

import { Input } from "@/components/ui/input"

import { useActiveTasks } from "../hooks"
import { ActiveTaskPreview } from "./active-task-preview"

export function ActiveTasks() {
  const [search, setSearch] = useState("")

  const { data: activeTasks, isLoading } = useActiveTasks()

  const searchInputRef = useRef<HTMLInputElement>({} as HTMLInputElement)

  const activeTaskIdsFilteredByName = useMemo(
    () =>
      activeTasks?.names
        ?.filter((item) => item.name.toLowerCase().includes(search))
        .map((item) => item.taskId),
    [activeTasks]
  )

  const filteredActiveTasks = useMemo(
    () =>
      activeTasks?.tasks.filter((item) =>
        activeTaskIdsFilteredByName?.includes(item.id)
      ),
    [activeTasks, activeTaskIdsFilteredByName]
  )

  return (
    <div className="card w-full !max-w-4xl !rounded-xl !border-none !px-10 py-8 dark:!bg-zinc-900">
      <div className="mb-5 flex w-full items-center justify-between">
        <h3 className="text-lg font-bold">My tasks</h3>
        <div className="flex items-center space-x-3">
          <BsSearch
            className="cursor-pointer"
            onClick={() => {
              searchInputRef.current?.focus()
            }}
          />
          <Input
            ref={searchInputRef}
            className="w-56 !border-none duration-100 hover:outline-none focus:w-96 focus:bg-black/10 focus:!shadow-none"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-5">
        {isLoading ? (
          <div className="h-20 w-full animate-pulse rounded-lg bg-slate-400/70"></div>
        ) : (
          <>
            <div className="flex justify-between text-sm dark:text-white dark:text-opacity-30">
              <div className="flex gap-4 lg:gap-10">
                <span>#</span>
                <span className="pl-3">
                  Task, owner, contract &amp; function
                </span>
              </div>
              <div>Total Tx Fees</div>
            </div>
            <div className="mt-5">
              {filteredActiveTasks?.length === 0 && (
                <div>No active tasks found...</div>
              )}
              {filteredActiveTasks?.map((task, index) => (
                <ActiveTaskPreview
                  key={task.id}
                  index={index + 1}
                  name={
                    activeTasks?.names?.find((item) => item.taskId === task.id)
                      ?.name || ""
                  }
                  task={task}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
