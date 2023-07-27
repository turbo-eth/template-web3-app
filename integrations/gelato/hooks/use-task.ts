import { useQuery } from '@tanstack/react-query'

import { useGelatoAutomateSdk } from './use-automate-sdk'

export const useTask = ({ taskId }: { taskId: string }) => {
  const { automateSdk } = useGelatoAutomateSdk()

  return useQuery(['gelato-task', taskId], {
    queryFn: () => {
      return automateSdk?.getTaskNames([taskId])
    },
  })
}
