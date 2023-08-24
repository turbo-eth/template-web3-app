import type {
  GetWalletTransactionsJSONResponse,
  GetWalletTransactionsResponse,
} from "@moralisweb3/common-evm-utils"
import { useQuery } from "@tanstack/react-query"

interface GetWalletTransactionsArgs {
  chain: string
  address: string
  enabled?: boolean
}

export function useGetWalletTransactions({
  chain,
  address,
  enabled,
}: GetWalletTransactionsArgs) {
  return useQuery(["get-wallet-transactions", chain, address], {
    queryFn: async (): Promise<GetWalletTransactionsResponse | undefined> => {
      const res = await fetch(
        `/integration/moralis/api/transaction/getWalletTransactions?chain=${chain}&address=${address}&format=result`
      )
      if (!res.ok) {
        const testRes = await res.text()
        throw new Error(testRes)
      }

      return res.json() as Promise<GetWalletTransactionsResponse>
    },
    enabled,
  })
}

export function useGetWalletTransactionsRaw({
  chain,
  address,
  enabled,
}: GetWalletTransactionsArgs) {
  return useQuery(["get-wallet-transactions-raw", chain, address], {
    queryFn: async () => {
      const res = await fetch(
        `/integration/moralis/api/transaction/getWalletTransactions?chain=${chain}&address=${address}&format=raw`
      )
      if (!res.ok) {
        const testRes = await res.text()
        throw new Error(testRes)
      }

      return res.json() as Promise<GetWalletTransactionsJSONResponse>
    },
    enabled,
  })
}
