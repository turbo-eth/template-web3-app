'use client'

import { useState, useEffect } from 'react'

import { UnlockV12, PublicLockV13 } from '@unlock-protocol/contracts'
import { ethers } from 'ethers'

import {
  useAccount, 
  useContractWrite,
  usePrepareContractWrite
} from 'wagmi'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'


const lockInterface = new ethers.utils.Interface(PublicLockV13.abi)

export default function FormDeployLock() {
  const { address: creator } = useAccount()

  const [calldata, setCalldata] = useState<string>('')
  const [lockName, setLockName] = useState<string>('test lock')
  const [maxKeys, setMaxKeys] = useState<number>(10)
  const [lastMaxKeys, setLastMaxKeys] = useState<number>(0) // NOTE: used to store the last max keys before unlimited keys
  const [duration, setDuration] = useState<number>(30)
  const [lastDuration, setLastDuration] = useState<number>(0) // NOTE: used to store the last duration before unlimited duration
  const [keyPrice, setKeyPrice] = useState<string>('0.01')
  const [unlimitedKeys, setUnlimitedKeys] = useState<boolean>(false)
  const [unlimitedDuration, setUnlimitedDuration] = useState<boolean>(false)

  useEffect(() => {
    const prepareCalldata = async () => {
      setCalldata(
        lockInterface.encodeFunctionData('initialize(address,uint256,address,uint256,uint256,string)', [
          creator,
          unlimitedDuration ? ethers.constants.MaxUint256 : duration * 60 * 60 * 24, // duration in days
          ethers.constants.AddressZero, // token address defaults to ETH
          ethers.utils.parseUnits(keyPrice, 18), // key price in ETH
          unlimitedKeys ? ethers.constants.MaxUint256 : maxKeys,
          lockName,
        ])
      )
    }
    prepareCalldata()
  }, [creator, duration, keyPrice, maxKeys, lockName, unlimitedDuration, unlimitedKeys])

  const { config } = usePrepareContractWrite({
    address: '0x627118a4fB747016911e5cDA82e2E77C531e8206', // goerli unlock contract
    abi: UnlockV12.abi,
    functionName: 'createUpgradeableLockAtVersion',
    args: [calldata, 12], // version 12
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  const handleUnlimitedKeys = (e: boolean) => {
    setUnlimitedKeys(e)
    if (e == true) {
      setLastMaxKeys(maxKeys)
    } else {
      setMaxKeys(lastMaxKeys)
    }
  }

  const handleUnlimitedDuration = (e: boolean) => {
    setUnlimitedDuration(e)
    if (e == true) {
      setLastDuration(duration)
    } else {
      setDuration(lastDuration)
    }
  }

  return (
    <div>
      <div>
        <p>Lock Name</p>
        <Input placeholder={lockName} onChange={(e) => setLockName(e.target.value)} />
      </div>
      <div>
        <p>Max Number of Keys</p>
        <div className="flex flex-row items-center justify-center">
          {unlimitedKeys ? (
            <Input disabled={true} />
          ) : (
            <Input placeholder={maxKeys.toString()} onChange={(e) => setMaxKeys(Number(e.target.value))} />
          )}
          unlimited <Switch onCheckedChange={(e) => handleUnlimitedKeys(e)} />
        </div>
      </div>
      <div>
        <p>Membership Duration (Days)</p>
        <div className="flex flex-row items-center justify-center">
          {unlimitedDuration ? (
            <Input disabled={true} />
          ) : (
            <Input placeholder={duration.toString()} onChange={(e) => setDuration(Number(e.target.value))} />
          )}
          unlimited <Switch onCheckedChange={(e) => handleUnlimitedDuration(e)} />
        </div>
      </div>
      <div>
        <p>Key Price</p>
        <Input placeholder={keyPrice} onChange={(e) => setKeyPrice(e.target.value)} />
      </div>
      <Button onClick={() => write?.()}>Deploy Lock</Button>
      {isLoading && <p>Deploying Lock...</p>}
      {isSuccess && <p>Lock Deployed!</p>}
    </div>
  )
}
