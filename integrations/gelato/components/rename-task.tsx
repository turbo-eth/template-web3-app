import { useForm } from "react-hook-form"
import { FaSpinner } from "react-icons/fa"

import { Button } from "@/components/ui/button"

import { useRenameTask } from "../hooks"
import { ValidationError } from "./errors/validation-error"

type RenameTaskForm = {
  name: string
}

export function RenameTask({
  taskId,
  name,
  onSave,
}: {
  taskId: string
  name: string
  onSave: () => void
}) {
  const form = useForm<RenameTaskForm>({
    defaultValues: {
      name,
    },
    mode: "all",
  })

  const { mutateAsync: renameTask, isLoading } = useRenameTask()

  const onSubmit = async () => {
    const { name } = form.getValues()

    await renameTask({
      taskId,
      name,
    })
      .catch(() => {
        //
      })
      .finally(() => onSave())
  }

  return (
    <div className="card mt-3 !max-w-4xl !rounded-3xl !border-none !px-10 py-8 dark:!bg-zinc-900">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-3">
          <div>Rename task</div>
          <input
            {...form.register("name", {
              required: "Name is required",
              validate: {
                min: (val) =>
                  val.length > 3
                    ? true
                    : "Name needs to be min 3 characters long",
              },
            })}
            className="input max-w-md !rounded-2xl dark:!bg-zinc-700 dark:!text-white"
            defaultValue={name}
          />
          <Button
            variant="blue"
            className="rounded-full px-5"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : <>Save</>}
          </Button>
        </div>
        <ValidationError error={form.formState.errors.name?.message} />
      </form>
    </div>
  )
}
