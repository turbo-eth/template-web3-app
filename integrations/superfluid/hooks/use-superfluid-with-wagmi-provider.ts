// use-superfluid-with-wagmi-provider.tsx
import { useMemo } from 'react'

import { useChainId, useSigner } from 'wagmi'

export function useSuperFluidWithWagmiProvider() {
  const { data } = useSigner()
  const chainId = useChainId()
  return useMemo(async () => {
    if (!data?.provider) return
    console.log(data?.provider)
    return 1
  }, [])
}

/* await Framework.create({
  chainId: chainId,
  provider: data?.provider, // this is the injected provider
}) */
