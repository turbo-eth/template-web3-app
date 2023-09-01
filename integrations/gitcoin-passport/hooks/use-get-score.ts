import { useCallback, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"

import {
  GITCOIN_API_BASE_URL,
  GITCOIN_PASSPORT_API_KEY,
  GITCOIN_PASSPORT_SCORER_ID,
} from "../utils/constants"

type ScoreResponse = {
  score: string
  last_score_timestamp: string
}

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
      if (!GITCOIN_PASSPORT_API_KEY)
        throw new Error("Gitcoin passport api key not provided.")
      if (!GITCOIN_PASSPORT_SCORER_ID)
        throw new Error("Gitcoin passport scorer id not provided.")
      const response = await fetch(
        `${GITCOIN_API_BASE_URL}/score/${GITCOIN_PASSPORT_SCORER_ID}/${address}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": GITCOIN_PASSPORT_API_KEY,
          },
        }
      )
      const data = await response.json()
      if (response.status === 200) {
        return data as ScoreResponse
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
