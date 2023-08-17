import type { GetContractEventsJSONResponse, GetContractEventsResponse } from '@moralisweb3/common-evm-utils'
import { useQuery } from '@tanstack/react-query'

interface GetContractEventsArgs {
  chain: string
  address: string
  topic: string
  abi: any
  enabled?: boolean
}

export function useGetContractEvents({ chain, address, topic, abi, enabled }: GetContractEventsArgs) {
  console
  return useQuery(['get-contract-events', chain, address, topic, abi], {
    queryFn: async () => {
      const res = await fetch(`/integration/moralis/api/events/getContractEvents`, {
        method: 'POST',
        body: JSON.stringify({
          format: 'result',
          args: {
            chain,
            address,
            topic,
            abi: typeof abi === 'string' ? JSON.parse(abi) : abi,
          },
        }),
      })
      if (!res.ok) {
        const testRes = await res.text()
        throw new Error(testRes)
      }

      return res.json() as Promise<GetContractEventsResponse>
    },
    enabled,
  })
}

export function useGetContractEventsRaw({ chain, address, topic, abi, enabled }: GetContractEventsArgs) {
  return useQuery(['get-contract-events-raw', chain, address, topic, abi], {
    queryFn: async () => {
      const res = await fetch(`/integration/moralis/api/events/getContractEvents`, {
        method: 'POST',
        body: JSON.stringify({
          format: 'raw',
          args: {
            chain,
            address,
            topic,
            abi: typeof abi === 'string' ? JSON.parse(abi) : abi,
          },
        }),
      })
      if (!res.ok) {
        const testRes = await res.text()
        throw new Error(testRes)
      }

      return res.json() as Promise<GetContractEventsJSONResponse>
    },
    enabled,
  })
}
