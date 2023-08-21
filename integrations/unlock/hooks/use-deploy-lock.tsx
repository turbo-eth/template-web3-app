import { useState } from 'react'

import { PublicLockV13, UnlockV12 } from '@unlock-protocol/contracts'
import { networks } from '@unlock-protocol/networks'
import { ethers } from 'ethers'
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'

export function useDeployLock() {
  // eslint-disable-neeNetwork()
  const { address } = useAccount()
  const { chain } = useNetwork()
  if (!address || !chain?.id) throw new Error('Wallet not connected')

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const networkConfig = networks[chain.id]
  if (!networkConfig) throw new Error('Unsupported Chain')

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const unlockAddress = networkConfig.unlockAddress

  const lockInterface = new ethers.utils.Interface(PublicLockV13.abi)
  const [calldata, setCalldata] = useState<string>('')
  const [unlockFunctionName, setUnlockFunctionName] = useState<string>('')

  const { config } = usePrepareContractWrite({
    address: unlockAddress, // goerli unlock contract
    abi: UnlockV12.abi,
    functionName: unlockFunctionName,
    args: [calldata, 12], // version 12
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  async function deployLock(duration: number, price: string, supply: number, name: string) {
    setUnlockFunctionName('createUpgradeableLockAtVersion')
    setCalldata(
      lockInterface.encodeFunctionData('initialize(address,uint256,address,uint256,uint256,string)', [
        address,
        duration === 0 ? ethers.constants.MaxUint256 : duration * 60 * 60 * 24,
        ethers.constants.AddressZero, // token address defaults to ETH, can be any ERC20
        ethers.utils.parseUnits(price, 18), // key price in ETH
        supply === 0 ? ethers.constants.MaxUint256 : supply,
        name,
      ])
    )
    write?.()
  }

  return { data, isLoading, isSuccess, deployLock }
}
