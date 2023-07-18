import type { GetContractEventsJSONResponse, GetContractEventsResponse } from '@moralisweb3/common-evm-utils'
import { useQuery } from '@tanstack/react-query'

import type { GetContractEvents } from '@/integrations/moralis/utils/types'

export function useGetContractEvents(args: GetContractEvents['args']) {
  return useQuery(['get-contract-events'], {
    queryFn: async () => {
      try {
        const res = await fetch(`/integration/moralis/api/events/getContractEvents`, {
          method: 'POST',
          body: JSON.stringify({
            format: 'result',
            args,
          }),
        })
        if (!res.ok) throw new Error('Error fetching events')

        return res.json() as Promise<GetContractEventsResponse>
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        console.error(errorMessage)
      }
    },
  })
}

export function useGetContractEventsRaw(args: GetContractEvents['args']) {
  return useQuery(['get-contract-events-raw'], {
    queryFn: async () => {
      try {
        const res = await fetch(`/integration/moralis/api/events/getContractEvents`, {
          method: 'POST',
          body: JSON.stringify({
            format: 'raw',
            args,
          }),
        })
        if (!res.ok) throw new Error('Error fetching events')

        return res.json() as Promise<GetContractEventsJSONResponse>
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        console.error(errorMessage)
      }
    },
  })
}
