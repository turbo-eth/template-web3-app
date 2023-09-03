import { useMutation } from "@tanstack/react-query"

import { UseRenameTaskProps } from "../utils/types"
import { useGelatoAutomateSdk } from "./use-automate-sdk"

export const useRenameTask = () => {
  const { automateSdk } = useGelatoAutomateSdk()

  return useMutation({
    mutationFn: async ({ taskId, name, authToken }: UseRenameTaskProps) => {
      return await automateSdk?.renameTask(taskId, name, authToken)
    },
  })
}
