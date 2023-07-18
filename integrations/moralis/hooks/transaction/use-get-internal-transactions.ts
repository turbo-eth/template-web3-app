import type { GetInternalTransactionsJSONResponse, GetInternalTransactionsResponse } from '@moralisweb3/common-evm-utils'
import { useQuery } from '@tanstack/react-query'

export function useGetInternalTransactions({ chain, transactionHash }: { chain: string; transactionHash: string }) {
  return useQuery(['get-internal-transactions'], {
    queryFn: async () => {
      try {
        const res = await fetch(
          `/integration/moralis/api/transaction/getInternalTransactions?chain=${chain}&transactionHash=${transactionHash}&format=result`
        )
        if (!res.ok) throw new Error('Error fetching transaction')

        return res.json() as Promise<GetInternalTransactionsResponse>
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        console.error(errorMessage)
      }
    },
  })
}

export function useGetInternalTransactionsRaw({ chain, transactionHash }: { chain: string; transactionHash: string }) {
  return useQuery(['get-internal-transactions-raw'], {
    queryFn: async () => {
      try {
        const res = await fetch(
          `/integration/moralis/api/transaction/getInternalTransactions?chain=${chain}&transactionHash=${transactionHash}&format=raw`
        )
        if (!res.ok) throw new Error('Error fetching transaction')

        return res.json() as Promise<GetInternalTransactionsJSONResponse>
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        console.error(errorMessage)
      }
    },
  })
}
