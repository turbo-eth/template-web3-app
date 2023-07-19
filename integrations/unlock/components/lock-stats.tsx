'use client'

// TODO: make this look better
// TODO: convert duration to days, and price to ether/matic

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { LockStatsQueryDocument, LockStatsQueryQuery, execute } from '@/.graphclient'

export default function LockStats({ lockId }: { lockId: string }) {
  const [lockStats, setLockStats] = useState<LockStatsQueryQuery>()

  useEffect(() => {
    const variables = { lockId: lockId }
    execute(LockStatsQueryDocument, variables).then((result) => {
      console.log(result?.data)
      setLockStats(result?.data)
    })
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
