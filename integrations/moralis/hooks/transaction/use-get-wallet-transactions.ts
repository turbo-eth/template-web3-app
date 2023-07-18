import type { GetWalletTransactionsJSONResponse, GetWalletTransactionsResponse } from '@moralisweb3/common-evm-utils'
import { useQuery } from '@tanstack/react-query'

export function useGetWalletTransactions({ chain, address }: { chain: string; address: string }) {
  return useQuery(['get-wallet-transactions'], {
    queryFn: async () => {
      try {
        const res = await fetch(`/integration/moralis/api/transaction/getWalletTransactions?chain=${chain}&address=${address}&format=result`)
        if (!res.ok) throw new Error('Error fetching transaction')

        return res.json() as Promise<GetWalletTransactionsResponse>
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        console.error(errorMessage)
      }
    },
  })
}

export function useGetWalletTransactionsRaw({ chain, address }: { chain: string; address: string }) {
  return useQuery(['get-wallet-transactions-raw'], {
    queryFn: async () => {
      try {
        const res = await fetch(`/integration/moralis/api/transaction/getWalletTransactions?chain=${chain}&address=${address}&format=raw`)
        if (!res.ok) throw new Error('Error fetching transaction')

        return res.json() as Promise<GetWalletTransactionsJSONResponse>
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        console.error(errorMessage)
      }
    },
  })
}
