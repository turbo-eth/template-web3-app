import { useFormContext } from "react-hook-form"

import { CreateTaskForm } from "./create-task"

export function TaskNameInput() {
  const { register } = useFormContext<CreateTaskForm>()

  return (
    <div className="mx-auto mt-10 w-full !max-w-4xl !rounded-xl !border-none !px-10 py-8 dark:!bg-zinc-900">
      <div className="mb-10 flex w-full items-center justify-between">
        <h3 className="text-2xl font-bold dark:opacity-70">Task name</h3>
      </div>
      <div>
        <input
          {...register("name")}
          className="input !rounded-2xl dark:bg-zinc-700 dark:text-white"
          placeholder="Task name"
        />
      </div>
    </div>
  )
}
