import type {
  GetWalletTransactionsVerboseJSONResponse,
  GetWalletTransactionsVerboseResponse,
} from "@moralisweb3/common-evm-utils"
import { useQuery } from "@tanstack/react-query"

interface GetWalletTransactionsVerbose {
  chain: string
  address: string
  enabled?: boolean
}

export function useGetWalletTransactionsVerbose({
  chain,
  address,
  enabled,
}: GetWalletTransactionsVerbose) {
  return useQuery(["get-wallet-transactions-verbose", chain, address], {
    queryFn: async () => {
      const res = await fetch(
        `/integration/moralis/api/transaction/getWalletTransactionsVerbose?chain=${chain}&address=${address}&format=result`
      )
      if (!res.ok) {
        const testRes = await res.text()
        throw new Error(testRes)
      }

      return res.json() as Promise<GetWalletTransactionsVerboseResponse>
    },
    enabled,
  })
}

export function useGetWalletTransactionsVerboseRaw({
  chain,
  address,
  enabled,
}: GetWalletTransactionsVerbose) {
  return useQuery(["get-wallet-transactions-verbose-raw", chain, address], {
    queryFn: async () => {
      const res = await fetch(
        `/integration/moralis/api/transaction/getWalletTransactionsVerbose?chain=${chain}&address=${address}&format=raw`
      )
      if (!res.ok) {
        const testRes = await res.text()
        throw new Error(testRes)
      }

      return res.json() as Promise<GetWalletTransactionsVerboseJSONResponse>
    },
    enabled,
  })
}
