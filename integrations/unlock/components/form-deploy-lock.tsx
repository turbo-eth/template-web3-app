'use client'

import { useState } from 'react'

import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

import { provider } from '../unlock-provider'

// NOTE: refer to -> https://docs.unlock-protocol.com/tutorials/front-end/paywall/provider

export default function FormDeployLock() {
  const [lockName, setLockName] = useState<string>('')
  const [maxKeys, setMaxKeys] = useState<number>(0)
  const [lastMaxKeys, setLastMaxKeys] = useState<number>(0) // NOTE: used to store the last max keys before unlimited keys
  const [duration, setDuration] = useState<number>(0)
  const [lastDuration, setLastDuration] = useState<number>(0) // NOTE: used to store the last duration before unlimited duration
  const [keyPrice, setKeyPrice] = useState<number>(0)
  const [unlimitedKeys, setUnlimitedKeys] = useState<boolean>(false)
  const [unlimitedDuration, setUnlimitedDuration] = useState<boolean>(false)

  const handleCreateLock = async () => {
    console.log(lockName, maxKeys, duration, keyPrice)
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
        <Input onChange={(e) => setLockName(e.target.value)} />
      </div>
      <div>
        <p>Max Number of Keys</p>
        <div className="flex flex-row items-center justify-center">
          {unlimitedKeys ? <Input disabled={true} /> : <Input onChange={(e) => setMaxKeys(Number(e.target.value))} />}
          unlimited <Switch onCheckedChange={(e) => handleUnlimitedKeys(e)} />
        </div>
      </div>
      <div>
        <p>Membership Duration</p>
        <div className="flex flex-row items-center justify-center">
          {unlimitedDuration ? <Input disabled={true} /> : <Input onChange={(e) => setDuration(Number(e.target.value))} />}
          unlimited <Switch onCheckedChange={(e) => handleUnlimitedDuration(e)} />
        </div>
      </div>
      <div>
        <p>Key Price</p>
        <Input onChange={(e) => setKeyPrice(Number(e.target.value))} />
      </div>
      <Button onClick={handleCreateLock}>Create Lock</Button>
    </div>
  )
}
