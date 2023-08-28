import { useMemo, useRef, useState } from "react"
import { BsSearch } from "react-icons/bs"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex w-full flex-row items-center justify-between">
        <CardTitle>My Tasks</CardTitle>
        <div className="flex items-center space-x-3">
          <BsSearch
            className="cursor-pointer"
            onClick={() => {
              searchInputRef.current?.focus()
            }}
          />
          <Input
            ref={searchInputRef}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}
