// use-superfluid-with-wagmi-provider.tsx
import { useMemo } from 'react'

import { Framework } from '@superfluid-finance/sdk-core'
import { useChainId, useSigner } from 'wagmi'

export function useSuperFluidWithWagmiProvider() {
  const { data } = useSigner()
  const chainId = useChainId()
  return useMemo(async () => {
    if (!data?.provider) return
    const sf = await Framework.create({
      chainId: chainId,
      provider: data?.provider, // this is the injected provider
    })
  }, [])
}
