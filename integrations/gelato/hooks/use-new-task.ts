import { useMutation } from '@tanstack/react-query'

import { useGelatoAutomateSdk } from './use-automate-sdk'
import { UseNewTaskProps } from '../utils/types'

export const useNewTask = () => {
  const { automateSdk } = useGelatoAutomateSdk()

  return useMutation({
    mutationFn: async ({ args, overrides, authToken }: UseNewTaskProps) => {
      if (!automateSdk) throw new Error('Sdk not initiated')

      return automateSdk.createTask(args, overrides, authToken)
    },
  })
}
