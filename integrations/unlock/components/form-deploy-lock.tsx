'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

import { useDeployLock } from '../hooks/use-deploy-lock'

export default function FormDeployLock() {
  const [lockName, setLockName] = useState<string>('test lock')
  const [maxKeys, setMaxKeys] = useState<number>(10)
  const [lastMaxKeys, setLastMaxKeys] = useState<number>(0) // NOTE: used to store the last max keys before unlimited keys
  const [duration, setDuration] = useState<number>(30)
  const [lastDuration, setLastDuration] = useState<number>(0) // NOTE: used to store the last duration before unlimited duration
  const [keyPrice, setKeyPrice] = useState<string>('0.01')
  const [unlimitedKeys, setUnlimitedKeys] = useState<boolean>(false)
  const [unlimitedDuration, setUnlimitedDuration] = useState<boolean>(false)

  const { data, isLoading, isSuccess, deployLock } = useDeployLock()

  function handleDeploy() {
    deployLock(duration, keyPrice, maxKeys, lockName).then(() => {
      console.log('deploying lock...')
    })
    .catch((e) => {
      console.log('error deploying lock', e)
    })
  }

  function handleUnlimitedKeys(e: boolean) {
    setUnlimitedKeys(e)
    if (e == true) {
      setLastMaxKeys(maxKeys)
      setMaxKeys(0) // 0 for unlimited
    } else {
      setMaxKeys(lastMaxKeys)
    }
  }

  function handleUnlimitedDuration(e: boolean) {
    setUnlimitedDuration(e)
    if (e == true) {
      setLastDuration(duration)
      setDuration(0) // 0 for unlimited
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

      <Button onClick={() => handleDeploy()}>Deploy Lock</Button>
      {isLoading && <p>Deploying Lock...</p>}
      {isSuccess && <p>Lock Deployed!</p>}

    </div>
  )
}
