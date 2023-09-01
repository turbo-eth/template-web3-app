import { useCallback, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"

import {
  GITCOIN_API_BASE_URL,
  GITCOIN_PASSPORT_API_KEY,
} from "../utils/constants"
import { AddressStamp, StampId } from "../utils/types"

type StampsResponse = {
  items: Array<{
    credential: {
      credentialSubject: {
        provider: string
      }
    }
    metadata: {
      platform: {
        id: StampId
      }
    }
  }>
  detail?: string
}

export const useGetAddressStamps = () => {
  const { address } = useAccount()
  const {
    isLoading,
    data: stamps,
    error,
    refetch: refetchQuery,
    isRefetching,
  } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["address-stamps", address],
    queryFn: async () => {
      if (!address) throw new Error("No address provided.")
      if (!GITCOIN_PASSPORT_API_KEY)
        throw new Error("Gitcoin passport api key not provided.")
      const response = await fetch(
        `${GITCOIN_API_BASE_URL}/stamps/${address}?include_metadata=true`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": GITCOIN_PASSPORT_API_KEY,
          },
        }
      )
      const data = (await response.json()) as StampsResponse
      if (response.status === 200) {
        const userStamps: AddressStamp[] = []
        data.items.forEach((userStamp) => {
          const provider = userStamp.metadata.platform.id
          const providerObject = userStamps.find(
            (userStamp) => userStamp.provider === provider
          )
          const stampId = userStamp.credential.credentialSubject.provider
          if (providerObject)
            providerObject.items = [...providerObject.items, stampId]
          userStamps.push({ provider, items: [stampId] })
        })
        return userStamps
      }
      if (data.detail) throw data.detail
      throw new Error(response.statusText)
    },
  })

  const refetch = useCallback(() => void refetchQuery(), [refetchQuery])

  useEffect(() => {
    refetch()
  }, [address])

  return { isLoading: isLoading || isRefetching, error, stamps, refetch }
}
