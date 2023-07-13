import { ethers } from 'ethers'
import { networks } from '@unlock-protocol/networks'
import { useNetwork } from 'wagmi'

export default function UnlockProvider() {
  const { chain } = useNetwork()

  const provider = new ethers.providers.JsonRpcProvider(networks[chain.id].provider)

  return { provider }
}
