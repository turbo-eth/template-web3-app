import type { GetTransactionVerboseJSONResponse, GetTransactionVerboseResponse } from '@moralisweb3/common-evm-utils'
import { useQuery } from '@tanstack/react-query'

export function useGetTransactionVerbose({ chain, transactionHash }: { chain: string; transactionHash: string }) {
  return useQuery(['get-transaction-verbose'], {
    queryFn: async () => {
      try {
        const res = await fetch(
          `/integration/moralis/api/transaction/getTransactionVerbose?chain=${chain}&transactionHash=${transactionHash}&format=result`
        )
        if (!res.ok) throw new Error('Error fetching transaction')

        return res.json() as Promise<GetTransactionVerboseResponse>
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        console.error(errorMessage)
      }
    },
  })
}

export function useGetTransactionVerboseRaw({ chain, transactionHash }: { chain: string; transactionHash: string }) {
  return useQuery(['get-transaction-verbose-raw'], {
    queryFn: async () => {
      try {
        const res = await fetch(
          `/integration/moralis/api/transaction/getTransactionVerbose?chain=${chain}&transactionHash=${transactionHash}&format=raw`
        )
        if (!res.ok) throw new Error('Error fetching transaction')

        return res.json() as Promise<GetTransactionVerboseJSONResponse>
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        console.error(errorMessage)
      }
    },
  })
}
