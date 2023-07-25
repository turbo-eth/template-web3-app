'use client'

// TODO: make this look better
// TODO: convert duration to days, and price to ether/matic

import { useEffect, useState } from 'react'
import { LockStatsQueryDocument, LockStatsQueryQuery } from '@/.graphclient'
import useUnlockSubgraph from '../hooks/use-unlock-subgraph'
import { ethers } from 'ethers'

export default function LockStats({ lockId }: { lockId: string }) {
  const [lockStats, setLockStats] = useState<LockStatsQueryQuery>()
  const { getLockStats } = useUnlockSubgraph()

  useEffect(() => {
    async function fetchLockStats() {
      const stats = await getLockStats({ lockId })
      setLockStats(stats)
    }
    void fetchLockStats()
  }, [LockStats])

  return (
    <div>
      {lockStats ? (
        <div>
          <p>Lock Name: {lockStats.locks[0].name}</p>
          <p>Symbol: {lockStats.locks[0].symbol}</p>
          <p>Keys Sold: {lockStats.locks[0].totalKeys}</p>
          <p>Max Keys: {formatMaxKeys(lockStats.locks[0].maxNumberOfKeys)}</p>
          <p>Duration: {formatDuration(lockStats.locks[0].expirationDuration)}</p>
          <p>Price: {formatPrice(lockStats.locks[0].price)}</p>
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


