import { useEffect, useState } from 'react'

import { networks } from '@unlock-protocol/networks'
import { useNetwork } from 'wagmi'

type UnlockNetworkConfig = {
  [key: number]: { unlockAddress: string; subgraphEndpoint: string }
}

export default function useUnlockSuppertedNetworks() {
  const [isSupported, setIsSupported] = useState<boolean>(false)
  const [networkData, setNetworkData] = useState<{ unlockAddress: string; subgraphEndpoint: string }>({ unlockAddress: '', subgraphEndpoint: '' })

  const { chain } = useNetwork()

  const unlockNwConfig: UnlockNetworkConfig = networks

  useEffect(() => {
    if (chain && chain.id in networks) {
      setIsSupported(true)
      setNetworkData({
        unlockAddress: unlockNwConfig[chain.id].unlockAddress,
        subgraphEndpoint: unlockNwConfig[chain.id].subgraphEndpoint,
      })
    }
  }, [chain])

  return { isSupported, networkData }
}
