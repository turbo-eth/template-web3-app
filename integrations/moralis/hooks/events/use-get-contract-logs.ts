import type { GetContractLogsJSONResponse, GetContractLogsResponse } from '@moralisweb3/common-evm-utils'
import { useQuery } from '@tanstack/react-query'

import type { GetContractLogs } from '@/integrations/moralis/utils/types'

export function useGetContractLogs(args: GetContractLogs['args']) {
  return useQuery(['get-contract-logs'], {
    queryFn: async () => {
      try {
        const res = await fetch(`/integration/moralis/api/events/getContractLogs`, {
          method: 'POST',
          body: JSON.stringify({
            format: 'result',
            args,
          }),
        })
        if (!res.ok) throw new Error('Error fetching logs')

        return res.json() as Promise<GetContractLogsResponse>
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        console.error(errorMessage)
      }
    },
  })
}

export function useGetContractLogsRaw(args: GetContractLogs['args']) {
  return useQuery(['get-contract-logs-raw'], {
    queryFn: async () => {
      try {
        const res = await fetch(`/integration/moralis/api/events/getContractLogs`, {
          method: 'POST',
          body: JSON.stringify({
            format: 'raw',
            args,
          }),
        })
        if (!res.ok) throw new Error('Error fetching logs')

        return res.json() as Promise<GetContractLogsJSONResponse>
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        console.error(errorMessage)
      }
    },
  })
}
