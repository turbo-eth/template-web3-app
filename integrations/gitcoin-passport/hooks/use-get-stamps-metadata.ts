import { useCallback } from "react"
import { useQuery } from "@tanstack/react-query"

import { StampsMetadataResponse } from "../utils/types"

export const useGetStampsMetadata = () => {
  const {
    isLoading,
    data: stamps,
    error,
    refetch: refetchQuery,
  } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["all-stamps"],
    queryFn: async () => {
      const response = await fetch("/api/gitcoin-passport/stamps-metadata")
      const data = await response.json()
      if (response.status === 200) {
        return data as StampsMetadataResponse[]
      }
      if (data.detail) throw data.detail
      throw new Error(response.statusText)
    },
  })

  const refetch = useCallback(() => void refetchQuery(), [refetchQuery])

  return { isLoading, error, stamps, refetch }
}
