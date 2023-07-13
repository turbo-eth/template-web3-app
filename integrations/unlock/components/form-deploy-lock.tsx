'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

import UnlockProvider from '../unlock-provider'

// NOTE: refer to -> https://docs.unlock-protocol.com/tutorials/front-end/paywall/provider

export default function FormDeployLock() {
  const [lockName, setLockName] = useState<string>('test lock')
  const [maxKeys, setMaxKeys] = useState<number>(10)
  const [lastMaxKeys, setLastMaxKeys] = useState<number>(0) // NOTE: used to store the last max keys before unlimited keys
  const [duration, setDuration] = useState<number>(30)
  const [lastDuration, setLastDuration] = useState<number>(0) // NOTE: used to store the last duration before unlimited duration
  const [keyPrice, setKeyPrice] = useState<string>('0.01')
  const [unlimitedKeys, setUnlimitedKeys] = useState<boolean>(false)
  const [unlimitedDuration, setUnlimitedDuration] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { provider } = UnlockProvider()

  const handleCreateLock = async () => {
    console.log(lockName, maxKeys, duration, keyPrice)
    setIsLoading(true)
    try {
      console.log(provider)
      /*
      // connect to provider with wallet 
      await walletService.connect(provider, wallet)

       // This only resolves when the transaction has been mined, but the callback returns the hash immediately
      await walletService.createLock(
        {
          maxNumberOfKeys: maxKeys,
          name: lockName,
          expirationDuration: duration,
          keyPrice: keyPrice, // Key price needs to be a string
        },
        {}, // transaction options
        (error: Error, hash: string) => {
          // This is the hash of the transaction!
          console.log({ hash })
        }
      )
      */
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const handleUnlimitedKeys = (e: boolean) => {
    setUnlimitedKeys(e)
    if (e == true) {
      setLastMaxKeys(maxKeys)
      setMaxKeys(0) // TODO: update to what unlock expects for unlimited keys
    } else {
      setMaxKeys(lastMaxKeys)
    }
  }

  const handleUnlimitedDuration = (e: boolean) => {
    setUnlimitedDuration(e)
    if (e == true) {
      setLastDuration(duration)
      setDuration(0) // TODO: update to what unlock expects for unlimited duration
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
          {unlimitedKeys ? <Input disabled={true} /> : <Input placeholder={maxKeys.toString()} onChange={(e) => setMaxKeys(Number(e.target.value))} />}
          unlimited <Switch onCheckedChange={(e) => handleUnlimitedKeys(e)} />
        </div>
      </div>
      <div>
        <p>Membership Duration (Days)</p>
        <div className="flex flex-row items-center justify-center">
          {unlimitedDuration ? <Input disabled={true} /> : <Input placeholder={duration.toString()} onChange={(e) => setDuration(Number(e.target.value))} />}
          unlimited <Switch onCheckedChange={(e) => handleUnlimitedDuration(e)} />
        </div>
      </div>
      <div>
        <p>Key Price</p>
        <Input placeHolder={keyPrice} onChange={(e) => setKeyPrice(Number(e.target.value))} />
      </div>
      <Button onClick={handleCreateLock}>{isLoading ? 'Creating Lock...' : 'Create Lock'}</Button>
    </div>
  )
}
