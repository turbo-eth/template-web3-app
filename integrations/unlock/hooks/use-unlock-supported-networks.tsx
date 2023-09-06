import { useEffect, useState } from 'react'

import { networks } from '@unlock-protocol/networks'
import { NetworkConfigs } from '@unlock-protocol/paywall'
import { useNetwork } from 'wagmi'

export default function useUnlockSuppertedNetworks() {
  const [isSupported, setIsSupported] = useState<boolean>(false)
  const [unlockAddress, setUnlockAddress] = useState<string>('')
  const [subgraphEndpoint, setSupgraphEndpoint] = useState<string>('')

  const { chain } = useNetwork()
  const networkConfigs: NetworkConfigs = networks

  useEffect(() => {
    if (chain && chain.id in networkConfigs) {
      setIsSupported(true)
    } else {
      setIsSupported(false)
    }
  }, [chain])

  return { isSupported, unlockAddress, subgraphEndpoint }
}
