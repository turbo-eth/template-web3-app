import type { GetWalletTransactionsVerboseJSONResponse, GetWalletTransactionsVerboseResponse } from '@moralisweb3/common-evm-utils'
import { useQuery } from '@tanstack/react-query'

export function useGetWalletTransactionsVerbose({ chain, address }: { chain: string; address: string }) {
  return useQuery(['get-wallet-transactions-verbose'], {
    queryFn: async () => {
      try {
        const res = await fetch(`/integration/moralis/api/transaction/getWalletTransactionsVerbose?chain=${chain}&address=${address}&format=result`)
        if (!res.ok) throw new Error('Error fetching transaction')

        return res.json() as Promise<GetWalletTransactionsVerboseResponse>
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        console.error(errorMessage)
      }
    },
  })
}

export function useGetWalletTransactionsVerboseRaw({ chain, address }: { chain: string; address: string }) {
  return useQuery(['get-wallet-transactions-verbose-raw'], {
    queryFn: async () => {
      try {
        const res = await fetch(`/integration/moralis/api/transaction/getWalletTransactionsVerbose?chain=${chain}&address=${address}&format=raw`)
        if (!res.ok) throw new Error('Error fetching transaction')

        return res.json() as Promise<GetWalletTransactionsVerboseJSONResponse>
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        console.error(errorMessage)
      }
    },
  })
}
