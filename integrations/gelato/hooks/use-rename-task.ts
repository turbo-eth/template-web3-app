import { useMutation } from '@tanstack/react-query'

import { useGelatoAutomateSdk } from './use-automate-sdk'
import { UseRenameTaskProps } from '../utils/types'

export const useRenameTask = () => {
  const { automateSdk } = useGelatoAutomateSdk()

  return useMutation({
    mutationFn: async ({ taskId, name, authToken }: UseRenameTaskProps) => {
      return await automateSdk?.renameTask(taskId, name, authToken)
    },
  })
}
