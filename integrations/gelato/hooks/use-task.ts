import { useQuery } from "@tanstack/react-query"
import request from "graphql-request"
import { useNetwork } from "wagmi"

import {
  GetTaskDocument,
  GetTaskQuery,
  GetTaskQueryVariables,
} from "../graphql/graphql/generated/graphql"
import { getGqlEndpoint } from "../utils/helpers"
import { FetchTaskProps } from "../utils/types"
import { useGelatoAutomateSdk } from "./use-automate-sdk"

const fetchTask = ({ id, gqlEndpoint }: FetchTaskProps) => {
  return request<GetTaskQuery, GetTaskQueryVariables>({
    url:
      `https://api.thegraph.com/subgraphs/name/gelatodigital/poke-me` +
      gqlEndpoint,
    document: GetTaskDocument,
    variables: {
      id,
    },
  })
}

export const useTask = ({ taskId }: { taskId: string }) => {
  const { automateSdk } = useGelatoAutomateSdk()
  const { chain } = useNetwork()

  return useQuery(["gelato-task", taskId, automateSdk], {
    queryFn: async () => {
      const taskNames = await automateSdk?.getTaskNames([taskId])
      const task = await fetchTask({
        id: taskId,
        gqlEndpoint: getGqlEndpoint(chain?.id as number),
      })

      if (!taskNames?.[0] || !task.task) throw new Error("Error fetching task")

      return {
        task: task.task,
        name: taskNames[0].name,
      }
    },
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: !!automateSdk,
  })
}
