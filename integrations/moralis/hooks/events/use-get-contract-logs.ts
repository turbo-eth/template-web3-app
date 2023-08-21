import type { GetContractLogsJSONResponse, GetContractLogsResponse } from '@moralisweb3/common-evm-utils'
import { useQuery } from '@tanstack/react-query'

interface GetContractLogsArgs {
  chain: string
  address: string
  enabled?: boolean
}

export function useGetContractLogs({ chain, address, enabled }: GetContractLogsArgs) {
  return useQuery(['get-contract-logs', chain, address], {
    queryFn: async () => {
      const res = await fetch(`/integration/moralis/api/events/getContractLogs`, {
        method: 'POST',
        body: JSON.stringify({
          format: 'result',
          args: {
            chain,
            address,
          },
        }),
      })
      if (!res.ok) {
        const testRes = await res.text()
        throw new Error(testRes)
      }

      return res.json() as Promise<GetContractLogsResponse>
    },
    enabled,
  })
}

export function useGetContractLogsRaw({ chain, address, enabled }: GetContractLogsArgs) {
  return useQuery(['get-contract-logs-raw', chain, address], {
    queryFn: async () => {
      const res = await fetch(`/integration/moralis/api/events/getContractLogs`, {
        method: 'POST',
        body: JSON.stringify({
          format: 'raw',
          args: {
            chain,
            address,
          },
        }),
      })
      if (!res.ok) {
        const testRes = await res.text()
        throw new Error(testRes)
      }

      return res.json() as Promise<GetContractLogsJSONResponse>
    },
    enabled,
  })
}
