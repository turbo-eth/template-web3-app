import { CreateTaskOptions } from '@gelatonetwork/automate-sdk'
import { useMutation } from '@tanstack/react-query'
import { Overrides } from 'ethers'

import { useGelatoAutomateSdk } from './use-automate-sdk'

export const useNewTask = () => {
  const { automateSdk } = useGelatoAutomateSdk()

  return useMutation({
    mutationFn: async (_args: CreateTaskOptions, overrides?: Overrides, authToken?: string) => {
      if (!automateSdk) throw new Error('Sdk not initiated')

      return automateSdk.createTask(_args, overrides, authToken)
    },
  })
}
