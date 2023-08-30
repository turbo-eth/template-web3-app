import type {
  GetInternalTransactionsJSONResponse,
  GetInternalTransactionsResponse,
} from "@moralisweb3/common-evm-utils"
import { useQuery } from "@tanstack/react-query"

interface GetInternalTransactionsArgs {
  chain: string
  transactionHash: string
  enabled?: boolean
}

export function useGetInternalTransactions({
  chain,
  transactionHash,
  enabled,
}: GetInternalTransactionsArgs) {
  return useQuery(["get-internal-transactions", chain, transactionHash], {
    queryFn: async () => {
      const res = await fetch(
        `/integration/moralis/api/transaction/getInternalTransactions?chain=${chain}&transactionHash=${transactionHash}&format=result`
      )
      if (!res.ok) {
        const testRes = await res.text()
        throw new Error(testRes)
      }

      return res.json() as Promise<GetInternalTransactionsResponse>
    },
    enabled,
  })
}

export function useGetInternalTransactionsRaw({
  chain,
  transactionHash,
  enabled,
}: GetInternalTransactionsArgs) {
  return useQuery(["get-internal-transactions-raw", chain, transactionHash], {
    queryFn: async () => {
      const res = await fetch(
        `/integration/moralis/api/transaction/getInternalTransactions?chain=${chain}&transactionHash=${transactionHash}&format=raw`
      )
      if (!res.ok) {
        const testRes = await res.text()
        throw new Error(testRes)
      }

      return res.json() as Promise<GetInternalTransactionsJSONResponse>
    },
    enabled,
  })
}
