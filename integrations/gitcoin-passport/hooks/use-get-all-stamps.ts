import { useCallback } from "react"
import { useQuery } from "@tanstack/react-query"

import {
  GITCOIN_API_BASE_URL,
  GITCOIN_PASSPORT_API_KEY,
  GITCOIN_PASSPORT_SCORER_ID,
} from "../utils/constants"
import { StampId } from "../utils/types"

type StampsResponse = {
  id: StampId
  icon: string
  name: string
  description: string
  connectMessage: string
  groups: Array<{
    name: string
    stamps: Array<{
      name: string
      description: string
      hash: string
    }>
  }>
}

export const useGetAllStamps = () => {
  const {
    isLoading,
    data: stamps,
    error,
    refetch: refetchQuery,
  } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["all-stamps"],
    queryFn: async () => {
      if (!GITCOIN_PASSPORT_API_KEY)
        throw new Error("Gitcoin passport api key not provided.")
      const response = await fetch(`${GITCOIN_API_BASE_URL}/stamp-metadata`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": GITCOIN_PASSPORT_API_KEY,
        },
      })
      const data = await response.json()
      if (response.status === 200) {
        return data as StampsResponse[]
      }
      if (data.detail) throw data.detail
      throw new Error(response.statusText)
    },
  })

  const refetch = useCallback(() => void refetchQuery(), [refetchQuery])

  return { isLoading, error, stamps, refetch }
}
