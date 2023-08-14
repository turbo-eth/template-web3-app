import { useMutation } from '@tanstack/react-query'

import { useGelatoAutomateSdk } from './use-automate-sdk'
import { UseCancelTaskProps } from '../utils/types'

export const useCancelTask = () => {
  const { automateSdk } = useGelatoAutomateSdk()

  return useMutation({
    mutationFn: async ({ taskId, overrides }: UseCancelTaskProps) => {
      return automateSdk?.cancelTask(taskId, overrides)
    },
    retry: 0,
  })
}
