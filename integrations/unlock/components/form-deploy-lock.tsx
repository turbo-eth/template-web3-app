'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
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
    deployLock(duration, keyPrice, maxKeys, lockName)
      .then(() => {
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
    <div className="card w-full">
      <div className="flex flex-col gap-4">
        <label>Lock Name</label>
        <input className="input mt-4" placeholder={lockName} onChange={(e) => setLockName(e.target.value)} />
        <label>Max Number of Keys</label>
        <div className="flex flex-row items-center justify-center space-x-4">
          {unlimitedKeys ? (
            <input className="input mt-4" disabled={true} />
          ) : (
            <input className="input mt-4" placeholder={maxKeys.toString()} onChange={(e) => setMaxKeys(Number(e.target.value))} />
          )}
          <div className="flex flex-row space-x-2">
            <p>unlimited:</p>
            <Switch onCheckedChange={(e) => handleUnlimitedKeys(e)} />
          </div>
        </div>
        <div>
          <label>Membership Duration (Days)</label>
          <div className="flex flex-row items-center justify-center space-x-4">
            {unlimitedDuration ? (
              <input className="input mt-4" disabled={true} />
            ) : (
              <input className="input mt-4" placeholder={duration.toString()} onChange={(e) => setDuration(Number(e.target.value))} />
            )}
            <div className="flex flex-row space-x-2">
              <p>unlimited</p>
              <Switch onCheckedChange={(e) => handleUnlimitedDuration(e)} />
            </div>
          </div>
        </div>
        <div>
          <label>Key Price</label>
          <input className="input mt-4" placeholder={keyPrice} onChange={(e) => setKeyPrice(e.target.value)} />
        </div>
        <div className="m-10 flex flex-col items-center justify-center">
          <Button onClick={handleDeploy}>Deploy Lock</Button>
          {isLoading && <p>Deploying lock...</p>}
          {isSuccess && <p>Lock deployed!</p>}
        </div>
      </div>
    </div>
  )
}
