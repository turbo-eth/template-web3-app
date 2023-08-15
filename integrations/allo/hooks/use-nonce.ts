import { useAccount, usePublicClient, useQuery } from 'wagmi'

export function useNonce() {
  const publicClient = usePublicClient()
  const { address } = useAccount()
  return useQuery(['wallet-nonce', address, publicClient], {
    queryFn: async () => {
      if (!publicClient || !address) return
      return await publicClient.getTransactionCount({
        address,
      })
    },
    enabled: !!address && !!publicClient,
  })
}
