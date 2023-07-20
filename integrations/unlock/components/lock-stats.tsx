'use client'

// TODO: make this look better
// TODO: convert duration to days, and price to ether/matic

import { useEffect, useState } from 'react'
import { LockStatsQueryQuery } from '@/.graphclient'
import useUnlockSubgraph from '../hooks/use-unlock-subgraph'

export default function LockStats({ lockId }: { lockId: string }) {
  const [lockStats, setLockStats] = useState<LockStatsQueryQuery>()
  const { getLockStats } = useUnlockSubgraph()

  useEffect(() => {
    async function fetchLockStats() {
      const stats = await getLockStats({ lockId })
      setLockStats(stats)
    }
    fetchLockStats()
  }, [LockStats])

  return (
    <div>
      {lockStats ? (
        <div>
          <p>Lock Stats</p>
          <p>Lock Name: {lockStats.locks[0].name}</p>
          <p>Symbol: {lockStats.locks[0].symbol}</p>
          <p>Total Keys: {lockStats.locks[0].totalKeys}</p>
          <p>Duration: {lockStats.locks[0].expirationDuration}</p>
          <p>Price: {lockStats.locks[0].price}</p>
        </div>
      ) : (
        <p>No Lock Found</p>
      )}
    </div>
  )
}
