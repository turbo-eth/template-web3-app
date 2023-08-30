import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useNetwork } from "wagmi"

import { FetchResolverResponse } from "../utils/types"

export const useTaskResolver = ({ taskId }: { taskId: string }) => {
  const { chain } = useNetwork()

  return useQuery(["gelato-task-resolver", taskId, chain?.id], {
    queryFn: async () => {
      const response = await axios.get<FetchResolverResponse>(
        `https://ops-task.fra.gelato.digital/1514007e8336fa99e6fe/api/contracts/${
          chain?.id.toString() as string
        }/?taskId=${taskId}&resolver=true`
      )
      return response.data
    },
    enabled: !!chain?.id && !!taskId,
    refetchOnWindowFocus: false,
    retry: 0,
  })
}
