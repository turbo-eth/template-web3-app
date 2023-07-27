import { useRef, useState } from 'react'

import { BsSearch } from 'react-icons/bs'

import { Input } from '@/components/ui/input'

import { ActiveTaskPreview } from './active-task-preview'
import { useActiveTasks } from '../hooks'

export function ActiveTasks() {
  const { data: activeTasks, isLoading, isError } = useActiveTasks()

  const [search, setSearch] = useState('')

  const searchInputRef = useRef<HTMLInputElement>({} as HTMLInputElement)

  const filteredActiveTasks = activeTasks?.tasks.filter((item) => {
    if (!search) return true

    return item.id.toLowerCase().includes(search)
  })

  return (
    <div className="card w-full !rounded-xl">
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
            className="w-56 !border-none duration-100 hover:outline-none focus:w-96 focus:bg-black/10"
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
            <div className="mt-10 flex justify-between text-sm dark:text-white dark:text-opacity-30">
              <div className="flex gap-4 lg:gap-10">
                <span>#</span>
                <span className="pl-3">Task, owner, contract &amp; function</span>
              </div>
              <div>Total Tx Fees</div>
            </div>
            <div className="mt-5">
              {filteredActiveTasks?.length === 0 && <div>No active tasks found...</div>}
              {filteredActiveTasks?.map((task, index) => (
                <ActiveTaskPreview
                  key={task.id}
                  index={index + 1}
                  name={activeTasks?.names?.find((item) => item.taskId === task.id)?.name || ''}
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
