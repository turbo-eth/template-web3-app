import { useEffect, useState } from 'react'

import { useNetwork } from 'wagmi'

export default function useUnlockSuppertedNetworks() {
  const [isSupported, setIsSupported] = useState<boolean>(false)
  const [networkData, setNetworkData] = useState<{ unlockAddress: `0x${string}`; subgraphEndpoint: string }>({
    unlockAddress: '0x',
    subgraphEndpoint: '',
  })

  const { chain } = useNetwork()

  const unlockNetworks: { [key: number]: { unlockAddress: `0x${string}`; subgraphEndpoint: string } } = {
    1: {
      unlockAddress: '0xe79B93f8E22676774F2A8dAd469175ebd00029FA',
      subgraphEndpoint: 'mainnet-v2',
    },
    10: {
      unlockAddress: '0x99b1348a9129ac49c6de7F11245773dE2f51fB0c',
      subgraphEndpoint: 'optimism-v2',
    },
    80001: {
      unlockAddress: '0x1FF7e338d5E582138C46044dc238543Ce555C963',
      subgraphEndpoint: 'mumbai-v2',
    },
    5: {
      unlockAddress: '0x627118a4fB747016911e5cDA82e2E77C531e8206',
      subgraphEndpoint: 'goerli-v2',
    },
  }

  useEffect(() => {
    if (chain && chain.id in unlockNetworks) {
      const id: number = chain.id
      setIsSupported(true)
      setNetworkData({
        unlockAddress: unlockNetworks[id].unlockAddress,
        subgraphEndpoint: unlockNetworks[id].subgraphEndpoint,
      })
    } else {
      setIsSupported(false)
    }
  }, [chain])

  return { isSupported, networkData }
}
