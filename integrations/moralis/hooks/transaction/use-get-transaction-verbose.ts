import type { GetTransactionVerboseJSONResponse, GetTransactionVerboseResponse } from '@moralisweb3/common-evm-utils'
import { useQuery } from '@tanstack/react-query'

interface GetTransactionVerboseArgs {
  chain: string
  transactionHash: string
  enabled?: boolean
}

export function useGetTransactionVerbose({ chain, transactionHash, enabled }: GetTransactionVerboseArgs) {
  return useQuery(['get-transaction-verbose', chain, transactionHash], {
    queryFn: async () => {
      const res = await fetch(
        `/integration/moralis/api/transaction/getTransactionVerbose?chain=${chain}&transactionHash=${transactionHash}&format=result`
      )
      if (!res.ok) {
        const testRes = await res.text()
        throw new Error(testRes)
      }

      return res.json() as Promise<GetTransactionVerboseResponse>
    },
    enabled,
  })
}

export function useGetTransactionVerboseRaw({ chain, transactionHash, enabled }: GetTransactionVerboseArgs) {
  return useQuery(['get-transaction-verbose-raw', chain, transactionHash], {
    queryFn: async () => {
      const res = await fetch(
        `/integration/moralis/api/transaction/getTransactionVerbose?chain=${chain}&transactionHash=${transactionHash}&format=raw`
      )
      if (!res.ok) {
        const testRes = await res.text()
        throw new Error(testRes)
      }

      return res.json() as Promise<GetTransactionVerboseJSONResponse>
    },
    enabled,
  })
}
