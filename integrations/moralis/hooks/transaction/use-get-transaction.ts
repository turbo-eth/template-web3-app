import type { GetTransactionJSONResponse, GetTransactionResponse } from '@moralisweb3/common-evm-utils'
import { useQuery } from '@tanstack/react-query'

export function useGetTransaction({ chain, transactionHash }: { chain: string; transactionHash: string }) {
  return useQuery(['get-transaction'], {
    queryFn: async () => {
      try {
        const res = await fetch(`/integration/moralis/api/transaction/getTransaction?chain=${chain}&transactionHash=${transactionHash}&format=result`)
        if (!res.ok) throw new Error('Error fetching transaction')

        return res.json() as Promise<GetTransactionResponse>
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        console.error(errorMessage)
      }
    },
  })
}

export function useGetTransactionRaw({ chain, transactionHash }: { chain: string; transactionHash: string }) {
  return useQuery(['get-transaction-raw'], {
    queryFn: async () => {
      try {
        const res = await fetch(`/integration/moralis/api/transaction/getTransaction?chain=${chain}&transactionHash=${transactionHash}&format=raw`)
        if (!res.ok) throw new Error('Error fetching transaction')

        return res.json() as Promise<GetTransactionJSONResponse>
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        console.error(errorMessage)
      }
    },
  })
}
