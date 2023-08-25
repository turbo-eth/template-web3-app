import { useQuery } from '@tanstack/react-query'
import { request } from 'graphql-request'
import { useAccount, useNetwork } from 'wagmi'

import { useGelatoAutomateSdk } from './use-automate-sdk'
import { GetAllTaskDataDocument, GetAllTaskDataQuery, GetAllTaskDataQueryVariables } from '../graphql/graphql/generated/graphql'
import { GELATO_CONSTANTS } from '../utils/constants'
import { getGqlEndpoint } from '../utils/helpers'
import { FetchActiveTasksProps } from '../utils/types'

const fetchActiveTasks = ({ address, gqlEndpoint }: FetchActiveTasksProps) => {
  return request<GetAllTaskDataQuery, GetAllTaskDataQueryVariables>({
    url: `https://api.thegraph.com/subgraphs/name/gelatodigital/poke-me` + gqlEndpoint,
    document: GetAllTaskDataDocument,
    variables: {
      taskCreator: address?.toLowerCase(),
      skip: 0,
      limit: 1000,
    },
  })
}

export const useActiveTasks = () => {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { automateSdk } = useGelatoAutomateSdk()

  const chainId = chain?.id

  return useQuery(['gelato-tasks', address, automateSdk], {
    queryFn: async () => {
      if (!chainId || !GELATO_CONSTANTS.networks[chainId] || !address) throw new Error('Missing Parameters')

      const gqlEndpoint = getGqlEndpoint(chain.id)

      const tasks = await fetchActiveTasks({ address, gqlEndpoint })
      const names = await automateSdk?.getTaskNames(tasks.tasks.map((task) => task.id))

      return { tasks: tasks.tasks, names }
    },
    refetchOnWindowFocus: false,
  })
}
