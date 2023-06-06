// use-superfluid-with-wagmi-provider.tsx
import { useEffect, useState } from 'react'

import { Framework } from '@superfluid-finance/sdk-core'
import { useChainId, useSigner } from 'wagmi'

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

/* // use-superfluid-with-wagmi-provider.tsx
import { useMemo } from 'react'

import { Framework } from '@superfluid-finance/sdk-core'
import { useChainId, useSigner } from 'wagmi'

export function useSuperFluidWithWagmiProvider() {
  const { data } = useSigner()
  const chainId = useChainId()
  return useMemo(() => {
    const getFramework = async () => {
      if (!data?.provider) return
      return await Framework.create({
        chainId: chainId,
        provider: data?.provider, // this is the injected provider
      })
    }
    return getFramework().then((res: any) => res)
  }, [])
}
 */

/* export function useSuperFluidWithWagmiProvider() {
  const { data } = useSigner()
  const chainId = useChainId()
  const [sfFramework, setSfFramework] = useState()

  const sfData = useQuery(['sf'], async () => {
    if (!data?.provider) return 0
    const sf = await Framework.create({
      chainId: chainId,
      provider: data?.provider, // this is the injected provider
    })
    return sf
  })
  return sfData.data
} */
