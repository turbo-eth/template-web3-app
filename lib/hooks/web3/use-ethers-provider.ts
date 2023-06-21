import { useMemo } from 'react'

import { providers } from 'ethers'
import { type HttpTransport } from 'viem'
import { type PublicClient, usePublicClient } from 'wagmi'

export function publicClientToProvider(publicClient: PublicClient) {
  const { chain, transport } = publicClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  if (transport.type === 'fallback')
    return new providers.FallbackProvider(
      (transport.transports as ReturnType<HttpTransport>[]).map(({ value }) => new providers.JsonRpcProvider(value?.url, network))
    )

  return new providers.JsonRpcProvider(transport.url as string, network)
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId })
  return useMemo(() => publicClientToProvider(publicClient), [publicClient])
}
