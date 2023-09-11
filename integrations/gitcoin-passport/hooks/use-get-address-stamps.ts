import { useCallback, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"

import { AddressStamp, AddressStampsResponse } from "../utils/types"

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
      const response = await fetch(`/api/gitcoin-passport/${address}/stamps`)
      const data = (await response.json()) as AddressStampsResponse
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
