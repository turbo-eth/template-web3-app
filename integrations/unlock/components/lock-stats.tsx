'use client'

import { useEffect, useState } from 'react'

import { ethers } from 'ethers'

import { LockStatsQueryQuery } from '@/.graphclient'

import useUnlockSubgraph from '../hooks/use-unlock-subgraph'

export default function LockStats({ lockId }: { lockId: string }) {
  const [lockStats, setLockStats] = useState<LockStatsQueryQuery>()
  const { getLockStats } = useUnlockSubgraph()

  useEffect(() => {
    async function fetchLockStats() {
      const stats: LockStatsQueryQuery = (await getLockStats({ lockId })) as LockStatsQueryQuery
      setLockStats(stats)
    }
    void fetchLockStats()
  }, [LockStats])

  return (
    <div className="card w-full shadow-xl">
      {lockStats ? (
        <div>
          <div className="flex justify-between space-x-8">
            <label className="inline font-bold">Lock Name:</label>
            <p className="inline">{lockStats.locks[0].name}</p>
          </div>
          <div className="flex justify-between space-x-8">
            <label className="inline font-bold">Symbol:</label>
            <p className="inline">{lockStats.locks[0].symbol}</p>
          </div>
          <div className="flex justify-between space-x-8">
            <label className="inline font-bold">Keys Sold:</label>
            <p className="inline">{lockStats.locks[0].totalKeys}</p>
          </div>
          <div className="flex justify-between space-x-8">
            <label className="inline font-bold">Max Keys:</label>
            <p className="inline">{formatMaxKeys(lockStats.locks[0].maxNumberOfKeys as string)}</p>
          </div>
          <div className="flex justify-between space-x-8">
            <label className="inline font-bold">Duration:</label>
            <p className="inline">{formatDuration(lockStats.locks[0].expirationDuration as string)}</p>
          </div>
          <div className="flex justify-between space-x-8">
            <label className="inline font-bold">Price:</label>
            <p className="inline">{formatPrice(lockStats.locks[0].price as string)}</p>
          </div>
        </div>
      ) : (
        <p>No Lock Found</p>
      )}
    </div>
  )
}

function formatDuration(duration: string): string {
  if (duration === ethers.constants.MaxUint256.toString()) {
    return 'Unlimited'
  }

  const durationNumber = parseInt(duration)
  const durationInDays = durationNumber / 60 / 60 / 24

  return `${durationInDays} days`
}

function formatMaxKeys(maxKeys: string): string {
  if (maxKeys === ethers.constants.MaxUint256.toString()) return 'Unlimited'

  return maxKeys
}

function formatPrice(keyPrice: string): string {
  if (keyPrice === '0') return 'Free'

  const priceInEther = ethers.utils.formatEther(keyPrice)

  return `${priceInEther} ETH`
}
