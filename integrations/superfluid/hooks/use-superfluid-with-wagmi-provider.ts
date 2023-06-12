// use-superfluid-with-wagmi-provider.tsx
import { useEffect, useState } from 'react'

import { Framework } from '@superfluid-finance/sdk-core'
import { useChainId, useSigner } from 'wagmi'

//for sero, use the useQuery hook instead of useEffect
export function useSuperFluidWithWagmiProvider() {
  const { data } = useSigner()
  const chainId = useChainId()
  const [sfFramework, setSfFramework] = useState<Framework>()

  useEffect(() => {
    const getFramework = async () => {
      if (!data?.provider) return
      return await Framework.create({
        chainId: chainId,
        provider: data?.provider, // this is the injected provider
      })
    }
    getFramework().then((res) => setSfFramework(res))
  }, [data?.provider, chainId])

  return sfFramework
}
