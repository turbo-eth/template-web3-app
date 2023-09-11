import { useCallback, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"

import { AddressScoreResponse } from "../utils/types"

export const useGetScore = () => {
  const { address } = useAccount()
  const {
    isLoading,
    isError,
    data,
    error,
    isRefetching,
    refetch: refetchQuery,
  } = useQuery({
    refetchOnWindowFocus: false,

    queryKey: ["score", address],
    queryFn: async () => {
      if (!address) throw new Error("No address provided.")
      const response = await fetch(`/api/gitcoin-passport/${address}/score`)
      const data = await response.json()
      if (response.status === 200) {
        return data as AddressScoreResponse
      }
      if (data.detail) throw data.detail
      throw new Error(response.statusText)
    },
  })

  const refetch = useCallback(() => void refetchQuery(), [refetchQuery])

  useEffect(() => {
    refetch()
  }, [address])

  return { isLoading: isLoading || isRefetching, isError, error, data, refetch }
}
