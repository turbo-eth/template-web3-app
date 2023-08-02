import { useEffect, useState } from 'react'

import { AutomateSDK } from '@gelatonetwork/automate-sdk'
import { useNetwork } from 'wagmi'

import { useEthersSigner } from '@/lib/hooks/web3/use-ethers-signer'

export const useGelatoAutomateSdk = () => {
  const [automateSdk, setAutomateSdk] = useState<AutomateSDK>()

  const { chain } = useNetwork()

  const signer = useEthersSigner()

  useEffect(() => {
    if (chain?.id && signer) setAutomateSdk(new AutomateSDK(chain.id, signer))
  }, [chain?.id, signer])

  return { automateSdk, isLoading: !chain?.id || !signer }
}
